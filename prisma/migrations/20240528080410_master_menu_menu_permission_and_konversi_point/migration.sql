-- CreateTable
CREATE TABLE `MasterMenu` (
    `id` VARCHAR(191) NOT NULL,
    `parentId` INTEGER NOT NULL DEFAULT 0,
    `nameMenu` VARCHAR(255) NOT NULL,
    `icon` VARCHAR(255) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `isDropdown` BOOLEAN NOT NULL DEFAULT false,
    `position` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MenuPermission` (
    `id` VARCHAR(191) NOT NULL,
    `levelId` INTEGER NOT NULL,
    `menuId` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KonversiPoint` (
    `id` VARCHAR(191) NOT NULL,
    `point` INTEGER NOT NULL,
    `nominal` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MenuPermission` ADD CONSTRAINT `MenuPermission_levelId_fkey` FOREIGN KEY (`levelId`) REFERENCES `Level`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `MenuPermission` ADD CONSTRAINT `MenuPermission_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `MasterMenu`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
