import { PrismaClient } from "../generated/prisma";
import { DailyMaxPower } from "../types/power.types";

const prisma = new PrismaClient();

export const getDailyMaxPower = async (
  inverterId: number,
  startDate: Date,
  endDate: Date
) => {
  try {
    const results = await prisma.$queryRaw<DailyMaxPower[]>`
      SELECT
        DATE(timestamp) as date,
        MAX("activePower") as max_power
      FROM "Metric"
      WHERE 
        "inverterId" = ${inverterId}
        AND timestamp BETWEEN ${startDate} AND ${endDate}
      GROUP BY DATE(timestamp)
      ORDER BY date ASC
    `;

    return results.map((row) => ({
      date: row.date.toString().split("T")[0],
      maxPower: Number(row.max_power),
    }));
  } catch (error) {
    console.error("Erro na consulta SQL:", error);
    throw new Error("Falha ao recuperar dados do banco");
  }
};
