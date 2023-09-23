import Layout from './Layout';
import {BsArrowBarRight} from 'react-icons/bs';

import {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../app/store';
import {getMe} from '../features/addSlice';
import useSWR, {useSWRConfig} from 'swr';
import {Init, Report} from '../utils/interfaces';
import {getReports, getReportsByStatusClear, postReport} from '../api/_reports';

function Homepage() {
  const [report, setReport] = useState<string>('');
  const [image, setImage] = useState('');
  const [previwe, setPreview] = useState('');
  const [reporter, setReporter] = useState<string>('');

  const [reportClears, setReportClears] = useState<Report[] | null>();

  // For bacend connection
  const dispatch: AppDispatch = useDispatch();
  const {user} = useSelector<RootState, Init>((state) => state.auth);

  useEffect(() => {
    getReportsByStatusClear().then((result) => setReportClears(result));
  }, []);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const {nik} = user;
      if (nik !== undefined) setReporter(nik);
    }
  }, [user]);

  const createReport = async (e: {preventDefault: () => void}) => {
    e.preventDefault();

    if (!user || user.level) {
      alert('Akses terlarang boss');
      return;
    }

    const formdata = new FormData();
    formdata.append('nik', reporter);
    formdata.append('laporan', report);
    formdata.append('file', image);

    try {
      await postReport(formdata);
      mutate('pengaduan');
      setReport('');
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loadImg = (e: {target: any}) => {
    const img = e.target.files[0];
    setImage(img);
    setPreview(URL.createObjectURL(img));
  };

  // Get data reports
  const {mutate} = useSWRConfig();
  const {data: dataReports}: {data: Report[]} = useSWR('pengaduan', getReports);

  return (
    <Layout>
      <UpdateLaporan />
      <div className="home-page">
        <section
          id="landing"
          className="landing-section h-screen flex flex-col">
          <div className="wellcome p-4 bg-gradient-to-b from-emerald-950 to-emerald-600 h-[60vh] text-white flex justify-center items-center flex-1 flex-col gap-4">
            <h1 className="headline text-emerald-100 text-3xl font-bold">
              Pengaduan Masyarakat
            </h1>
            <p className="subline text-center text-neutral-300 md:w-2/3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <a href="#createreport">
              <button className="bg-emerald-400 px-4 py-1 rounded-2xl text-black flex gap-2 justify-center items-center transition-all hover:bg-emerald-500">
                Report <BsArrowBarRight />
              </button>
            </a>
          </div>
          <div className="about__us h-fit p-4 box-border bg-emerald-300">
            <h3 className="title font-bold text-xl pl-2 border-l-4 border-emerald-900 mb-2">
              About Us
            </h3>
            <p className="article text-base text-justify">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </section>

        <section className="reports p-4 py-7 scroll-m-14" id="reportsclear">
          <h3 className="title font-bold text-xl pl-2 border-l-4 border-emerald-900 mb-2">
            Reports Clear
          </h3>
          <div className="overflow-scroll lg:w-full">
            <table className="table w-max lg:w-full">
              <thead className="table-head bg-emerald-600 text-white">
                <tr>
                  <td className="p-2 border border-emerald-800 w-max text-center">
                    No
                  </td>
                  <td className="p-2 border border-emerald-800 w-72 text-center">
                    Report
                  </td>
                  <td className="p-2 border border-emerald-800 w-max text-center">
                    Photo
                  </td>
                  <td className="p-2 border border-emerald-800 w-max text-center">
                    Reported at
                  </td>
                  <td className="p-2 border border-emerald-800 w-max text-center">
                    Reporter
                  </td>
                  <td className="p-2 border border-emerald-800 w-max text-center">
                    Status
                  </td>
                  <td className="p-2 border border-emerald-800 w-72 text-center">
                    Response
                  </td>
                </tr>
              </thead>
              <tbody className="table-body">
                {reportClears
                  ? reportClears.map((data, index) => {
                      return (
                        <tr
                          className="odd:bg-emerald-300 even:bg-emerald-100"
                          key={index}>
                          <td className="p-2 border border-emerald-800">
                            {index + 1}
                          </td>
                          <td className="p-2 border border-emerald-800">
                            {data.isi_laporan}
                          </td>
                          <td className="p-2 border border-emerald-800">
                            <img
                              className="max-h-20 mx-auto"
                              src={data.url_foto}
                              alt={data.foto}
                            />
                          </td>
                          <td className="p-2 border border-emerald-800">
                            {data.tgl_pengaduan}
                          </td>
                          <td className="p-2 border border-emerald-800">
                            {data.nik}
                          </td>
                          <td className="p-2 border border-emerald-800">
                            {data.status}
                          </td>
                          <td className="p-2 border border-emerald-800">
                            {data && data.tanggapan
                              ? data.tanggapan.tanggapan
                              : '-'}
                          </td>
                        </tr>
                      );
                    })
                  : ''}
              </tbody>
              <tbody></tbody>
            </table>
          </div>
        </section>

        {user ? (
          <Fragment>
            <section
              id="createreport"
              className="create__report p-4 py-7 bg-emerald-300 scroll-m-14">
              <h3 className="title font-bold text-xl pl-2 border-l-4 border-emerald-900 mb-2">
                Create Report as{' '}
                <span className="text-emerald-900">
                  {user && user.name ? user.name : ''}
                </span>
              </h3>
              <form
                onSubmit={createReport}
                className="form-create__report flex flex-col gap-3">
                <div className="field flex flex-col gap-1 ">
                  <label htmlFor="reportUser" className="label-field">
                    Report
                  </label>
                  <textarea
                    id="reportUser"
                    placeholder="Enter your Report here"
                    className="input-field outline-none border-2 border-emerald-800 p-2"
                    value={report}
                    onChange={(e) => setReport(e.target.value)}></textarea>
                </div>
                <div className="field flex gap-1">
                  <label htmlFor="photoEvidence" className="label-field">
                    Label
                  </label>
                  <input
                    type="file"
                    id="photoEvidence"
                    className="input-field"
                    onChange={loadImg}
                  />
                </div>
                <div className="field">
                  <div className="photo-preview w-full h-44 bg-emerald-100 flex justify-center items-center">
                    <img src={previwe} alt="" className="photo h-44" />
                  </div>
                </div>
                <div className="field flex justify-end">
                  <button className="bg-emerald-100 text-lg capitalize transition-all border border-emerald-900 hover:bg-emerald-400 text-black px-4 py-1 flex gap-2 justify-center items-center">
                    send report <BsArrowBarRight />
                  </button>
                </div>
              </form>
            </section>

            <section
              id="myreport"
              className="my__reports px-4 py-7 scroll-m-14">
              <h3 className="title font-bold text-xl pl-2 border-l-4 border-emerald-900 mb-2">
                My Reports
              </h3>
              {user && dataReports ? (
                <div className="overflow-scroll lg:w-full">
                  <table className="table w-max lg:w-full">
                    <thead className="table-head bg-emerald-600 text-white">
                      <tr>
                        <td className="p-2 border border-emerald-800 w-max text-center">
                          No
                        </td>
                        <td className="p-2 border border-emerald-800 w-72 text-center">
                          Report
                        </td>
                        <td className="p-2 border border-emerald-800 w-max text-center">
                          Photo
                        </td>
                        <td className="p-2 border border-emerald-800 w-max text-center">
                          Reported at
                        </td>
                        <td className="p-2 border border-emerald-800 w-max text-center">
                          Reporter
                        </td>
                        <td className="p-2 border border-emerald-800 w-max text-center">
                          Status
                        </td>
                        <td className="p-2 border border-emerald-800 w-72 text-center">
                          Response
                        </td>
                      </tr>
                    </thead>
                    <tbody className="table-body">
                      {dataReports.map((data, index) => {
                        return (
                          <tr
                            className="odd:bg-emerald-300 even:bg-emerald-100"
                            key={index}>
                            <td className="p-2 border border-emerald-800">
                              {index + 1}
                            </td>
                            <td className="p-2 border border-emerald-800">
                              {data.isi_laporan}
                            </td>
                            <td className="p-2 border border-emerald-800">
                              <img
                                className="max-h-20 mx-auto"
                                src={data.url_foto}
                                alt={data.foto}
                              />
                            </td>
                            <td className="p-2 border border-emerald-800">
                              {data.tgl_pengaduan}
                            </td>
                            <td className="p-2 border border-emerald-800">
                              {data.nik}
                            </td>
                            <td className="p-2 border border-emerald-800">
                              {data.status}
                            </td>
                            <td className="p-2 border border-emerald-800">
                              {data && data.tanggapan
                                ? data.tanggapan.tanggapan
                                : '-'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tbody></tbody>
                  </table>
                </div>
              ) : (
                'No Data'
              )}
            </section>
          </Fragment>
        ) : (
          ''
        )}
      </div>
    </Layout>
  );
}

export default Homepage;

const UpdateLaporan = () => {
  return <div className="container"></div>;
};
