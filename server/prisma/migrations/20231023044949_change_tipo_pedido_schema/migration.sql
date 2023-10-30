/*
  Warnings:

  - You are about to drop the `pedidos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tipo_pedidoId` to the `departamentos_secretarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_pedidoId` to the `solicitacoes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `departamentos_secretarios` DROP FOREIGN KEY `departamentos_secretarios_departamentoId_fkey`;

-- DropForeignKey
ALTER TABLE `solicitacoes` DROP FOREIGN KEY `solicitacoes_pedidoId_fkey`;

-- AlterTable
ALTER TABLE `departamentos_secretarios` ADD COLUMN `tipo_pedidoId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `solicitacoes` ADD COLUMN `tipo_pedidoId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `pedidos`;

-- CreateTable
CREATE TABLE `tipos_pedidos` (
    `id` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tipos_pedidos_tipo_key`(`tipo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `solicitacoes` ADD CONSTRAINT `solicitacoes_tipo_pedidoId_fkey` FOREIGN KEY (`tipo_pedidoId`) REFERENCES `tipos_pedidos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `departamentos_secretarios` ADD CONSTRAINT `departamentos_secretarios_tipo_pedidoId_fkey` FOREIGN KEY (`tipo_pedidoId`) REFERENCES `tipos_pedidos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
