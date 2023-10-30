/*
  Warnings:

  - You are about to drop the column `pedidoId` on the `solicitacoes` table. All the data in the column will be lost.
  - You are about to alter the column `tipo_pedidoId` on the `solicitacoes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `tipos_pedidos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `tipos_pedidos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `departamentos_secretarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `departamentos_secretarios` DROP FOREIGN KEY `departamentos_secretarios_secretarioId_fkey`;

-- DropForeignKey
ALTER TABLE `departamentos_secretarios` DROP FOREIGN KEY `departamentos_secretarios_tipo_pedidoId_fkey`;

-- DropForeignKey
ALTER TABLE `solicitacoes` DROP FOREIGN KEY `solicitacoes_tipo_pedidoId_fkey`;

-- AlterTable
ALTER TABLE `solicitacoes` DROP COLUMN `pedidoId`,
    MODIFY `tipo_pedidoId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tipos_pedidos` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `departamentos_secretarios`;

-- CreateTable
CREATE TABLE `tipo_pedidos_secretarios` (
    `id` VARCHAR(191) NOT NULL,
    `secretarioId` VARCHAR(191) NOT NULL,
    `tipo_pedidoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `solicitacoes` ADD CONSTRAINT `solicitacoes_tipo_pedidoId_fkey` FOREIGN KEY (`tipo_pedidoId`) REFERENCES `tipos_pedidos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tipo_pedidos_secretarios` ADD CONSTRAINT `tipo_pedidos_secretarios_tipo_pedidoId_fkey` FOREIGN KEY (`tipo_pedidoId`) REFERENCES `tipos_pedidos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tipo_pedidos_secretarios` ADD CONSTRAINT `tipo_pedidos_secretarios_secretarioId_fkey` FOREIGN KEY (`secretarioId`) REFERENCES `secretarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
