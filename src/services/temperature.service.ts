import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

interface DailyAvgTemperature {
  date: string;
  avgTemperature: number;
}

export const getDailyAvgTemperature = async (
  inverterId: number,
  startDate: Date,
  endDate: Date
): Promise<DailyAvgTemperature[]> => {
  try {
    const results = await prisma.metric.groupBy({
      by: ["timestamp"],
      where: {
        inverterId,
        timestamp: { gte: startDate, lte: endDate },
        temperature: { not: undefined },
      },
      _avg: { temperature: true },
      orderBy: { timestamp: "asc" },
    });

    const dailyAverages = results.reduce((acc, { timestamp, _avg }) => {
      const dateKey = timestamp.toISOString().split("T")[0];

      if (!acc[dateKey]) {
        acc[dateKey] = {
          sum: _avg.temperature || 0,
          count: 1,
        };
      } else {
        acc[dateKey].sum += _avg.temperature || 0;
        acc[dateKey].count++;
      }

      return acc;
    }, {} as Record<string, { sum: number; count: number }>);

    return Object.entries(dailyAverages).map(([date, { sum, count }]) => ({
      date,
      avgTemperature: parseFloat((sum / count).toFixed(2)),
    }));
  } catch (error) {
    console.error("Erro no temperature.service:", error);
    throw new Error("Falha ao calcular médias de temperatura");
  }
};
