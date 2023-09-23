import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const petugasOnly = async (req, res, next) => {
  if (!req.petugasUuid)
    return res.status(403).json({
      msg: `Access denied. Just Petugas only which can access this feature`,
    });

  const petugas = await prisma.petugas.findUnique({
    where: {
      id: req.petugasUuid,
    },
  });

  if (!petugas)
    return res.status(404).json({
      msg: `Access denied. Petugas not found`,
    });

  next();
};

export {petugasOnly};
