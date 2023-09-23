import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {AppDispatch, RootState} from '../app/store';
import {Init, Report} from '../utils/interfaces';
import React, {useEffect} from 'react';
import {getMe} from '../features/addSlice';
import {getReportbyId} from '../api/_reports';

function GenerateReportpage() {
  const [report, setReport] = React.useState<Report | null>();

  const {key} = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const {isError, user} = useSelector<RootState, Init>((state) => state.auth);

  React.useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  React.useEffect(() => {
    if (isError) navigate('/login');
    if (user && !user.level) navigate('/');
  }, [user, navigate, isError]);

  React.useEffect(() => {
    getReport(Number(key));
  }, [key]);

  async function getReport(id: number) {
    try {
      const result = await getReportbyId(id);
      setReport(result);
    } catch (error) {
      console.log(`Dari Validasi Laporan. Error: ${error}`);
    }
  }

  useEffect(() => {
    if (report) {
      window.print();
    }
  }, [report]);

  return (
    <div className="generate__report-page">
      {report !== null ? (
        <React.Fragment>
          <div className="main__container w-full px-8">
            <header className="border-b-2 border-black text-center">
              <h1 className="text-xl font-bold my-2">
                Surat Laporan Pengaduan Masyarakat <br /> Tahun 2023/2024 <br />
              </h1>
            </header>
            <main className="p-4 flex flex-col gap-4">
              <header className="flex justify-between">
                <div className="left-side">
                  Kepada Yth, <br /> HRD PT. Antam Tb. Unit Geomit <br /> Di
                  tempat
                </div>
                <div className="right-side">Songodali, 24 Juni 2023</div>
              </header>
              <main>
                <header className="flex flex-col gap-4">
                  <div className="opening__sentence">
                    <div className="indent-4"> Dengan hormat</div>
                    <div className="indent-4">
                      saya yang bertanda tangan dibawah ini :
                    </div>
                  </div>
                  <div className="biodata w-3/4 m-auto ">
                    <table>
                      <tr>
                        <td>Nama</td>
                        <td>:</td>
                        <td>
                          {report && report.masyarakat
                            ? report.masyarakat.name
                            : ''}
                        </td>
                      </tr>
                      <tr>
                        <td>NIK</td>
                        <td>:</td>
                        <td>
                          {report && report.masyarakat
                            ? report.masyarakat.nik
                            : ''}
                        </td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>:</td>
                        <td>
                          {report && report.masyarakat
                            ? report.masyarakat.username
                            : ''}
                        </td>
                      </tr>
                      <tr>
                        <td>No Telp</td>
                        <td>:</td>
                        <td>
                          {report && report.masyarakat
                            ? report.masyarakat.phone
                            : ''}
                        </td>
                      </tr>
                    </table>
                  </div>
                </header>
                <main className="flex flex-col gap-4">
                  <div className="content indent-4">
                    Dengan ini saya melaporkan terkait permasalahan berikut:
                  </div>
                  <div className="report indent-4 w-3/4 m-auto bg-gray-200 p-2">
                    {report && report.isi_laporan ? report.isi_laporan : ''}
                  </div>
                  <div className="ending indent-4">
                    Sekian atas perhatiannya saya ucapkan terima kasih.
                  </div>
                </main>
              </main>
            </main>
            <footer className="flex items-end flex-col">
              <div className="content text-center mr-4">
                <header>Hormat saya</header>
                <main className="h-14"></main>
                <footer>
                  {report && report.masyarakat ? report.masyarakat.name : ''}
                </footer>
              </div>
            </footer>
          </div>
        </React.Fragment>
      ) : (
        ''
      )}
    </div>
  );
}

export default GenerateReportpage;
