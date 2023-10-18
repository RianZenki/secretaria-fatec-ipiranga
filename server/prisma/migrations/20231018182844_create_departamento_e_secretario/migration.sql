/*
  Warnings:

  - Added the required column `origem` to the `Resposta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `resposta` ADD COLUMN `alunoId` VARCHAR(191) NULL,
    ADD COLUMN `origem` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Departamento` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Secretario` (
    `id` VARCHAR(191) NOT NULL,
    `numeroMatricula` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Secretario_numeroMatricula_key`(`numeroMatricula`),
    UNIQUE INDEX `Secretario_email_key`(`email`),
    UNIQUE INDEX `Secretario_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Departamento_secretario` (
    `id` VARCHAR(191) NOT NULL,
    `departamentoId` VARCHAR(191) NOT NULL,
    `secretarioId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Resposta` ADD CONSTRAINT `Resposta_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `alunos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Departamento_secretario` ADD CONSTRAINT `Departamento_secretario_departamentoId_fkey` FOREIGN KEY (`departamentoId`) REFERENCES `Departamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Departamento_secretario` ADD CONSTRAINT `Departamento_secretario_secretarioId_fkey` FOREIGN KEY (`secretarioId`) REFERENCES `Secretario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
