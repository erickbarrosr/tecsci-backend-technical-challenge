import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";
import { PlantCreateInput, PlantUpdateInput } from "../types/plant.types";

const prisma = new PrismaClient();

export const createPlant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const plantData: PlantCreateInput = req.body;

    const plant = await prisma.plant.create({
      data: {
        name: plantData.name,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });

    res.status(201).json({
      success: true,
      data: plant,
      message: "Usina criada com sucesso",
    });
  } catch (error) {
    console.error("Erro ao criar usina:", error);
    res.status(500).json({
      success: false,
      message: "Falha ao criar usina",
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
};

export const getAllPlants = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const plants = await prisma.plant.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: { inverters: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      count: plants.length,
      data: plants,
    });
  } catch (error) {
    console.error("Erro ao listar usinas:", error);
    res.status(500).json({
      success: false,
      message: "Falha ao carregar usinas",
    });
  }
};

export const getPlantById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const plantId = Number(req.params.id);

    const plant = await prisma.plant.findUnique({
      where: { id: plantId },
      include: {
        inverters: {
          select: {
            id: true,
            metrics: {
              orderBy: { timestamp: "desc" },
              take: 1,
            },
          },
        },
      },
    });

    if (!plant) {
      res.status(404).json({
        success: false,
        message: "Usina não encontrada",
      });
    }

    res.json({
      success: true,
      data: plant,
    });
  } catch (error) {
    console.error("Erro ao buscar usina:", error);
    res.status(500).json({
      success: false,
      message: "Erro interno no servidor",
    });
  }
};

export const updatePlant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const plantId = Number(req.params.id);
    const updateData: PlantUpdateInput = req.body;

    const updatedPlant = await prisma.plant.update({
      where: { id: plantId },
      data: {
        name: updateData.name,
      },
    });

    res.json({
      success: true,
      data: updatedPlant,
      message: "Usina atualizada com sucesso",
    });
  } catch (error: any) {
    console.error("Erro ao atualizar usina:", error);

    if (error.code === "P2025") {
      res.status(404).json({
        success: false,
        message: "Usina não encontrada",
      });
    }

    res.status(500).json({
      success: false,
      message: "Falha ao atualizar usina",
    });
  }
};

export const deletePlant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const plantId = Number(req.params.id);

    await prisma.$transaction([
      prisma.metric.deleteMany({
        where: {
          inverter: {
            plantId: plantId,
          },
        },
      }),
      prisma.inverter.deleteMany({
        where: { plantId: plantId },
      }),
      prisma.plant.delete({
        where: { id: plantId },
      }),
    ]);

    res.json({
      success: true,
      message: "Usina e dados relacionados removidos com sucesso",
    });
  } catch (error: any) {
    console.error("Erro ao deletar usina:", error);

    if (error.code === "P2025") {
      res.status(404).json({
        success: false,
        message: "Usina não encontrada",
      });
    }

    res.status(500).json({
      success: false,
      message: "Falha ao remover usina",
    });
  }
};
