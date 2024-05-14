/*
  Warnings:

  - You are about to alter the column `metodePembayaran` on the `DaftarPengeluaran` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `DaftarPengeluaran` MODIFY `metodePembayaran` ENUM('Tunai', 'Transfer', 'Kartu_Kredit') NOT NULL;
