-- CreateTable
CREATE TABLE `Supplier` (
    `id` VARCHAR(191) NOT NULL,
    `namaSupplier` VARCHAR(255) NOT NULL,
    `keteranganBarang` VARCHAR(255) NULL,
    `harga` INTEGER NOT NULL,
    `jumlahBarang` INTEGER NOT NULL,
    `nomorHp` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
