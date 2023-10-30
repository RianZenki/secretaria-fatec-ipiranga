/*
  Warnings:

  - You are about to alter the column `cargo` on the `alunos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - You are about to drop the column `funcao` on the `respostas` table. All the data in the column will be lost.
  - You are about to alter the column `cargo` on the `secretarios` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - A unique constraint covering the columns `[tipo]` on the table `pedidos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cargo` to the `respostas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `alunos` MODIFY `cargo` ENUM('ALUNO', 'SECRETARIO', 'SECRETARIO_GERAL') NOT NULL DEFAULT 'ALUNO';

-- AlterTable
ALTER TABLE `respostas` DROP COLUMN `funcao`,
    ADD COLUMN `cargo` ENUM('ALUNO', 'SECRETARIO', 'SECRETARIO_GERAL') NOT NULL;

-- AlterTable
ALTER TABLE `secretarios` MODIFY `cargo` ENUM('ALUNO', 'SECRETARIO', 'SECRETARIO_GERAL') NOT NULL DEFAULT 'SECRETARIO';

-- CreateIndex
CREATE UNIQUE INDEX `pedidos_tipo_key` ON `pedidos`(`tipo`);
