import { Metric, Inverter } from "../generated/prisma";
import { TimeseriesValue } from "../types/generation.types";

export const calculateGeneration = (metrics: Metric[]): number => {
  if (metrics.length < 2) return 0;

  let totalGeneration = 0;

  const sortedMetrics = [...metrics].sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
  );

  for (let i = 0; i < sortedMetrics.length - 1; i++) {
    const current = sortedMetrics[i];
    const next = sortedMetrics[i + 1];

    if (
      current.activePower < 0 ||
      next.activePower < 0 ||
      current.timestamp >= next.timestamp
    )
      continue;

    const timeDeltaHours =
      (next.timestamp.getTime() - current.timestamp.getTime()) / (1000 * 3600);

    const averagePower = (current.activePower + next.activePower) / 2;
    totalGeneration += averagePower * timeDeltaHours;
  }

  return parseFloat((totalGeneration / 1000).toFixed(4));
};
