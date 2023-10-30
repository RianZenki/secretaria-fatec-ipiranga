/*
  Warnings:

  - You are about to drop the column `remetente` on the `respostas` table. All the data in the column will be lost.
  - Added the required column `criado_por` to the `respostas` table without a default value. This is not possible if the table is not empty.
  - Made the column `alunoId` on table `solicitacoes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `solicitacoes` DROP FOREIGN KEY `solicitacoes_alunoId_fkey`;

-- AlterTable
ALTER TABLE `respostas` DROP COLUMN `remetente`,
    ADD COLUMN `criado_por` VARCHAR(191) NOT NULL,
    ADD COLUMN `secretarioId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `solicitacoes` MODIFY `alunoId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `solicitacoes` ADD CONSTRAINT `solicitacoes_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `alunos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `respostas` ADD CONSTRAINT `respostas_secretarioId_fkey` FOREIGN KEY (`secretarioId`) REFERENCES `secretarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
