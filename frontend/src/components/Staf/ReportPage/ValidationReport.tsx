import axios from 'axios';
import {BsArrowRight} from 'react-icons/bs';

import {useEffect, useState} from 'react';
import {
  Report,
  ResponseStaf,
  ValidationReportProps,
} from '../../../utils/interfaces';
import {
  getResponseStafById,
  postResponseStaf,
  updateResponseStaf,
} from '../../../api/_stafresponse';
import {getReportbyId, updateReport} from '../../../api/_reports';

function ValidationReport({
  idLaporan,
  statusCallPopUp,
  setterStatusCallPopUptoParent,
  idPetugasFromParent,
}: ValidationReportProps) {
  const [laporan, setLaporan] = useState<Report | null>();
  const [callPopUp, setCallPopUp] = useState<boolean>(false);
  const [statusLaporan, setStatusLaporan] = useState<string>('Diproses');
  const [idPetugas, setIdPetugas] = useState<string>('');
  const [tanggapan, setTanggapan] = useState<string>('');
  const [tanggapanPetugas, setTanggapanPetugas] = useState<ResponseStaf | null>(
    null
  );
  const [idTanggapanPetugas, setIdTanggapanPetugas] = useState<number>(0);

  useEffect(() => {
    setCallPopUp(statusCallPopUp);
  }, [statusCallPopUp]);

  useEffect(() => {
    if (statusCallPopUp === true) {
      getLaporanById(idLaporan);
      getTanggapanById(idTanggapanPetugas);
    }
    setIdPetugas(idPetugasFromParent);
  }, [idLaporan, statusCallPopUp, idPetugasFromParent, idTanggapanPetugas]);

  const validationHandler = async (e: {preventDefault: () => void}) => {
    e.preventDefault();

    if (laporan) {
      if (
        tanggapanPetugas === null ||
        tanggapanPetugas === undefined ||
        idTanggapanPetugas === 0
      ) {
        try {
          await postResponseStaf(laporan.id, tanggapan, idPetugas);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await updateResponseStaf(tanggapanPetugas.id, tanggapan);
        } catch (error) {
          console.log(error);
        }
      }

      try {
        await axios.patch(
          `http://localhost:5000/updatestatuspengaduan/${idLaporan}`,
          {
            status: statusLaporan,
          }
        );
        await updateReport(idLaporan, statusLaporan);
        setterStatusCallPopUptoParent();
      } catch (error) {
        console.log(error);
      }
    }

    setTanggapanPetugas(null);
    setTanggapan('');
    setIdTanggapanPetugas(0);
    setStatusLaporan('Diproses');
    setLaporan(null);
  };

  const getTanggapanById = async (id: number) => {
    try {
      const result = await getResponseStafById(id);
      setTanggapanPetugas(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getLaporanById = async (id: number) => {
    try {
      const result = await getReportbyId(id);
      setLaporan(result);
      setIdTanggapanPetugas(result.tanggapan.id);
    } catch (error) {
      console.log(`Dari Validasi Laporan. Error: ${error}`);
    }
  };

  const cancelHanlder = () => {
    setTanggapanPetugas(null);
    setTanggapan('');
    setIdTanggapanPetugas(0);
    setStatusLaporan('Diproses');
    setLaporan(null);
    setterStatusCallPopUptoParent();
  };

  return (
    <div
      className={`container w-screen z-20 fixed right-0 top-0 bottom-0 ${
        callPopUp ? 'block' : 'hidden'
      }`}>
      <div
        className={`validasi__laporan  fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 shadow-md rounded-sm bg-white p-4 w-96 flex flex-col gap-4`}>
        <header>
          <h3 className="text-center  border-b-2 border-black text-2xl font-bold">
            Validasi Laporan
          </h3>
        </header>
        <main>
          <form onSubmit={validationHandler} className="flex flex-col gap-2">
            <div className="field flex gap-1">
              <h3 className="label">Id Laporan: </h3>
              <p className="content">
                {laporan && laporan.id ? laporan.id : ''}
              </p>
            </div>
            <div className="field">
              <h3 className="label">Isi Laporan</h3>
              <p className="content p-2 shadow-inner shadow-slate-400 border border-black">
                {laporan && laporan.isi_laporan ? laporan.isi_laporan : ''}
              </p>
            </div>
            <div className="field">
              <h3 className="label">Bukti Foto</h3>
              <div className="content w-full h-40 flex justify-center items-center hadow-inner shadow-slate-400 border border-black">
                <img
                  className="h-full"
                  src={laporan && laporan.url_foto ? laporan.url_foto : ''}
                />
              </div>
            </div>
            <label htmlFor="tanggapanPetugas" className="field">
              <h4 className="label">Tanggapan Petugas</h4>
              <input
                id="tanggapanPetugas"
                value={tanggapan}
                onChange={(e) => setTanggapan(e.target.value)}
                type="text"
                className="content border border-black w-full p-2"
              />
            </label>
            <div className="field">
              <h3 className="label">Status</h3>
              <div className="wrapper flex justify-between items-center">
                <div className="current__status">
                  <h4 className="label text-sm">Current Status : </h4>
                  <p className="content">
                    {laporan && laporan.status ? laporan.status : ''}
                  </p>
                </div>
                <BsArrowRight />
                <label htmlFor="setStatus" className="new__status w-36">
                  <h4 className="label text-sm">New Status : </h4>
                  <select
                    onChange={(e) => setStatusLaporan(e.target.value)}
                    value={statusLaporan}
                    id="setStatus"
                    className="w-full border border-black">
                    <option value="Diproses">Diproses</option>
                    <option value="Ditolak">Ditolak</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </label>
              </div>
            </div>
            <footer className="flex justify-around items-center">
              <div
                className="px-6 py-1 cursor-pointer bg-red-500 text-white transition-colors hover:bg-red-600"
                onClick={cancelHanlder}>
                Cancel
              </div>
              <button
                onClick={validationHandler}
                className="px-6 py-1 bg-green-500 text-white transition-colors hover:bg-green-600">
                Validasi
              </button>
            </footer>
          </form>
        </main>
      </div>
    </div>
  );
}

export default ValidationReport;
