import { Request, Response } from "express";
import { getDailyAvgTemperature } from "../services/temperature.service";

export const getAvgTemperature = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.query;

    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      res.status(400).json({
        success: false,
        error:
          "Datas inválidas. Use formato ISO 8601 (ex: 2024-01-01T00:00:00Z)",
      });
    }

    const data = await getDailyAvgTemperature(Number(id), start, end);

    res.json({
      success: true,
      data: {
        inverterId: Number(id),
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        dailyAverages: data,
      },
    });
  } catch (error: any) {
    console.error("Erro no temperature.controller:", error.message);
    res.status(500).json({
      success: false,
      error: error.message || "Erro ao calcular temperatura média",
    });
  }
};
