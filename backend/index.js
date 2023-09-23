import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import MasyarakatRoutes from './routes/MasyarakatRoutes.js';
import PengaduanRoutes from './routes/PengaduanRoutes.js';
import PetugasRoutes from './routes/PetugasRoutes.js';
import TanggapanRoutes from './routes/TanggapanRoutes.js';
import AuthRoutes from './routes/AuthRoutes.js';
import session from 'express-session';
import {PrismaSessionStore} from '@quixo3/prisma-session-store';
import {PrismaClient} from '@prisma/client';
import multer from 'multer';

dotenv.config();

const app = express();
const store = new PrismaSessionStore(new PrismaClient(), {
  dbRecordIdIsSessionId: true,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: 'auto',
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3001',
  })
);
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));
app.use(MasyarakatRoutes);
app.use(PetugasRoutes);
app.use(PengaduanRoutes);
app.use(TanggapanRoutes);
app.use(AuthRoutes);

app.listen(process.env.APP_PORT, () => {
  console.log('Server has running now...');
});
