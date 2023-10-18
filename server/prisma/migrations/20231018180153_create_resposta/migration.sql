-- AlterTable
ALTER TABLE `arquivos` ADD COLUMN `respostaId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Resposta` (
    `id` VARCHAR(191) NOT NULL,
    `solicitacaoId` VARCHAR(191) NOT NULL,
    `remetente` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `arquivos` ADD CONSTRAINT `arquivos_respostaId_fkey` FOREIGN KEY (`respostaId`) REFERENCES `Resposta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Resposta` ADD CONSTRAINT `Resposta_solicitacaoId_fkey` FOREIGN KEY (`solicitacaoId`) REFERENCES `solicitacoes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
