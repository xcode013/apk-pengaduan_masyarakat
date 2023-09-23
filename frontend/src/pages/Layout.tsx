import {Fragment, ReactNode} from 'react';

import Navbar from '../components/Public/Navbar/Navbar';
import Footer from '../components/Footer';

interface Children {
  children: ReactNode;
}

function Layout({children}: Children) {
  return (
    <Fragment>
      <div className="">
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <footer className="bg-blue-400">
          <Footer />
        </footer>
      </div>
    </Fragment>
  );
}

export default Layout;
