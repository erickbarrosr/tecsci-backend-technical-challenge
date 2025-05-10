-- CreateTable
CREATE TABLE "Usina" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Usina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inversor" (
    "id" SERIAL NOT NULL,
    "usinaId" INTEGER NOT NULL,

    CONSTRAINT "Inversor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metrica" (
    "id" SERIAL NOT NULL,
    "inversorId" INTEGER NOT NULL,
    "potenciaAtiva" DOUBLE PRECISION NOT NULL,
    "temperatura" DOUBLE PRECISION,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Metrica_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Inversor" ADD CONSTRAINT "Inversor_usinaId_fkey" FOREIGN KEY ("usinaId") REFERENCES "Usina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metrica" ADD CONSTRAINT "Metrica_inversorId_fkey" FOREIGN KEY ("inversorId") REFERENCES "Inversor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
