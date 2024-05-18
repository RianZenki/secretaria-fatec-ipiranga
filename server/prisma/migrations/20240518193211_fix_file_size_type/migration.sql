/*
  Warnings:

  - You are about to alter the column `tamanho` on the `arquivos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `arquivos` MODIFY `tamanho` INTEGER NOT NULL;
