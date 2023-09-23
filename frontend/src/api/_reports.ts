import axios from 'axios';

// Pengaduan

export const getReportsByStatusClear = async () => {
  const response = await axios.get(
    'http://localhost:5000/pengaduanbystatusclear'
  );
  return response.data;
};

export const getReports = async () => {
  const response = await axios.get('http://localhost:5000/pengaduan');
  return response.data;
};

export const getReportbyId = async (id: number) => {
  const response = await axios.get(`http://localhost:5000/pengaduan/${id}`);
  return response.data;
};

export const postReport = async (data: FormData) => {
  await axios.post(`http://localhost:5000/writepengaduan`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateReport = async (id: number, reportStatus: string) => {
  if (
    reportStatus === 'Dilaporkan' ||
    reportStatus === 'Ditolak' ||
    reportStatus === 'Diproses' ||
    reportStatus === 'Selesai'
  ) {
    await axios.patch(`http://localhost:5000/updatestatuspengaduan/${id}`, {
      status: reportStatus,
    });
  }
};
