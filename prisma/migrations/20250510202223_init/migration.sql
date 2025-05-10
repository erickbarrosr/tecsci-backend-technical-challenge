/*
  Warnings:

  - Made the column `temperature` on table `Metric` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Metric" ALTER COLUMN "temperature" SET NOT NULL;
