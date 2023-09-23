import {CardInfoProps} from './interfaces';

function Card({title, icon, content, bgColor}: CardInfoProps) {
  return (
    <div
      className={`card w-52 h-32 ${
        bgColor ? `${bgColor}` : 'bg-orange-400'
      } p-2 rounded-md flex flex-col shadow-md shadow-slate-400`}>
      <header className="text-xl font-semibold pb-1 border-b-2 border-white">
        <h3 className="title">{title}</h3>
      </header>
      <main className="p-2 flex justify-evenly items-center flex-1">
        <div className="icon text-3xl border border-white p-3">{icon}</div>
        <div className="line w-0.5 h-full bg-white"></div>
        <div className="content">
          <h1 className="text-3xl p-3">{content}</h1>
        </div>
      </main>
    </div>
  );
}

export default Card;
