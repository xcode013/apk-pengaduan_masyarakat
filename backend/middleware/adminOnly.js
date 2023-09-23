import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const adminOnly = async (req, res, next) => {
  const petugas = await prisma.petugas.findUnique({
    where: {
      OR: [{id: req.session.userId}, {username: req.session.userId}],
    },
  });

  if (!petugas || petugas.level !== 'Admin')
    return res.status(403).json({
      msg: `Access denied. Just admin only which can access this feature`,
    });

  next();
};

export {adminOnly};
