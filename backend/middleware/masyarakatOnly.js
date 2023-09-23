import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const masyarakatOnly = async (req, res, next) => {
  if (!req.masyarakatId)
    return res.status(403).json({
      msg: `Access denied. Just Masyarakats only which can access this feature`,
    });

  const masyarakat = await prisma.masyarakat.findUnique({
    where: {
      nik: req.masyarakatId,
    },
  });

  if (!masyarakat)
    return res.status(404).json({
      msg: `Access denied. Masyarakat not found`,
    });

  next();
};

export {masyarakatOnly};
