-- CreateTable
CREATE TABLE `JenisPengeluaran` (
    `id` VARCHAR(191) NOT NULL,
    `jenisPengeluaran` VARCHAR(255) NOT NULL,
    `keterangan` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Perlengkapan` (
    `id` VARCHAR(191) NOT NULL,
    `namaPerlengkapan` VARCHAR(255) NOT NULL,
    `keterangan` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
