-- CreateTable
CREATE TABLE `tbl_genero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `tbl_genero_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_contratante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `tbl_contratante_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_dados_pessoais_contratante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `cpf` VARCHAR(15) NOT NULL,
    `data_nascimento` DATETIME(3) NOT NULL,
    `biografia` VARCHAR(191) NULL,
    `foto_perfil` VARCHAR(191) NULL,
    `id_contratante` INTEGER NOT NULL,
    `id_genero` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_dados_pessoais_contratante_cpf_key`(`cpf`),
    UNIQUE INDEX `tbl_dados_pessoais_contratante_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_telefone_contratante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_telefone` VARCHAR(50) NOT NULL,
    `ddd` VARCHAR(2) NOT NULL,
    `id_dados_pessoais_contratante` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_telefone_contratante_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_estado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sigla` VARCHAR(2) NOT NULL,
    `nome` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `tbl_estado_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_cidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `id_estado` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_cidade_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_endereco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logradouro` VARCHAR(45) NOT NULL,
    `bairro` VARCHAR(50) NOT NULL,
    `cep` VARCHAR(10) NOT NULL,
    `numero_residencial` INTEGER NOT NULL,
    `complemento` VARCHAR(191) NULL,
    `id_cidade` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_endereco_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_perfil_casa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantidade_comodos` INTEGER NOT NULL,
    `status_crianca` BOOLEAN NOT NULL,
    `status_animal` BOOLEAN NOT NULL,
    `tipo_propriedade` VARCHAR(50) NOT NULL,
    `informacao_adicional` TEXT NOT NULL,
    `id_endereco` INTEGER NOT NULL,
    `id_contratante` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_perfil_casa_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_dados_pessoais_contratante` ADD CONSTRAINT `tbl_dados_pessoais_contratante_id_contratante_fkey` FOREIGN KEY (`id_contratante`) REFERENCES `tbl_contratante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_dados_pessoais_contratante` ADD CONSTRAINT `tbl_dados_pessoais_contratante_id_genero_fkey` FOREIGN KEY (`id_genero`) REFERENCES `tbl_genero`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_telefone_contratante` ADD CONSTRAINT `tbl_telefone_contratante_id_dados_pessoais_contratante_fkey` FOREIGN KEY (`id_dados_pessoais_contratante`) REFERENCES `tbl_dados_pessoais_contratante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_cidade` ADD CONSTRAINT `tbl_cidade_id_estado_fkey` FOREIGN KEY (`id_estado`) REFERENCES `tbl_estado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_endereco` ADD CONSTRAINT `tbl_endereco_id_cidade_fkey` FOREIGN KEY (`id_cidade`) REFERENCES `tbl_cidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_perfil_casa` ADD CONSTRAINT `tbl_perfil_casa_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `tbl_endereco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_perfil_casa` ADD CONSTRAINT `tbl_perfil_casa_id_contratante_fkey` FOREIGN KEY (`id_contratante`) REFERENCES `tbl_contratante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
