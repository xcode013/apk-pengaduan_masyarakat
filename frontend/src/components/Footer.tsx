import {
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsYoutube,
  BsWhatsapp,
} from 'react-icons/bs';
import {Link} from 'react-router-dom';

function Footer() {
  return (
    <div className="footer bg-zinc-900 text-white box-border p-4">
      <header className="border-b-2 border-emerald-500 pb-2">
        <h1 className="header text-3xl font-bold text-emerald-300">
          Pengaduan Masyarkat
        </h1>
        <h3 className="subhead text-zinc-400">
          create by{' '}
          <span className="itsMe text-white font-semibold">
            Rifa Eka Prasetya
          </span>
        </h3>
      </header>
      <main className="flex flex-wrap lg:flex-nowrap">
        <div className="about us p-2 lg:flex-1 lg:flex lg:flex-col">
          <h3 className="title text-lg font-bold underline">About Us</h3>
          <p className="article text-zinc-400">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="sosmed-links p-2 flex flex-wrap gap-x-8 gap-y-2 lg:flex-1">
          <Link
            to={'/'}
            className="link group flex justify-center items-center">
            <div className="icon p-2 text-black group-hover:bg-emerald-700 group-hover:text-white transition-all bg-white rounded-lg text-2xl">
              <BsFacebook />
            </div>
            <div className="label group-hover:bg-emerald-300 group-hover:before:bg-emerald-700 before:transition-all transition-all bg-zinc-300 text-black pl-2 pr-6 py-1 before:absolute before:w-6 before:h-6 before:bg-white before:-right-3 before:rotate-45 relative">
              Ripai
            </div>
          </Link>
          <Link
            to={'/'}
            className="link flex justify-center items-center group">
            <div className="icon p-2 text-black bg-white rounded-lg text-2xl group-hover:bg-emerald-700 group-hover:text-white transition-all">
              <BsInstagram />
            </div>
            <div className="label bg-zinc-300 text-black pl-2 pr-6 py-1 before:absolute before:w-6 before:h-6 before:bg-white before:-right-3 before:rotate-45 relative group-hover:bg-emerald-300 group-hover:before:bg-emerald-700 before:transition-all transition-all">
              @PArt
            </div>
          </Link>
          <Link
            to={'/'}
            className="link flex justify-center items-center group">
            <div className="icon p-2 text-black bg-white rounded-lg text-2xl group-hover:bg-emerald-700 group-hover:text-white transition-all">
              <BsTwitter />
            </div>
            <div className="label bg-zinc-300 text-black pl-2 pr-6 py-1 before:absolute before:w-6 before:h-6 before:bg-white before:-right-3 before:rotate-45 relative group-hover:bg-emerald-300 group-hover:before:bg-emerald-700 before:transition-all transition-all">
              Twitter
            </div>
          </Link>
          <Link
            to={'/'}
            className="link flex justify-center items-center group">
            <div className="icon p-2 text-black bg-white rounded-lg text-2xl group-hover:bg-emerald-700 group-hover:text-white transition-all">
              <BsWhatsapp />
            </div>
            <div className="label bg-zinc-300 text-black pl-2 pr-6 py-1 before:absolute before:w-6 before:h-6 before:bg-white before:-right-3 before:rotate-45 relative group-hover:bg-emerald-300 group-hover:before:bg-emerald-700 before:transition-all transition-all">
              Whatsapp
            </div>
          </Link>
          <Link
            to={'/'}
            className="link flex justify-center items-center group">
            <div className="icon p-2 text-black bg-white rounded-lg text-2xl group-hover:bg-emerald-700 group-hover:text-white transition-all">
              <BsYoutube />
            </div>
            <div className="label bg-zinc-300 text-black pl-2 pr-6 py-1 before:absolute before:w-6 before:h-6 before:bg-white before:-right-3 before:rotate-45 relative group-hover:bg-emerald-300 group-hover:before:bg-emerald-700 before:transition-all transition-all">
              Ripai-O
            </div>
          </Link>
        </div>
      </main>
      <footer className="flex gap-2 justify-center items-center bg-zinc-700 p-2 mt-4">
        Copyright by R13 <p>&copy;</p> 2023/2024
      </footer>
    </div>
  );
}

export default Footer;
