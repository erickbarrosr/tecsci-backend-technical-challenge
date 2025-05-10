/*
  Warnings:

  - You are about to drop the `Inversor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Metrica` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usina` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Inversor" DROP CONSTRAINT "Inversor_usinaId_fkey";

-- DropForeignKey
ALTER TABLE "Metrica" DROP CONSTRAINT "Metrica_inversorId_fkey";

-- DropTable
DROP TABLE "Inversor";

-- DropTable
DROP TABLE "Metrica";

-- DropTable
DROP TABLE "Usina";

-- CreateTable
CREATE TABLE "Plant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inverter" (
    "id" SERIAL NOT NULL,
    "plantId" INTEGER NOT NULL,

    CONSTRAINT "Inverter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metric" (
    "id" SERIAL NOT NULL,
    "inverterId" INTEGER NOT NULL,
    "activePower" DOUBLE PRECISION NOT NULL,
    "temperature" DOUBLE PRECISION,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Inverter" ADD CONSTRAINT "Inverter_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_inverterId_fkey" FOREIGN KEY ("inverterId") REFERENCES "Inverter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
