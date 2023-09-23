import {Link, useNavigate} from 'react-router-dom';
import Layout from './Layout';
import {useState} from 'react';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import {BsArrowBarRight} from 'react-icons/bs';
import axios from 'axios';

function Registerpage() {
  const [showpass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const [nik, setNik] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confpassword, setConfpassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');

  const registrasiHandler = async (e: {preventDefault: () => void}) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:5000/registerasmasyarakat`, {
        nik: nik,
        name: name,
        username: email,
        password: password,
        confirmPass: confpassword,
        phone: phonenumber,
      });

      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="register-page container py-14 relative flex justify-center items-center">
        <div className="bg-decors absolute -z-10 top-0 left-0 bottom-0 right-0 ">
          <div className="decor absolute h-36 w-36 bg-emerald-300 rounded-full bottom-20 left-1/2 -translate-x-1/2"></div>
          <div className="decor absolute bg-emerald-700 w-full h-36 bottom-4 -skew-y-12 "></div>
          <div className="decor absolute bg-emerald-500 w-full h-36 bottom-4 skew-y-12 "></div>
          <div className="decor absolute bg-emerald-300 w-full h-32 bottom-0"></div>
        </div>

        <div className="content max-w-sm flex flex-col justify-center gap-6 bg-slate-300/25 backdrop-blur border rounded-md border-emerald-800 shadow-md p-4">
          <header className="flex items-center flex-col">
            <h1 className="headline text-3xl font-bold tracking-wider uppercase w-fit px-5 border-b-4 border-emerald-500">
              Hello New User
            </h1>
            <h3 className="subline text-lg font-semibold text-slate-800">
              Get Register Now and Joining Us
            </h3>
          </header>
          <main>
            <form onSubmit={registrasiHandler} className="flex flex-col gap-3">
              <label htmlFor="nik-input" className="field">
                <div className="label-field after:content-['*'] after:text-red-600 after:m-0.5 ml-5">
                  NIK
                </div>
                <input
                  autoComplete="/"
                  type="number"
                  className="input-field bg-emerald-100 px-4 py-1 rounded-full w-full focus:outline-none focus:ring-1 focus:ring-emerald-700 border border-emerald-600 invalid:border-red-500 invalid:bg-red-100 invalid:focus:ring-red-700 invalid:text-red-700"
                  id="nik-input"
                  maxLength={16}
                  required
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                />
              </label>
              <label htmlFor="name-input" className="field">
                <div className="label-field after:content-['*'] after:text-red-600 after:m-0.5 ml-5">
                  Full Name
                </div>
                <input
                  autoComplete="/"
                  type="text"
                  className="input-field bg-emerald-100 px-4 py-1 rounded-full w-full focus:outline-none focus:ring-1 focus:ring-emerald-700 border border-emerald-600 invalid:border-red-500 invalid:bg-red-100 invalid:focus:ring-red-700 invalid:text-red-700"
                  id="name-input"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label htmlFor="email-input" className="field">
                <div className="label-field after:content-['*'] after:text-red-600 after:m-0.5 ml-5">
                  Email
                </div>
                <input
                  autoComplete="/"
                  type="email"
                  className="input-field bg-emerald-100 px-4 py-1 rounded-full w-full focus:outline-none focus:ring-1 focus:ring-emerald-700 border border-emerald-600 invalid:border-red-500 invalid:bg-red-100 invalid:focus:ring-red-700 invalid:text-red-700"
                  id="email-input"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label htmlFor="password-input" className="field w-full">
                <div className="label after:content-['*'] after:text-red-600 after:m-0.5 ml-5">
                  Password
                </div>
                <div className="input w-full relative">
                  <input
                    type={showpass ? 'text' : 'password'}
                    className="input bg-emerald-100 px-4 py-1 rounded-full w-full focus:outline-none focus:ring-1 focus:ring-emerald-700 border border-emerald-600  invalid:border-red-500 invalid:bg-red-100 invalid:focus:ring-red-700"
                    id="password-input"
                    required
                    value={password}
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
              <label htmlFor="confirmpassword-input" className="field w-full">
                <div className="label after:content-['*'] after:text-red-600 after:m-0.5 ml-5">
                  Confirm Password
                </div>
                <div className="input w-full relative">
                  <input
                    type={showpass ? 'text' : 'password'}
                    className="input bg-emerald-100 px-4 py-1 rounded-full w-full focus:outline-none focus:ring-1 focus:ring-emerald-700 border border-emerald-600  invalid:border-red-500 invalid:bg-red-100 invalid:focus:ring-red-700"
                    id="confirmpassword-input"
                    required
                    value={confpassword}
                    onChange={(e) => setConfpassword(e.target.value)}
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
              <label htmlFor="phonenum-input" className="field">
                <div className="label-field after:content-['*'] after:text-red-600 after:m-0.5 ml-5">
                  Phone Number
                </div>
                <input
                  autoComplete="/"
                  type="tel"
                  className="input-field bg-emerald-100 px-4 py-1 rounded-full w-full focus:outline-none focus:ring-1 focus:ring-emerald-700 border border-emerald-600 invalid:border-red-500 invalid:bg-red-100 invalid:focus:ring-red-700 invalid:text-red-700"
                  id="phonenum-input"
                  required
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                />
              </label>
              <button
                type="submit"
                className="button bg-emerald-200 px-6 py-2 w-full flex justify-center gap-4 items-center border border-emerald-800 text-emerald-800 text-xl hover:bg-emerald-700 hover:text-emerald-50 transition-colors">
                Register <BsArrowBarRight />
              </button>
            </form>
            <p className="w-full flex justify-center items-center">
              <span className="line h-1 w-28 block bg-emerald-800 mx-2"></span>
              Or
              <span className="line h-1 w-28 block bg-emerald-800 mx-2"></span>
            </p>
          </main>
          <footer>
            <p className="text-center">
              Has have account ?{' '}
              <Link
                to={'/login'}
                className="bg-emerald-800 text-emerald-50 px-2 hover:underline">
                Login Now
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </Layout>
  );
}

export default Registerpage;
