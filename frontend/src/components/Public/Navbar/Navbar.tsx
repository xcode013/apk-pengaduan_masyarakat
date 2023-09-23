import {Link, useNavigate} from 'react-router-dom';
import logo from '../../../assets/react.svg';
import {Fragment, useEffect, useState} from 'react';
import {BsX, BsMenuButton} from 'react-icons/bs';
import {AppDispatch, RootState} from '../../../app/store';
import {useDispatch, useSelector} from 'react-redux';
import {getMe, logout, reset} from '../../../features/addSlice';
import {Init} from '../../../utils/interfaces';
function Navbar() {
  const [sidebarShow, setSidebarShow] = useState(false);

  // For backend connection
  const dispatch: AppDispatch = useDispatch();
  const {user} = useSelector<RootState, Init>((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch, navigate]);

  const toLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };
  return (
    <div
      className={
        'fixed z-50 flex justify-between box-border px-10 py-1 items-center w-screen bg-emerald-600 h-13'
      }>
      <section className="logo lg:w-72">
        <a href="#landing">
          <img src={logo} alt="" className="logo-img" />
        </a>
      </section>
      <button
        onClick={() => setSidebarShow((prev) => !prev)}
        className="text-white text-lg p-3 border border-transparent hover:border-white transition lg:hidden">
        <BsMenuButton />
      </button>
      <div
        className={`links fixed top-0 bottom-0 w-96 ${
          sidebarShow ? 'right-0' : '-right-96'
        } bg-emerald-600 flex flex-col items-end gap-1 transition-all duration-300 lg:static lg:flex-row lg:items-center lg:w-fit lg:gap-32 xl:gap-64`}>
        <button
          onClick={() => setSidebarShow((prev) => !prev)}
          className="text-white border border-transparent hover:border-white transition-all p-3 mr-10 w-fit text-2xl lg:hidden">
          <BsX />
        </button>
        <section className="main-links flex flex-col gap-1 text-right w-full lg:flex-row">
          <Link
            className="link text-white px-4 py-2 hover:text-black transition hover:bg-emerald-300 w-full lg:w-fit"
            to="/">
            Home
          </Link>
          <a
            className="link text-white px-4 py-2 hover:text-black transition hover:bg-emerald-300 w-full lg:w-fit"
            href="#reportsclear">
            Reports
          </a>
          {user ? (
            <Fragment>
              <a
                className="link text-white px-4 py-2 hover:text-black transition hover:bg-emerald-300 w-full lg:w-fit"
                href="#createreport">
                Create Report
              </a>
              <a
                className="link text-white px-4 py-2 hover:text-black transition hover:bg-emerald-300 w-full lg:w-fit"
                href="#myreport">
                My Report
              </a>
            </Fragment>
          ) : (
            ''
          )}
        </section>
        <section className="side-links flex h-full justify-center items-center gap-3 px-4 py-2">
          {user ? (
            <Fragment>
              <h3 className="border-r border-white pr-3 text-white text-xl">
                {user && user.name ? user.name : ''}
              </h3>
              <button
                onClick={toLogout}
                className="link bg-emerald-50 border border-white hover:bg-transparent hover:text-white transition-all-white px-4 py-1 rounded-2xl">
                Logout
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <Link
                className="link bg-emerald-50 border border-white hover:bg-transparent hover:text-white transition-all-white px-4 py-1 rounded-2xl"
                to="/register">
                Register
              </Link>
              <Link
                className="link border hover:text-black hover:bg-white transition-all text-white border-emerald-50 px-4 py-1 rounded-2xl"
                to="/login">
                Login
              </Link>
            </Fragment>
          )}
        </section>
      </div>
    </div>
  );
}

export default Navbar;
