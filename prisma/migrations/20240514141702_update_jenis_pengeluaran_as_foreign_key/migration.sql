-- AlterTable
ALTER TABLE `DaftarPengeluaran` MODIFY `jenisPengeluaran` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `DaftarPengeluaran` ADD CONSTRAINT `DaftarPengeluaran_jenisPengeluaran_fkey` FOREIGN KEY (`jenisPengeluaran`) REFERENCES `JenisPengeluaran`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
