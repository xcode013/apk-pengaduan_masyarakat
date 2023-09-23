import {ReactNode} from 'react';

export interface CardInfoProps {
  title: string;
  icon: ReactNode;
  content: number | string;
  bgColor?:
    | 'bg-emerald-400'
    | 'bg-orange-400'
    | 'bg-pink-400'
    | 'bg-red-400'
    | 'bg-sky-400'
    | 'bg-green-400'
    | 'bg-lime-400'
    | 'bg-teal-400'
    | 'bg-cyan-400'
    | 'bg-blue-400'
    | 'bg-indigo-400';
}
