// import React from 'react';
import {HiMenu, HiX} from 'react-icons/hi';
import logo from '../../../assets/react.svg';
import {NavLink, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {AppDispatch, RootState} from '../../../app/store';
import {useDispatch, useSelector} from 'react-redux';
import {getMe, logout, reset} from '../../../features/addSlice';
import {Init} from '../../../utils/interfaces';

function NavbarStaff() {
  const [sidebar, setSidebar] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const {user, isLoading} = useSelector<RootState, Init>((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch, navigate]);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(reset());
    if (!isLoading) navigate('/');
  };

  return (
    <nav
      id="navigation-staf"
      className="navigation fixed z-50 w-full bg-emerald-600 h-14 lg:w-64 lg:top-0 lg:bottom-0 lg:h-screen">
      {/* Topbar */}
      <div className="topbar flex justify-between items-center h-full px-10 md:hidden">
        <div className="logo-container h-full w-14 flex justify-center items-center">
          <img src={logo} alt="" className="logo" />
        </div>
        <button
          onClick={() => setSidebar((prev) => !prev)}
          className="sidebar-open h-full w-14 flex justify-center items-center text-2xl text-white">
          <HiMenu />
        </button>
      </div>
      {/* Topbar End */}

      {/* Sidebar */}
      <div
        className={`sidebar fixed bg-emerald-600 top-0 bottom-0 w-64  ${
          sidebar ? 'right-0' : '-right-64'
        } transition-all duration-300 md:static md:flex md:justify-around md:items-center md:w-full lg:flex-col`}>
        <header className="h-14 flex justify-end pr-10 lg:w-full lg:p-4 lg:h-40">
          <div className="logo-container hidden md:flex h-full w-14 justify-center items-center lg:border lg:w-full lg:bg-emerald-900">
            <img
              src={logo}
              alt=""
              className="logo lg:h-full lg:p-7 lg:animate-spin"
            />
          </div>

          <button
            onClick={() => setSidebar((prev) => !prev)}
            className="sidebar-close h-full w-14 flex justify-center items-center text-2xl text-white md:hidden">
            <HiX />
          </button>
        </header>
        <main className="flex flex-col gap-1 text-white md:flex-row md:gap-2 lg:gap-0 lg:flex-col lg:w-full">
          <NavLink
            className={
              'px-8 py-2 w-full flex justify-end hover:bg-emerald-200 transition hover:text-black md:px-4 md:hover:bg-transparent md:hover:text-white md:border-b-2 md:border-transparent md:py-1 md:hover:border-emerald-400 lg:justify-start lg:hover:bg-emerald-200 lg:border-none lg:transition-all lg:hover:text-black lg:py-3 '
            }
            to={'/dashboard'}
            end>
            Dashboard
          </NavLink>
          {user && user.level === 'Admin' ? (
            <NavLink
              className={
                'px-8 py-2 w-full flex justify-end hover:bg-emerald-200 transition hover:text-black md:px-4 md:hover:bg-transparent md:hover:text-white md:border-b-2 md:border-transparent md:py-1 md:hover:border-emerald-400 lg:justify-start lg:hover:bg-emerald-200 lg:border-none lg:transition-all lg:hover:text-black lg:py-3 '
              }
              to="/dashboard/staf">
              Staf
            </NavLink>
          ) : (
            ''
          )}

          <NavLink
            className={
              'px-8 py-2 w-full flex justify-end hover:bg-emerald-200 transition hover:text-black md:px-4 md:hover:bg-transparent md:hover:text-white md:border-b-2 md:border-transparent md:py-1 md:hover:border-emerald-400 lg:justify-start lg:hover:bg-emerald-200 lg:border-none lg:transition-all lg:hover:text-black lg:py-3 '
            }
            to="/dashboard/reports">
            Reports
          </NavLink>
        </main>
        <footer className="lg:w-full lg:absolute lg:bottom-0 lg:p-4">
          <button
            onClick={() => {
              logoutHandler();
              navigate('/');
            }}
            className=" text-white hover:text-black px-8 py-2 w-full border-t-2 border-b-2 border-emerald-800 flex justify-end hover:bg-emerald-200 transition md:border md:px-4 md:py-1 md:bg-emerald-200 md:hover:bg-emerald-300 md:text-black md:hover:text-white lg:justify-center">
            {isLoading ? 'Loading' : 'Logout'}
          </button>
        </footer>
      </div>
      {/* Sidebar End */}
    </nav>
  );
}

export default NavbarStaff;
