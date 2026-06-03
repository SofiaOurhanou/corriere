/*
  Warnings:

  - You are about to drop the column `chiaveTracking` on the `Consegna` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[trackingKey]` on the table `Consegna` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `trackingKey` to the `Consegna` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Consegna_chiaveTracking_key";

-- AlterTable
ALTER TABLE "Consegna" DROP COLUMN "chiaveTracking",
ADD COLUMN     "trackingKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Consegna_trackingKey_key" ON "Consegna"("trackingKey");
