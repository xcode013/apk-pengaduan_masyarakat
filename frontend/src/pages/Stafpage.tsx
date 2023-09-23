// import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../app/store';
import LayoutStaff from './LayoutStaff';
import {Link, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {getMe} from '../features/addSlice';
import axios from 'axios';
import {Init} from '../utils/interfaces';
import Form, {Field} from '../components/forms/Form';

interface StafsData {
  id: string;
  name: string;
  username: string;
  phone: string;
  level: 'Admin' | 'Petugas';
}

function Stafpage() {
  const [stafs, setStafs] = useState<StafsData[]>([]);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const {user, isError} = useSelector<RootState, Init>((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) navigate('/');
    if (user && user.level !== 'Admin') navigate('/dashboard');
  }, [user, navigate, isError]);

  useEffect(() => {
    getStafs();
  }, []);

  const getStafs = async () => {
    const response = await axios.get('http://localhost:5000/petugas');
    setStafs(response.data);
  };

  return (
    <LayoutStaff>
      <Form headline="Add Staf">
        <Field id="name" inputType="text" label="Name" />
        <Field id="username" inputType="email" label="Username" />
        <Field id="password" inputType="text" label="Password" />
        <Field id="confPass" inputType="text" label="Confirm Password" />
        <Field id="tel" inputType="tel" label="Call" />
      </Form>
      <div className="staf-page min-h-screen py-14 lg:py-0">
        <header className="p-2 border-b-4 border-emerald-700">
          <h1 className="headline text-4xl font-bold text-emerald-600">Staf</h1>
        </header>
        <main className=" my-3 p-2 flex flex-col gap-4">
          <header>
            <Link
              to={'/dashboard/staf/addstaf'}
              className="px-6 py-2 bg-emerald-300 transition-colors hover:bg-emerald-500 hover:text-white border border-emerald-700">
              Add Staf
            </Link>
          </header>
          <main className="table-container overflow-auto">
            <table className="min-w-full w-max">
              <thead>
                <tr>
                  <td className="border border-emerald-900 px-4 py-1 text-xl font-bold text-white bg-emerald-600 text-center">
                    No
                  </td>
                  <td className="border border-emerald-900 px-4 py-1 text-xl font-bold text-white bg-emerald-600 text-center">
                    Action
                  </td>
                  <td className="border border-emerald-900 px-4 py-1 text-xl font-bold text-white bg-emerald-600 text-center">
                    Id
                  </td>
                  <td className="border border-emerald-900 px-4 py-1 text-xl font-bold text-white bg-emerald-600 text-center">
                    Name
                  </td>
                  <td className="border border-emerald-900 px-4 py-1 text-xl font-bold text-white bg-emerald-600 text-center">
                    Username
                  </td>
                  <td className="border border-emerald-900 px-4 py-1 text-xl font-bold text-white bg-emerald-600 text-center">
                    Phone
                  </td>
                  <td className="border border-emerald-900 px-4 py-1 text-xl font-bold text-white bg-emerald-600 text-center">
                    Level
                  </td>
                </tr>
              </thead>
              <tbody>
                {stafs.map((data, index) => {
                  return (
                    <tr
                      key={index}
                      className="bg-emerald-100 odd:bg-emerald-300">
                      <td className="border border-emerald-900 p-2 text-lg text-center">
                        {index + 1}
                      </td>
                      <td className="border border-emerald-900 p-2 text-lg text-center flex gap-3 justify-center">
                        <Link
                          to={'/dashboard/staf/:update'}
                          className="px-6 py-1.5 bg-amber-400 hover:bg-amber-500 hover:text-yellow-100 transition-colors">
                          Edit
                        </Link>
                        <button className="px-6 py-1 bg-red-500 text-white transition-colors hover:bg-red-600">
                          Delete
                        </button>
                      </td>
                      <td className="border border-emerald-900 p-2 text-lg text-center">
                        {data.id}
                      </td>
                      <td className="border border-emerald-900 p-2 text-lg text-center">
                        {data.name}
                      </td>
                      <td className="border border-emerald-900 p-2 text-lg text-center">
                        {data.username}
                      </td>
                      <td className="border border-emerald-900 p-2 text-lg text-center">
                        {data.phone}
                      </td>
                      <td className="border border-emerald-900 p-2 text-lg text-center">
                        {data.level}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </main>
        </main>
      </div>
    </LayoutStaff>
  );
}

export default Stafpage;
