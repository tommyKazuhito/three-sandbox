import WorldCubes from './worlds/WorldCubes';

const initCubes = () => new WorldCubes('app1');

window.addEventListener('DOMContentLoaded', initCubes);
