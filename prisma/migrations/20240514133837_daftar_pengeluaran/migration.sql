-- CreateTable
CREATE TABLE `DaftarPengeluaran` (
    `id` VARCHAR(191) NOT NULL,
    `tglPengeluaran` DATE NOT NULL,
    `keterangan` VARCHAR(255) NULL,
    `jumlahPembayaran` INTEGER NOT NULL,
    `yangMembayar` VARCHAR(255) NOT NULL,
    `yangMenerima` VARCHAR(255) NOT NULL,
    `metodePembayaran` VARCHAR(255) NOT NULL,
    `buktiPembayaran` VARCHAR(255) NULL,
    `statusPengeluaran` INTEGER NOT NULL DEFAULT 2,
    `jenisPengeluaran` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
