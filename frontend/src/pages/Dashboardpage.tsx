// import React from 'react';
import LayoutStaff from './LayoutStaff';
import {BsPeople} from 'react-icons/bs';

import {useEffect} from 'react';
import {AppDispatch, RootState} from '../app/store';
import {useDispatch, useSelector} from 'react-redux';
import {getMe} from '../features/addSlice';
import {useNavigate} from 'react-router-dom';
import {Init} from '../utils/interfaces';
import Card from '../components/Staf/Dashboard/Card';

function Dashboardpage() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const {user, isError} = useSelector<RootState, Init>((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) navigate('/login');
    if (user && !user.level) navigate('/');
  }, [user, isError, navigate]);
  return (
    <LayoutStaff>
      <div className="dashboard-page min-h-screen py-14 lg:p-0">
        <header className="p-2 border-b-4 border-emerald-700">
          <h1 className="headline text-4xl font-bold text-emerald-600">
            Dashboard
          </h1>
          <h3 className="subline text-xl text-slate-600">
            Welcome{' '}
            <span className="text-slate-900 font-semibold">
              {user && user.name ? user.name : ''}
            </span>
            !
          </h3>
        </header>
        <main className="p-4">
          <div className="cards-wrapper flex flex-wrap justify-evenly gap-4 md:max-w-3xl md:mx-auto">
            <Card
              title="Masyarakat"
              icon={<BsPeople />}
              content={0}
              bgColor="bg-green-400"
            />
            <Card
              title="Laporan"
              icon={<BsPeople />}
              content={13}
              bgColor="bg-teal-400"
            />
            <Card
              title="Laporan di Tolak"
              icon={<BsPeople />}
              content={13}
              bgColor="bg-pink-400"
            />
            <Card
              title="Laporan di Proses"
              icon={<BsPeople />}
              content={13}
              bgColor="bg-indigo-400"
            />
            <Card
              title="Laporan Selesai"
              icon={<BsPeople />}
              content={13}
              bgColor="bg-lime-400"
            />
            <Card
              title="Laporan di Tanggapi"
              icon={<BsPeople />}
              content={13}
              bgColor="bg-red-400"
            />
          </div>
        </main>
      </div>
    </LayoutStaff>
  );
}

export default Dashboardpage;
