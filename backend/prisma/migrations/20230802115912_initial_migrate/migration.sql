-- CreateTable
CREATE TABLE `Masyarakat` (
    `nik` CHAR(16) NOT NULL,
    `name` VARCHAR(35) NOT NULL,
    `username` VARCHAR(25) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(13) NOT NULL,

    UNIQUE INDEX `Masyarakat_username_key`(`username`),
    PRIMARY KEY (`nik`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pengaduan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tgl_pengaduan` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nik` CHAR(16) NOT NULL,
    `isi_laporan` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NOT NULL,
    `url_foto` VARCHAR(191) NOT NULL,
    `status` ENUM('Dilaporkan', 'Ditolak', 'Diproses', 'Selesai') NOT NULL DEFAULT 'Dilaporkan',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tanggapan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pengaduanId` INTEGER NOT NULL,
    `tgl_pengaduan` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tanggapan` VARCHAR(191) NOT NULL,
    `petugasId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tanggapan_pengaduanId_key`(`pengaduanId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Petugas` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(35) NOT NULL,
    `username` VARCHAR(25) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(13) NOT NULL,
    `level` ENUM('Admin', 'Petugas') NOT NULL DEFAULT 'Admin',

    UNIQUE INDEX `Petugas_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sid` VARCHAR(191) NOT NULL,
    `data` MEDIUMTEXT NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sid_key`(`sid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pengaduan` ADD CONSTRAINT `Pengaduan_nik_fkey` FOREIGN KEY (`nik`) REFERENCES `Masyarakat`(`nik`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tanggapan` ADD CONSTRAINT `Tanggapan_pengaduanId_fkey` FOREIGN KEY (`pengaduanId`) REFERENCES `Pengaduan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tanggapan` ADD CONSTRAINT `Tanggapan_petugasId_fkey` FOREIGN KEY (`petugasId`) REFERENCES `Petugas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
