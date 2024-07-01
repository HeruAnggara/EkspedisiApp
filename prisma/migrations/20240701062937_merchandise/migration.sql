-- CreateTable
CREATE TABLE `Merchandise` (
    `id` VARCHAR(191) NOT NULL,
    `point` INTEGER NOT NULL,
    `nominal` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
