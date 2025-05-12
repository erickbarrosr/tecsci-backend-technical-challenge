import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";
import { calculateGeneration } from "../services/generation.service";

const prisma = new PrismaClient();

export const getInverterGeneration = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.query;

    const metrics = await prisma.metric.findMany({
      where: {
        inverterId: Number(id),
        timestamp: {
          gte: new Date(startDate as string),
          lte: new Date(endDate as string),
        },
      },
      orderBy: { timestamp: "asc" },
    });

    const generationKWh = calculateGeneration(metrics);

    res.json({
      success: true,
      data: {
        inverterId: Number(id),
        startDate,
        endDate,
        generationKWh,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Erro ao calcular geração",
    });
  }
};

export const getPlantGeneration = async (req: Request, res: Response) => {
  try {
    const { id: plantId } = req.params;
    const { startDate, endDate } = req.query;

    const metrics = await prisma.metric.findMany({
      where: {
        inverter: {
          plantId: Number(plantId),
        },
        timestamp: {
          gte: new Date(startDate as string),
          lte: new Date(endDate as string),
        },
      },
      include: { inverter: true },
      orderBy: { timestamp: "asc" },
    });

    // Agrupa métricas por inversor
    const metricsByInverter = metrics.reduce((acc, metric) => {
      const key = metric.inverterId;
      if (!acc[key]) acc[key] = [];
      acc[key].push(metric);
      return acc;
    }, {} as Record<number, typeof metrics>);

    // Calcula para cada inversor
    const generation = Object.entries(metricsByInverter).map(
      ([inverterId, metrics]) => ({
        inverterId: Number(inverterId),
        generationKWh: calculateGeneration(metrics),
      })
    );

    // Soma total da usina
    const totalGeneration = generation.reduce(
      (sum, curr) => sum + curr.generationKWh,
      0
    );

    res.json({
      success: true,
      data: {
        plantId: Number(plantId),
        startDate,
        endDate,
        totalGenerationKWh: parseFloat(totalGeneration.toFixed(4)),
        details: generation,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Erro ao calcular geração da usina",
    });
  }
};
