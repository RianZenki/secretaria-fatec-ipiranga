/*
  Warnings:

  - You are about to drop the `departamentos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `departamentos_secretarios` DROP FOREIGN KEY `departamentos_secretarios_departamentoId_fkey`;

-- DropForeignKey
ALTER TABLE `solicitacoes` DROP FOREIGN KEY `solicitacoes_pedidoId_fkey`;

-- DropTable
DROP TABLE `departamentos`;

-- CreateTable
CREATE TABLE `pedidos` (
    `id` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `solicitacoes` ADD CONSTRAINT `solicitacoes_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `departamentos_secretarios` ADD CONSTRAINT `departamentos_secretarios_departamentoId_fkey` FOREIGN KEY (`departamentoId`) REFERENCES `pedidos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
