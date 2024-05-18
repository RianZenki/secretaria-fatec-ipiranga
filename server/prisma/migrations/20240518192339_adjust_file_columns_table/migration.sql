/*
  Warnings:

  - Added the required column `extensao` to the `arquivos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tamanho` to the `arquivos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `arquivos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `arquivos` ADD COLUMN `extensao` VARCHAR(191) NOT NULL,
    ADD COLUMN `tamanho` VARCHAR(191) NOT NULL,
    ADD COLUMN `url` VARCHAR(191) NOT NULL;
