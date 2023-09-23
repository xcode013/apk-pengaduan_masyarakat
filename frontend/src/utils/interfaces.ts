export type User = {
  name: string;
  phone: string;
  username: string;
  nik?: string;
  id?: string;
  level?: 'Admin' | 'Petugas';
};

export interface Init {
  user: User | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  massage?: string | unknown;
}

export interface ResponseStaf {
  id: number;
  pengaduanId: number;
  petugasId: string;
  tanggapan: string;
  tgl_pengaduan: string | Date;
}

export interface Report {
  nik: string;
  id: number;
  foto: string;
  isi_laporan: string;
  status: 'Dilaporkan' | 'Ditolak' | 'Diproses' | 'Selesai';
  tgl_pengaduan: string;
  url_foto: string;
  tanggapan: ResponseStaf;
  masyarakat: User;
}

// Props
export interface ValidationReportProps {
  idLaporan: number;
  statusCallPopUp: boolean;
  setterStatusCallPopUptoParent: () => void;
  idPetugasFromParent: string;
}
