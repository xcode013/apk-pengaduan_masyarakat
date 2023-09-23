import {PrismaClient} from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient({log: ['error', 'info', 'query', 'warn']});

export const getPengaduanByStatusClear = async (req, res) => {
  try {
    const response = await prisma.pengaduan.findMany({
      where: {
        status: 'Selesai',
      },
      include: {
        tanggapan: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.json({msg: `Fail to get report by status. error: ${error.massage}`});
  }
};

export const writePengaduan = async (req, res) => {
  // Verify request file
  if (!req.files) return res.status(400).json({msg: `No file uploaded`});

  // variable data
  const {nik, laporan, status} = req.body;

  const image = req.files.file;
  const imgSize = image.data.length;
  const extName = path.extname(image.name);
  const imgName = image.md5 + extName;
  const url = `${req.protocol}://${req.get('host')}/images/${imgName}`;

  // Verify user account
  if (nik !== req.masyarakatId)
    return res.status(403).json({msg: `This is not your account`});

  // Array of allowed types extension which accepted
  const allowedTypes = ['.png', '.jpg', '.jpeg'];

  // Check format/extension image/file
  if (!allowedTypes.includes(extName.toLowerCase())) {
    return res.status(422).json({msg: `Invalid format image`});
  }

  // Check size image/file
  if (imgSize > 5000000) {
    return res.status(422).json({msg: `Image must be less than 5mb`});
  }

  image.mv(`./public/images/${imgName}`, async (err) => {
    if (err) return res.status(500).json({msg: err.massage});
    try {
      // Creating ne Pengaduan
      await prisma.pengaduan.create({
        data: {
          isi_laporan: laporan,
          nik: nik,
          foto: imgName,
          url_foto: url,
          status: status,
        },
      });
      console.log('succcesss');
      res.status(201).json({msg: `Pengaduan has reported`});
    } catch (error) {
      // if return false will resturn this
      res.json({msg: `Fail to report. error: ${error.massage}`});
    }
  });
};

export const verifyPengaduan = async (req, res) => {
  const pengaduan = await prisma.pengaduan.findUnique({
    where: {
      id: Number(req.params.pk),
    },
  });

  if (!pengaduan) return res.status(404).json({msg: `report not found`});

  let status;
  if (
    req.body.status === 'Ditolak' ||
    req.body.status === 'Diproses' ||
    req.body.status === 'Selesai'
  )
    status = req.body.status;
  else
    return res
      .status(400)
      .json({msg: "status must be 'Ditolak' or 'Diproses'"});

  try {
    await prisma.pengaduan.update({
      where: {
        id: pengaduan.id,
      },
      data: {
        status: status,
      },
    });

    res.status(200).json({msg: `Updating report successfuly`});
  } catch (error) {
    res.json({msg: `failed to update report. Error: ${error}`});
  }
};

export const getPengaduan = async (req, res) => {
  // console.log(req);
  try {
    // const response = await prisma.pengaduan.findMany();
    let response;
    if (req.level) {
      response = await prisma.pengaduan.findMany({
        include: {
          tanggapan: true,
        },
      });
    } else {
      response = await prisma.pengaduan.findMany({
        where: {
          nik: req.masyarakatId,
        },
        include: {
          tanggapan: true,
        },
      });
    }

    res.status(200).json(response);
  } catch (error) {
    res.json({msg: `Error occured: ${error.massage}`});
  }
};

export const getPengaduanByPk = async (req, res) => {
  try {
    const response = await prisma.pengaduan.findUnique({
      where: {
        id: Number(req.params.pk),
      },
      include: {
        tanggapan: true,
        masyarakat: true,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({msg: `Error occured: ${error.massage}`});
  }
};

export const createPengaduan = async (req, res) => {
  console.log(req.file);
  if (!req.file) return res.status(400).json({msg: `No file uploaded`});

  const image = req.file;
  const {nik, laporan, status} = req.body;
  const url = `${req.protocol}://${req.get('host')}/images/${image.filename}`;

  const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

  if (!allowedTypes.includes(image.mimetype.toLowerCase())) {
    fs.unlinkSync(image.path);
    return res.status(422).json({msg: `Invalid format image`});
  }

  if (image.size > 5000000) {
    fs.unlinkSync(image.path);
    return res.status(422).json({msg: `Image must be less than 5mb`});
  }

  try {
    await prisma.pengaduan.create({
      data: {
        isi_laporan: laporan,
        nik: nik,
        foto: image.filename,
        url_foto: url,
        status: status,
      },
    });

    res.status(201).json({msg: `Pengaduan has reported`});
  } catch (error) {
    res.json({msg: `Fail to report. error: ${error.massage}`});
  }
};

export const updatePengaduan = async (req, res) => {
  const pengaduan = await prisma.pengaduan.findUnique({
    where: {
      id: Number(req.params.pk),
    },
  });

  if (!pengaduan) return res.status(404).json({msg: `report not found`});

  const image = req.file;
  const {nik, laporan, status} = req.body;
  let imageName;

  if (!image || image === null) {
    imageName = pengaduan.foto;
  } else {
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    if (!allowedTypes.includes(image.mimetype.toLowerCase())) {
      fs.unlinkSync(image.path);
      return res.status(422).json({msg: `Invalid format image`});
    }

    if (image.size > 5000000) {
      fs.unlinkSync(image.path);
      return res.status(422).json({msg: `Image must be less than 5mb`});
    }

    imageName = image.filename;

    const filePathWillDeleted = `./public/images/${pengaduan.foto}`;
    fs.unlinkSync(filePathWillDeleted);
  }

  const url = `${req.protocol}://${req.get('host')}/images/${imageName}`;

  try {
    await prisma.pengaduan.update({
      where: {
        id: pengaduan.id,
      },
      data: {
        isi_laporan: laporan,
        nik: nik,
        foto: imageName,
        url_foto: url,
        status: status,
      },
    });

    res.status(200).json({msg: `Updating report successfuly`});
  } catch (error) {
    res.json({msg: `failed to update report. Error: ${error}`});
  }
};

export const deletePengaduan = async (req, res) => {
  const pengaduan = await prisma.pengaduan.findUnique({
    where: {
      id: Number(req.params.pk),
    },
  });

  if (!pengaduan) return res.status(404).json({msg: `report not found`});

  try {
    const filePathWillDeleted = `./public/images/${pengaduan.foto}`;
    fs.unlinkSync(filePathWillDeleted);

    await prisma.pengaduan.delete({
      where: {
        id: pengaduan.id,
      },
    });

    res.status(200).json({msg: `Deleting report successfuly`});
  } catch (error) {
    res.json({msg: `failed to delete report. Error: ${error.massage}`});
  }
};
