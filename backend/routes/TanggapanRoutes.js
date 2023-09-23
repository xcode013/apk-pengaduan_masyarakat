import express from 'express';
import {
  getTanggapan,
  getTanggapanByPk,
  createTanggapan,
  updateTanggapan,
  deleteTanggapan,
  giveResponse,
} from '../controllers/Tanggapan.js';
import {verifyUsers, petugasOnly} from '../middleware/index.js';

const route = express.Router();

route.post('/giveresponse', verifyUsers, petugasOnly, giveResponse);

route.get('/tanggapan', verifyUsers, getTanggapan);
route.get('/tanggapan/:pk', verifyUsers, getTanggapanByPk);
route.post('/tanggapan', verifyUsers, createTanggapan);
route.patch('/tanggapan/:pk', verifyUsers, updateTanggapan);
route.delete('/tanggapan/:pk', verifyUsers, deleteTanggapan);

export default route;
