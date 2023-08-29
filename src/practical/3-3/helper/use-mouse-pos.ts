/* eslint-disable import/prefer-default-export */
import { reactive } from 'vue';

type Pos = {
  x: number;
  y: number;
};

export const useMousePos = () => {
  const pos = reactive<Pos>({ x: 0, y: 0 });

  const update = (e: PointerEvent) => {
    pos.x = e.pageX;
    pos.y = e.pageY;
  };

  document.addEventListener('pointermove', update);

  return pos;
};
