import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient({log: ['error', 'info', 'query', 'warn']});

export const giveResponse = async (req, res) => {
  const {pengaduanId, tanggapan} = req.body;
  const idPetugas = req.petugasUuid;

  try {
    await prisma.tanggapan.create({
      data: {
        pengaduanId: pengaduanId,
        tanggapan: tanggapan,
        petugasId: idPetugas,
      },
    });

    res.status(201).json({msg: `Report has been responded to`});
  } catch (error) {
    res.status(400).json({msg: `Failed to respond to the report`});
  }
};

export const getTanggapan = async (req, res) => {
  try {
    const response = await prisma.tanggapan.findMany();

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({msg: `Error occured: ${error}`});
  }
};

export const getTanggapanByPk = async (req, res) => {
  try {
    const response = await prisma.tanggapan.findUnique({
      where: {
        id: Number(req.params.pk),
      },
    });

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({msg: `Error occured: ${error}`});
  }
};

export const createTanggapan = async (req, res) => {
  console.log(req.body);
  try {
    await prisma.tanggapan.create({
      data: {
        pengaduanId: req.body.pengaduanId,
        tanggapan: req.body.tanggapan,
        petugasId: req.body.petugasId,
      },
    });

    res.status(201).json({msg: `Report has been responded to`});
  } catch (error) {
    res.status(400).json({msg: `Failed to respond to the report`});
  }
};

export const updateTanggapan = async (req, res) => {
  const tanggapan = await prisma.tanggapan.findUnique({
    where: {
      id: Number(req.params.pk),
    },
  });

  if (!tanggapan) return res.status(404).json({msg: `Respon not found`});
  try {
    await prisma.tanggapan.update({
      where: {
        id: tanggapan.id,
      },
      data: req.body,
    });

    res.status(200).json({msg: 'Updating response successfuly'});
  } catch (error) {
    res.status(400).json({msg: `Updating response failed. problems: ${error}`});
  }
};

export const deleteTanggapan = async (req, res) => {
  const tanggapan = await prisma.tanggapan.findUnique({
    where: {
      id: req.params.pk,
    },
  });

  if (!tanggapan) return res.status(404).json({msg: `Respon not found`});
  try {
    await prisma.tanggapan.delete({
      where: {
        id: tanggapan.id,
      },
    });

    res.status(200).json({msg: 'Deleting response successfuly'});
  } catch (error) {
    res.status(400).json({msg: `Deleting response failed. problems: ${error}`});
  }
};
