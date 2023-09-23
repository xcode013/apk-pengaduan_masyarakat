import {useState} from 'react';

export const useToggle = (initialState: boolean = false) => {
  const [toggle, setToggle] = useState(initialState);

  function toggleHandler() {
    setToggle((prev) => !prev);
  }

  return [toggle, toggleHandler];
};
