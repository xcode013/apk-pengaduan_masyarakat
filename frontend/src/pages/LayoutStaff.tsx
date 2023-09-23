import {Fragment, ReactNode} from 'react';

import Footer from '../components/Footer';
import NavbarStaff from '../components/Staf/Navbar/NavbarStaff';

function LayoutStaff({children}: {children: ReactNode}) {
  return (
    <Fragment>
      <div>
        <header>
          <NavbarStaff />
        </header>
        <main className="lg:pl-64">{children}</main>
        <footer className="lg:pl-64">
          <Footer />
        </footer>
      </div>
    </Fragment>
  );
}

export default LayoutStaff;
