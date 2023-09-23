import {PrismaClient} from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();

export const getPetugas = async (req, res) => {
  try {
    const response = await prisma.petugas.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        phone: true,
        level: true,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({msg: `Error occured: ${error.massage}`});
  }
};

export const getPetugasByPk = async (req, res) => {
  try {
    const response = await prisma.petugas.findUnique({
      where: {
        id: req.params.pk,
      },
      select: {
        id: true,
        name: true,
        username: true,
        phone: true,
        level: true,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.json({msg: `Error Occured: ${error.massage}`});
  }
};

export const addPetugas = async (req, res) => {
  const {name, username, password, confirmPass, phone, level} = req.body;

  if (confirmPass !== password)
    return res
      .status(400)
      .json({msg: `Password and Confirm Password not matches`});

  const hashedPassword = await argon2.hash(password);

  try {
    await prisma.petugas.create({
      data: {
        name: name,
        username: username,
        password: hashedPassword,
        phone: phone,
        level: level,
      },
    });

    res.status(201).json({msg: `Adding Petugas successfuly`});
  } catch (error) {
    res
      .status(400)
      .json({msg: `Failed to add Petugas. Problem: ${error.massage}`});
  }
};

export const updatePetugas = async (req, res) => {
  const petugas = await prisma.petugas.findUnique({
    where: {
      id: req.params.pk,
    },
  });

  if (!petugas) return res.status(404).json({msg: `Petugas not found`});

  const {id, name, username, password, confirmPass, phone, level} = req.body;

  if (confirmPass !== password)
    return res
      .status(400)
      .json({msg: `Password and Confirm Password not matches`});

  let hashedPassword;
  if (!password || password === null || password === '') {
    hashedPassword = petugas.password;
  } else {
    hashedPassword = await argon2.hash(password);
  }

  try {
    await prisma.petugas.update({
      where: {
        id: petugas.id,
      },
      data: {
        id: id,
        name: name,
        username: username,
        password: hashedPassword,
        phone: phone,
        level: level,
      },
    });

    res.status(200).json({msg: `Updating Petugas successfuly`});
  } catch (error) {
    res.json({msg: `Failed to updating Petugas. Problem : ${error}`});
  }
};

export const deletePetugas = async (req, res) => {
  const petugas = await prisma.petugas.findUnique({
    where: {
      id: req.params.pk,
    },
  });

  if (!petugas) return res.status(404).json({msg: `Petugas not found`});

  try {
    await prisma.petugas.delete({
      where: {
        id: petugas.id,
      },
    });

    res.status(200).json({msg: `Deleting Petugas successfuly`});
  } catch (error) {
    res.json({msg: `Failed to deleting Petugas. Problem : ${error}`});
  }
};
