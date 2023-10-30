/*
  Warnings:

  - You are about to drop the column `nome` on the `departamentos` table. All the data in the column will be lost.
  - You are about to drop the column `origem` on the `respostas` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `solicitacoes` table. All the data in the column will be lost.
  - Added the required column `tipo` to the `departamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `funcao` to the `respostas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pedidoId` to the `solicitacoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `alunos` ADD COLUMN `cargo` VARCHAR(191) NOT NULL DEFAULT 'aluno';

-- AlterTable
ALTER TABLE `departamentos` DROP COLUMN `nome`,
    ADD COLUMN `tipo` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `respostas` DROP COLUMN `origem`,
    ADD COLUMN `funcao` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `secretarios` ADD COLUMN `cargo` VARCHAR(191) NOT NULL DEFAULT 'secretario';

-- AlterTable
ALTER TABLE `solicitacoes` DROP COLUMN `tipo`,
    ADD COLUMN `pedidoId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `solicitacoes` ADD CONSTRAINT `solicitacoes_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `departamentos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
