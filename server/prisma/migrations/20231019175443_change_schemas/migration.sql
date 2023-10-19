/*
  Warnings:

  - You are about to drop the `departamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `departamento_secretario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `resposta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `secretario` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `atualizado_em` on table `solicitacoes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `arquivos` DROP FOREIGN KEY `arquivos_respostaId_fkey`;

-- DropForeignKey
ALTER TABLE `departamento_secretario` DROP FOREIGN KEY `Departamento_secretario_departamentoId_fkey`;

-- DropForeignKey
ALTER TABLE `departamento_secretario` DROP FOREIGN KEY `Departamento_secretario_secretarioId_fkey`;

-- DropForeignKey
ALTER TABLE `resposta` DROP FOREIGN KEY `Resposta_alunoId_fkey`;

-- DropForeignKey
ALTER TABLE `resposta` DROP FOREIGN KEY `Resposta_solicitacaoId_fkey`;

-- AlterTable
ALTER TABLE `solicitacoes` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'em andamento',
    MODIFY `atualizado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `departamento`;

-- DropTable
DROP TABLE `departamento_secretario`;

-- DropTable
DROP TABLE `resposta`;

-- DropTable
DROP TABLE `secretario`;

-- CreateTable
CREATE TABLE `respostas` (
    `id` VARCHAR(191) NOT NULL,
    `solicitacaoId` VARCHAR(191) NOT NULL,
    `remetente` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `origem` VARCHAR(191) NOT NULL,
    `alunoId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `departamentos` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `secretarios` (
    `id` VARCHAR(191) NOT NULL,
    `numeroMatricula` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `secretarios_numeroMatricula_key`(`numeroMatricula`),
    UNIQUE INDEX `secretarios_email_key`(`email`),
    UNIQUE INDEX `secretarios_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `departamentos_secretarios` (
    `id` VARCHAR(191) NOT NULL,
    `departamentoId` VARCHAR(191) NOT NULL,
    `secretarioId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `arquivos` ADD CONSTRAINT `arquivos_respostaId_fkey` FOREIGN KEY (`respostaId`) REFERENCES `respostas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `respostas` ADD CONSTRAINT `respostas_solicitacaoId_fkey` FOREIGN KEY (`solicitacaoId`) REFERENCES `solicitacoes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `respostas` ADD CONSTRAINT `respostas_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `alunos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `departamentos_secretarios` ADD CONSTRAINT `departamentos_secretarios_departamentoId_fkey` FOREIGN KEY (`departamentoId`) REFERENCES `departamentos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `departamentos_secretarios` ADD CONSTRAINT `departamentos_secretarios_secretarioId_fkey` FOREIGN KEY (`secretarioId`) REFERENCES `secretarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
