import {Fragment, useEffect, useState} from 'react';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import {BsArrowBarRight} from 'react-icons/bs';
import {Link, useNavigate} from 'react-router-dom';
import Layout from './Layout';

// For Backend connect
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../app/store';
import {loginUser, reset} from '../features/addSlice';
import {Init} from '../utils/interfaces';

function Loginpage() {
  const [showpass, setShowPass] = useState(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // For Backend connect
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const {user, isError, isSuccess, isLoading, massage} = useSelector<
    RootState,
    Init
  >((state) => state.auth);

  useEffect(() => {
    if (user && user.level && isSuccess) navigate('/dashboard');
    else if (user && !user.level && isSuccess) navigate('/');
    dispatch(reset());
  }, [dispatch, isSuccess, user, navigate]);

  const goLogin = (e: {preventDefault: () => void}) => {
    e.preventDefault();
    dispatch(loginUser({email, password}));
  };

  return (
    <Layout>
      <div className="login-page h-screen relative">
        <div className="background-decors absolute top-0 left-0 bottom-0 right-0 -z-10 overflow-hidden">
          <div className="decor w-screen h-96 bg-emerald-600 -skew-y-6 absolute -bottom-32"></div>
          <div className="decor w-screen h-96 bg-emerald-500 skew-y-12 absolute -bottom-40"></div>
          <div className="decor w-screen h-96 bg-emerald-400 -skew-y-6 absolute -bottom-40"></div>
        </div>
        <div className="form-container h-screen w-full flex justify-center items-center">
          <div className="content w-96 backdrop-blur bg-white/30 shadow-md p-4 flex flex-col gap-16 border border-emerald-800 rounded-md">
            <header>
              <h1 className="wellcome text-3xl font-bold tracking-wider uppercase w-fit px-5 mx-auto border-b-4 border-emerald-500">
                Wellcome!
              </h1>
            </header>
            <main>
              <form className="form-input flex flex-col" onSubmit={goLogin}>
                {isError ? <p className="text-red-600">{massage}</p> : ''}
                <label htmlFor="field-username" className="field w-full">
                  <span className="label after:content-['*'] after:text-red-600 after:m-0.5 ml-5">
                    Username or Email
                  </span>
                  <input
                    type="email"
                    className="input bg-emerald-100 px-4 py-1 rounded-full w-full focus:outline-none focus:ring-1 focus:ring-emerald-700 border border-emerald-600 invalid:border-red-500 invalid:bg-red-100 invalid:focus:ring-red-700 invalid:text-red-700"
                    id="field-username"
                    autoComplete="/"
                    autoCorrect="/"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label htmlFor="field-password" className="field w-full">
                  <span className="label after:content-['*'] after:text-red-600 after:m-0.5 ml-5">
                    Password
                  </span>
                  <div className="input w-full relative">
                    <input
                      type={showpass ? 'text' : 'password'}
                      className="input peer bg-emerald-100 px-4 py-1 rounded-full w-full focus:outline-none focus:ring-1 focus:ring-emerald-700 border border-emerald-600  invalid:border-red-500 invalid:bg-red-100 invalid:focus:ring-red-700"
                      id="field-password"
                      required
                      value={password}
                      autoComplete="/"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label
                      htmlFor="show-pass"
                      className="showpass absolute border">
                      <input
                        type="checkbox"
                        className="hidden"
                        onChange={() => setShowPass((prev) => !prev)}
                        id="show-pass"
                      />
                      <div className="label rounded-e-full rounded-ee-full absolute right-0 h-8 w-8 bg-emerald-700 text-emerald-100 flex justify-center items-center">
                        {showpass ? <FaEye /> : <FaEyeSlash />}
                      </div>
                    </label>
                  </div>
                </label>
                <div className="footer mt-4">
                  <button className="button bg-emerald-200 px-6 py-2 w-full flex justify-center items-center gap-2 border border-emerald-800 text-emerald-800 text-xl hover:bg-emerald-700 hover:text-emerald-50 transition-colors">
                    {isLoading ? (
                      'Loading...'
                    ) : (
                      <Fragment>
                        Login <BsArrowBarRight />
                      </Fragment>
                    )}
                  </button>
                </div>
              </form>
              <p className="w-full flex justify-center items-center">
                <span className="line h-1 w-28 block bg-emerald-800 mx-2"></span>
                Or
                <span className="line h-1 w-28 block bg-emerald-800 mx-2"></span>
              </p>
            </main>
            <footer>
              <p className="text-center">
                No there's account ?{' '}
                <Link
                  to={'/register'}
                  className="bg-emerald-800 text-emerald-50 px-2 hover:underline">
                  Create New Account
                </Link>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Loginpage;
