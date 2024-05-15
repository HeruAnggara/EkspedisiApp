-- CreateTable
CREATE TABLE `PembelianPerlengkapan` (
    `id` VARCHAR(191) NOT NULL,
    `tanggalPembelian` DATE NOT NULL,
    `idPerlengkapan` VARCHAR(191) NOT NULL,
    `idSupplier` VARCHAR(191) NOT NULL,
    `harga` INTEGER NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `keterangan` VARCHAR(255) NULL,
    `nota` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PembelianPerlengkapan` ADD CONSTRAINT `PembelianPerlengkapan_idPerlengkapan_fkey` FOREIGN KEY (`idPerlengkapan`) REFERENCES `Perlengkapan`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PembelianPerlengkapan` ADD CONSTRAINT `PembelianPerlengkapan_idSupplier_fkey` FOREIGN KEY (`idSupplier`) REFERENCES `Supplier`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
