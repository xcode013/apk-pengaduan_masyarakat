import express from 'express';
import {
  getPengaduan,
  getPengaduanByPk,
  createPengaduan,
  updatePengaduan,
  deletePengaduan,
  writePengaduan,
  verifyPengaduan,
  getPengaduanByStatusClear,
} from '../controllers/Pengaduan.js';
import {masyarakatOnly, petugasOnly, verifyUsers} from '../middleware/index.js';

const route = express.Router();

route.post('/writepengaduan', verifyUsers, masyarakatOnly, writePengaduan);
route.patch(
  '/updatestatuspengaduan/:pk',
  verifyUsers,
  petugasOnly,
  verifyPengaduan
);
route.get('/pengaduanbystatusclear', getPengaduanByStatusClear);
route.get('/pengaduan', verifyUsers, getPengaduan);
route.get('/pengaduan/:pk', verifyUsers, getPengaduanByPk);
route.post('/pengaduan', createPengaduan);
route.patch('/pengaduan/:pk', verifyUsers, petugasOnly, updatePengaduan);
route.delete('/pengaduan/:pk', verifyUsers, deletePengaduan);

export default route;
