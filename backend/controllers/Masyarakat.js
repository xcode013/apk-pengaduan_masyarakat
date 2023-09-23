import {PrismaClient} from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();

export const getMasyarakat = async (req, res) => {
  try {
    const response = await prisma.masyarakat.findMany({
      select: {
        nik: true,
        name: true,
        username: true,
        phone: true,
        pengaduan: {
          select: {
            isi_laporan: true,
            tgl_pengaduan: true,
            id: true,
            foto: true,
            url_foto: true,
            status: true,
          },
        },
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({msg: `Error Occured: ${error.massage}`});
  }
};

export const getMasyarakatByPk = async (req, res) => {
  try {
    const response = await prisma.masyarakat.findUnique({
      select: {
        nik: true,
        name: true,
        username: true,
        phone: true,
        pengaduan: {
          select: {
            isi_laporan: true,
            tgl_pengaduan: true,
            id: true,
            foto: true,
            url_foto: true,
            status: true,
          },
        },
      },
      where: {
        nik: req.params.pk,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({msg: error});
  }
};

export const addMasyarakat = async (req, res) => {
  const {nik, name, username, password, confirmPass, phone} = req.body;

  if (confirmPass !== password)
    return res
      .status(400)
      .json({msg: `Password and Confirm Password not matches`});

  const hashedPassword = await argon2.hash(password);

  try {
    await prisma.masyarakat.create({
      data: {
        nik: nik,
        name: name,
        username: username,
        password: hashedPassword,
        phone: phone,
      },
    });
    res.status(201).json({msg: `New Masyarakat has added successfuly`});
  } catch (error) {
    res.status(400).json({msg: 'Fail to adding new Masyarakat'});
  }
};

export const updateMasyarakat = async (req, res) => {
  const masyarakat = await prisma.masyarakat.findUnique({
    where: {
      nik: req.params.pk,
    },
  });

  if (!masyarakat) return res.status(404).json({msg: `Masyarakat not found`});

  const {nik, name, username, password, confirmPass, phone} = req.body;

  if (confirmPass !== password)
    return res
      .status(400)
      .json({msg: `Password and Confirm Password not matches`});

  let hashedPassword;
  if (!password || password === null || password === '') {
    hashedPassword = masyarakat.password;
  } else {
    hashedPassword = await argon2.hash(password);
  }

  try {
    await prisma.masyarakat.update({
      where: {
        nik: masyarakat.nik,
      },
      data: {
        nik: nik,
        name: name,
        username: username,
        password: hashedPassword,
        phone: phone,
      },
    });

    res.status(200).json({msg: `Updating Masyarakat successfuly now`});
  } catch (error) {
    res
      .status(400)
      .json({msg: `Updating Masyarakat has failed. Error Occured: ${error}`});
  }
};

export const deleteMasyarakat = async (req, res) => {
  const masyarakat = await prisma.masyarakat.findUnique({
    where: {
      nik: req.params.pk,
    },
  });

  if (!masyarakat) return res.status(404).json({msg: `Masyarakat not found`});

  try {
    await prisma.masyarakat.delete({
      where: {
        nik: masyarakat.nik,
      },
    });

    res.status(200).json({msg: `Deleting Masyarakat successfuly`});
  } catch (error) {
    res.status(400).json({
      msg: `Deleting Masyarskat has Failed. Error occured with hproblems: ${error}`,
    });
  }
};
