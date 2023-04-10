import { load } from './helpers/font';
import CubesWorld from './worlds/CubesWorld';
import IconsWorld from './worlds/IconsWorld';

const initCubes = () => new CubesWorld('app1');

const initIcons = async () => {
  await load();
  new IconsWorld('app2');
};

window.addEventListener('DOMContentLoaded', initCubes);
window.addEventListener('DOMContentLoaded', initIcons);
