-- CreateTable
CREATE TABLE `DataPengiriman` (
    `id` VARCHAR(191) NOT NULL,
    `noResi` VARCHAR(255) NOT NULL,
    `tglTransaksi` DATE NOT NULL,
    `namaPengirim` VARCHAR(255) NOT NULL,
    `noWaPengirim` VARCHAR(255) NOT NULL,
    `namaPenerima` VARCHAR(255) NOT NULL,
    `noWaPenerima` VARCHAR(255) NOT NULL,
    `kota_tujuan` VARCHAR(255) NOT NULL,
    `beratBarang` DECIMAL NOT NULL,
    `ongkir` INTEGER NOT NULL,
    `komisi` INTEGER NOT NULL,
    `statusPembayaran` INTEGER NOT NULL,
    `metodePembayaran` ENUM('Tunai', 'Transfer', 'Kartu_Kredit') NOT NULL,
    `bank` VARCHAR(255) NULL,
    `buktiPembayaran` VARCHAR(255) NULL,
    `jenisPengiriman` VARCHAR(191) NOT NULL,
    `bawaSendiri` BOOLEAN NOT NULL DEFAULT false,
    `statusPengiriman` VARCHAR(191) NOT NULL,
    `keterangan` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StatusPengiriman` (
    `id` VARCHAR(191) NOT NULL,
    `statusPengiriman` VARCHAR(255) NOT NULL,
    `keterangan` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JenisPengiriman` (
    `id` VARCHAR(191) NOT NULL,
    `jenisPengiriman` VARCHAR(255) NOT NULL,
    `keterangan` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DataPengiriman` ADD CONSTRAINT `DataPengiriman_jenisPengiriman_fkey` FOREIGN KEY (`jenisPengiriman`) REFERENCES `JenisPengiriman`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `DataPengiriman` ADD CONSTRAINT `DataPengiriman_statusPengiriman_fkey` FOREIGN KEY (`statusPengiriman`) REFERENCES `StatusPengiriman`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
