-- CreateTable
CREATE TABLE `Bank` (
    `id` VARCHAR(191) NOT NULL,
    `namaBank` VARCHAR(15) NOT NULL,
    `cabang` VARCHAR(30) NOT NULL,
    `noRekening` VARCHAR(30) NOT NULL,
    `namaPemilik` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
