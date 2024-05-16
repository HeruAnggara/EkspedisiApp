/*
  Warnings:

  - You are about to alter the column `beratBarang` on the `DataPengiriman` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal(8,2)`.

*/
-- AlterTable
ALTER TABLE `DataPengiriman` MODIFY `beratBarang` DECIMAL(8, 2) NOT NULL;
