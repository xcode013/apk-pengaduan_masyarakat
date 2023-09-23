import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const verifyUsers = async (req, res, next) => {
  if (!req.session.userId)
    return res.status(401).json({msg: `You not login. Please login first`});

  const petugas = await prisma.petugas.findUnique({
    where: {
      id: req.session.userId
    },
  });

  const masyarakat = await prisma.masyarakat.findUnique({
    where: {
      nik: req.session.userId
    },
  });

  if (!petugas && !masyarakat) {
    return res.status(404).json({
      msg: `Your data not found. Maybe your not Register first. Please Register now!`,
    });
  } else if (petugas && !masyarakat) {
    req.petugasUuid = petugas.id;
    req.level = petugas.level;
  } else if (!petugas && masyarakat) {
    req.masyarakatId = masyarakat.nik;
  }

  next();
};

export {verifyUsers};
