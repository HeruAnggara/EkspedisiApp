/*
  Warnings:

  - You are about to alter the column `jenisPengeluaran` on the `DaftarPengeluaran` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.

*/
-- AlterTable
ALTER TABLE `DaftarPengeluaran` MODIFY `jenisPengeluaran` INTEGER NOT NULL;
