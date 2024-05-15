-- CreateTable
CREATE TABLE `Customer` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
    `noWa` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `alamat` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `limitCredit` INTEGER NOT NULL DEFAULT 0,
    `point` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(6) NOT NULL,

    UNIQUE INDEX `Customer_noWa_key`(`noWa`),
    UNIQUE INDEX `Customer_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
