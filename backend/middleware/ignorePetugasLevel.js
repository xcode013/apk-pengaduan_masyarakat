import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const ignorePetugasLevel = async (req, res, next) => {
  const petugas = await prisma.petugas.findUnique({
    where: {
      OR: [{id: req.session.userId}, {username: req.session.userId}],
    },
  });

  if (petugas.level === 'Petugas')
    return res.status(403).json({
      msg: `Access denied. Just admin only which can access this feature`,
    });

  next();
};

export {ignorePetugasLevel};
