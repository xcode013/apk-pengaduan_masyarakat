import express from 'express';
import {
  Login,
  Logout,
  Me,
  RegisterAsMasyarakat,
  RegisterAsPetugas,
} from '../controllers/Auth.js';
import {ignorePetugasLevel} from '../middleware/index.js';

const route = express.Router();

route.post('/registerasmasyarakat', RegisterAsMasyarakat);
route.post('/registeraspetugas', RegisterAsPetugas);
route.post('/login', Login);
route.get('/me', Me);
route.delete('/logout', Logout);

export default route;
