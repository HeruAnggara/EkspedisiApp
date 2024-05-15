-- CreateTable
CREATE TABLE `PemasukkanLain` (
    `id` VARCHAR(191) NOT NULL,
    `kategori` VARCHAR(255) NOT NULL,
    `namaCustomer` VARCHAR(255) NOT NULL,
    `harga` INTEGER NOT NULL,
    `tanggalTransaksi` DATE NOT NULL,
    `komisi` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
