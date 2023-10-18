-- CreateTable
CREATE TABLE `alunos` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `curso` VARCHAR(191) NOT NULL,
    `turno` VARCHAR(191) NOT NULL,
    `ra` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `autenticado` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `alunos_email_key`(`email`),
    UNIQUE INDEX `alunos_ra_key`(`ra`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
