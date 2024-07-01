/*
  Warnings:

  - You are about to drop the column `nominal` on the `Merchandise` table. All the data in the column will be lost.
  - You are about to drop the column `point` on the `Merchandise` table. All the data in the column will be lost.
  - Added the required column `gambar` to the `Merchandise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama` to the `Merchandise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nilai` to the `Merchandise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Merchandise` DROP COLUMN `nominal`,
    DROP COLUMN `point`,
    ADD COLUMN `gambar` TEXT NOT NULL,
    ADD COLUMN `nama` VARCHAR(191) NOT NULL,
    ADD COLUMN `nilai` INTEGER NOT NULL;
