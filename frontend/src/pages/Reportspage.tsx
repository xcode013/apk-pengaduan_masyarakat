import LayoutStaff from './LayoutStaff';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../app/store';
import {Fragment, useEffect, useState} from 'react';
import {getMe} from '../features/addSlice';
import useSWR, {useSWRConfig} from 'swr';
import {Init, Report} from '../utils/interfaces';
import ValidationReport from '../components/Staf/ReportPage/ValidationReport';
import {getReports} from '../api/_reports';

function Reportspage() {
  const [idLaporan, setIdLaporan] = useState<number>(0);
  const [callPopUp, setCallPopUp] = useState<boolean>(false);
  const [idPetugas, setIdPetugas] = useState<string>('');

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const {user, isError} = useSelector<RootState, Init>((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) navigate('/login');
    if (user && !user.level) navigate('/');
    if (user && user.id) setIdPetugas(user.id);
  }, [user, navigate, isError]);

  const {mutate} = useSWRConfig();
  const {data: reports}: {data: Report[]} = useSWR('pengaduan', getReports);

  const setterCallPopUpFroomChildHandler = () => {
    setCallPopUp(false);
    mutate('pengaduan');
  };

  return (
    <LayoutStaff>
      <ValidationReport
        idLaporan={idLaporan}
        statusCallPopUp={callPopUp}
        setterStatusCallPopUptoParent={setterCallPopUpFroomChildHandler}
        idPetugasFromParent={idPetugas}
      />
      <div className="reports-page min-h-screen py-14 lg:py-0">
        <header className="p-2 border-b-4 border-emerald-700">
          <h1 className="headline text-4xl font-bold text-emerald-600">
            Reports
          </h1>
        </header>
        <main className="my-3 p-2 flex flex-col gap-4">
          {reports ? (
            <Fragment>
              <div className="table-container overflow-auto">
                <table className="min-w-full w-max ">
                  <thead>
                    <tr>
                      <td className="border border-emerald-900 px-4 py-1 text-xl font-bold text-white bg-emerald-600 text-center">
                        No
                      </td>
                      <td className="border border-emerald-900 px-4 py-1 text-xl font-bold text-white bg-emerald-600 text-center">
                        Action
                      </td>
                      <td className="border border-emerald-900 px-4 py-1 text-xl font-bold text-white bg-emerald-600 text-center">
                        Report
                      </td>
                      <td className="border border-emerald-900 px-4 py-1 text-xl font-bold text-white bg-emerald-600 text-center">
                        Image
                      </td>
                      <td className="border border-emerald-900 px-4 py-1 text-xl font-bold text-white bg-emerald-600 text-center">
                        Reported at
                      </td>
                      <td className="border border-emerald-900 px-4 py-1 text-xl font-bold text-white bg-emerald-600 text-center">
                        Reporter
                      </td>
                      <td className="border border-emerald-900 px-4 py-1 text-xl font-bold text-white bg-emerald-600 text-center">
                        Status
                      </td>
                      <td className="border border-emerald-900 px-4 py-1 text-xl font-bold text-white bg-emerald-600 text-center">
                        Response
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((data, index) => {
                      return (
                        <tr
                          className="bg-emerald-100 odd:bg-emerald-300"
                          key={index}>
                          <td className="border border-emerald-900 p-2 text-lg text-center">
                            {index + 1}
                          </td>
                          <td className="border border-emerald-900 p-2 text-lg text-center">
                            <div className="wrapper flex gap-3 justify-center">
                              <button
                                onClick={() => {
                                  setCallPopUp((prev) => !prev);
                                  setIdLaporan(data.id);
                                }}
                                className="px-6 py-1 bg-green-500 text-white transition-colors hover:bg-green-600">
                                Validasi
                              </button>
                              {user && user.level === 'Admin' ? (
                                <Link
                                  to={`/dashboard/reports/generate/${data.id}`}
                                  target="_blank"
                                  className="px-6 py-1.5 bg-slate-500 hover:bg-slate-600 text-white transition-colors">
                                  Generate
                                </Link>
                              ) : (
                                ''
                              )}
                            </div>
                          </td>
                          <td className="border border-emerald-900 p-2 text-lg text-center">
                            {data.isi_laporan}
                          </td>
                          <td className=" border border-emerald-900 p-2 text-lg text-center">
                            <img
                              className="max-h-20 mx-auto"
                              src={data.url_foto}
                              alt="foto bukti"
                            />
                          </td>
                          <td className="border border-emerald-900 p-2 text-lg text-center">
                            {data.tgl_pengaduan}
                          </td>
                          <td className="border border-emerald-900 p-2 text-lg text-center">
                            {data.nik}
                          </td>
                          <td className="border border-emerald-900 p-2 text-lg text-center">
                            {data.status}
                          </td>
                          <td className="border border-emerald-900 p-2 text-lg text-center ">
                            {data && data.tanggapan
                              ? data.tanggapan.tanggapan
                              : '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Fragment>
          ) : (
            <div>Loading</div>
          )}
        </main>
      </div>
    </LayoutStaff>
  );
}

export default Reportspage;
