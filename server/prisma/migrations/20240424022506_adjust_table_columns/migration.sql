/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `arquivos` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `secretarios` ADD COLUMN `ativo` BOOLEAN NOT NULL DEFAULT true,
    ALTER COLUMN `cargo` DROP DEFAULT;

-- AlterTable
ALTER TABLE `solicitacoes` ADD COLUMN `encerrado_por` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `arquivos_nome_key` ON `arquivos`(`nome`);
