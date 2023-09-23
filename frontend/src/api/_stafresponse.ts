import axios from 'axios';

// Tanggapan

export const getResponseStafById = async (id: number) => {
  const response = await axios.get(`http://localhost:5000/tanggapan/${id}`);
  return response.data;
};

export const postResponseStaf = async (
  reportId: number,
  responseStaf: string,
  stafId: string
) => {
  await axios.post('http://localhost:5000/tanggapan', {
    pengaduanId: reportId,
    tanggapan: responseStaf,
    petugasId: stafId,
  });
};

export const updateResponseStaf = async (id: number, responseStaf: string) => {
  await axios.patch(`http://localhost:5000/tanggapan/${id}`, {
    tanggapan: responseStaf,
  });
};
