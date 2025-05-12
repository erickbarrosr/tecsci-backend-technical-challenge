import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";
import {
  InverterCreateInput,
  InverterUpdateInput,
} from "../types/inverter.types";

const prisma = new PrismaClient();

export const createInverter = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const inverterData: InverterCreateInput = req.body;

    const inverter = await prisma.inverter.create({
      data: {
        name: inverterData.name,
        plantId: inverterData.plantId,
      },
      select: {
        id: true,
        name: true,
        plantId: true,
      },
    });

    res.status(201).json({
      success: true,
      data: inverter,
      message: "Inversor criado com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao criar inversor: ", error);

    res.status(500).json({
      success: false,
      message: "Falha ao criar inversor.",
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
};

export const getAllInverters = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const inverters = await prisma.inverter.findMany({
      select: {
        id: true,
        name: true,
        plantId: true,
        _count: {
          select: { metrics: true },
        },
      },
      orderBy: { id: "desc" },
    });

    res.json({
      success: true,
      count: inverters.length,
      data: inverters,
    });
  } catch (error) {
    console.error("Erro ao listar inversores: ", error);

    res.status(500).json({
      success: false,
      message: "Falha ao listar usinas.",
    });
  }
};

export const getInverterById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const inverterId = Number(req.params.id);

    const inverter = await prisma.inverter.findUnique({
      where: { id: inverterId },
    });

    if (!inverter) {
      res.status(404).json({
        success: false,
        message: "Inversor não encotrado.",
      });
    }

    res.json({
      success: true,
      data: inverter,
    });
  } catch (error) {
    console.error("Erro ao buscar inversor: ", error);

    res.status(500).json({
      success: false,
      message: "Erro interno no servidor.",
    });
  }
};

export const updateInverter = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const inverterId = Number(req.params.id);
    const updateData: InverterUpdateInput = req.body;

    const updatedInverter = await prisma.inverter.update({
      where: { id: inverterId },
      data: {
        name: updateData.name,
        plantId: updateData.plantId,
      },
    });

    res.json({
      success: true,
      data: updatedInverter,
      message: "Inversor atualizado com sucesso.",
    });
  } catch (error: any) {
    console.error("Erro ao atualizar inversor: ", error);

    if (error.code === "P2025") {
      res.status(404).json({
        success: false,
        message: "Inversor não encontrado.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Falha ao atualizar inversor.",
    });
  }
};

export const deleteInverter = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const inverterId = Number(req.params.id);

    await prisma.$transaction([
      prisma.metric.deleteMany({
        where: {
          inverterId: inverterId,
        },
      }),

      prisma.inverter.delete({
        where: {
          id: inverterId,
        },
      }),
    ]);

    res.json({
      success: true,
      message: "Inversor e métricas relacionadas removidos com sucesso",
    });
  } catch (error: any) {
    console.error("Erro ao deletar inversor:", error);

    if (error.code === "P2025") {
      res.status(404).json({
        success: false,
        message: "Inversor não encontrado",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Falha ao remover inversor",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
