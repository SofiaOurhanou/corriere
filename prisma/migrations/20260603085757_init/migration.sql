-- CreateEnum
CREATE TYPE "StatoConsegna" AS ENUM ('DA_RITIRARE', 'IN_DEPOSITO', 'IN_CONSEGNA', 'CONSEGNATA', 'IN_GIACENZA');

-- CreateTable
CREATE TABLE "Operatore" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cognome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Operatore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nominativo" TEXT NOT NULL,
    "via" TEXT NOT NULL,
    "comune" TEXT NOT NULL,
    "provincia" TEXT,
    "telefono" TEXT,
    "email" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consegna" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "chiaveTracking" TEXT NOT NULL,
    "dataRitiro" TIMESTAMP(3) NOT NULL,
    "dataConsegna" TIMESTAMP(3),
    "stato" "StatoConsegna" NOT NULL DEFAULT 'DA_RITIRARE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Consegna_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Operatore_email_key" ON "Operatore"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Consegna_chiaveTracking_key" ON "Consegna"("chiaveTracking");

-- CreateIndex
CREATE INDEX "Consegna_clienteId_idx" ON "Consegna"("clienteId");

-- CreateIndex
CREATE INDEX "Consegna_stato_idx" ON "Consegna"("stato");

-- CreateIndex
CREATE INDEX "Consegna_dataRitiro_idx" ON "Consegna"("dataRitiro");

-- AddForeignKey
ALTER TABLE "Consegna" ADD CONSTRAINT "Consegna_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
