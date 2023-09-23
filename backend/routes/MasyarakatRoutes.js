import express from 'express';
import {
  getMasyarakat,
  getMasyarakatByPk,
  addMasyarakat,
  updateMasyarakat,
  deleteMasyarakat,
} from '../controllers/Masyarakat.js';
import {verifyUsers} from '../middleware/index.js';

const route = express.Router();

route.get('/masyarakat', verifyUsers, getMasyarakat);
route.get('/masyarakat/:pk', verifyUsers, getMasyarakatByPk);
route.post('/masyarakat', verifyUsers, addMasyarakat);
// route.post('/masyarakat', addMasyarakat);
route.patch('/masyarakat/:pk', verifyUsers, updateMasyarakat);
route.delete('/masyarakat/:pk', verifyUsers, deleteMasyarakat);

export default route;
