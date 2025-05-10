import { PrismaClient } from "./generated/prisma";
import metrics from "../metrics.json";

const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.$executeRaw`TRUNCATE TABLE "Metric" CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Inverter" CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Plant" CASCADE`;

    await prisma.plant.createMany({
      data: [
        { id: 1, name: "Usina Solar Norte" },
        { id: 2, name: "Usina Solar Sul" },
      ],
    });

    await prisma.inverter.createMany({
      data: [
        ...Array.from({ length: 4 }, (_, i) => ({ id: i + 1, plantId: 1 })),
        ...Array.from({ length: 4 }, (_, i) => ({ id: i + 5, plantId: 2 })),
      ],
    });

    const metricPromises = metrics.map((metric) => {
      return prisma.metric.createMany({
        data: {
          inverterId: metric.inversor_id,
          activePower: metric.potencia_ativa_watt || 0,
          temperature: metric.temperatura_celsius || 0,
          timestamp: new Date(metric.datetime.$date),
        },
      });
    });

    await Promise.all(metricPromises);
    console.log("✅ Seed concluído com sucesso!");
    console.log(`Total de métricas inseridas: ${metrics.length}`);
  } catch (error) {
    console.error("❌ Erro no seed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
