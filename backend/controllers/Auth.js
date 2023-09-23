import {PrismaClient} from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient({log: ['error', 'info', 'query', 'warn']});

export const RegisterAsMasyarakat = async (req, res) => {
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

export const RegisterAsPetugas = async (req, res) => {
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

export const Login = async (req, res) => {
  const petugas = await prisma.petugas.findUnique({
    where: {
      username: req.body.identifier,
    },
  });

  const masyarakat = await prisma.masyarakat.findUnique({
    where: {
      username: req.body.identifier,
    },
  });

  if (!petugas && !masyarakat) {
    return res.status(404).json({
      msg: `Your data not found. Maybe your not Register first. Please Register now!`,
    });
  }

  let matchPassword;
  if (petugas && !masyarakat)
    matchPassword = await argon2.verify(petugas.password, req.body.password);
  else if (!petugas && masyarakat)
    matchPassword = await argon2.verify(masyarakat.password, req.body.password);

  if (!matchPassword) return res.status(400).json({msg: `Wrong Password`});

  if (petugas && !masyarakat) {
    req.session.userId = petugas.id;

    const {id, level, name, phone, username} = petugas;

    return res.status(200).json({id, level, name, phone, username});
  } else if (masyarakat && !petugas) {
    req.session.userId = masyarakat.nik;

    const {name, nik, phone, username} = masyarakat;

    return res.status(200).json({nik, name, phone, username});
  }
};

export const Me = async (req, res) => {
  if (!req.session.userId)
    return res.status(404).json({msg: 'Please login or register first'});

  const petugas = await prisma.petugas.findUnique({
    where: {
      id: req.session.userId,
    },
  });

  const masyarakat = await prisma.masyarakat.findUnique({
    where: {
      nik: req.session.userId,
    },
  });

  if (!petugas && !masyarakat) {
    return res.status(404).json({
      msg: `Login failed. Your data not exist here. Please login or register first`,
    });
  }

  if (petugas && !masyarakat) {
    const {id, level, name, phone, username} = petugas;

    return res.status(200).json({id, level, name, phone, username});
  } else if (masyarakat && !petugas) {
    const {name, nik, phone, username} = masyarakat;

    return res.status(200).json({nik, name, phone, username});
  }
};

export const Logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({msg: 'Failed to logout'});

    res.status(200).json({msg: "You've been logged out"});
  });
};
