import { Request, Response } from "express";
import { getDailyMaxPower } from "../services/power.service";

export const getMaxPower = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.query;

    const data = await getDailyMaxPower(
      Number(id),
      new Date(startDate as string),
      new Date(endDate as string)
    );

    res.json({
      success: true,
      data: {
        inverterId: Number(id),
        startDate,
        endDate,
        dailyMaxPower: data,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Erro ao calcular potência máxima",
    });
  }
};
