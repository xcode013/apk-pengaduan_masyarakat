import express from 'express';
import {
  getPetugas,
  getPetugasByPk,
  addPetugas,
  updatePetugas,
  deletePetugas,
} from '../controllers/Petugas.js';
import {verifyUsers} from '../middleware/index.js';

const route = express.Router();

route.get('/petugas', verifyUsers, getPetugas);
route.get('/petugas/:pk', verifyUsers, getPetugasByPk);
route.post('/petugas', verifyUsers, addPetugas);
route.patch('/petugas/:pk', verifyUsers, updatePetugas);
route.delete('/petugas/:pk', verifyUsers, deletePetugas);

export default route;
