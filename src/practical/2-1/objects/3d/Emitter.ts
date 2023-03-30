import * as THREE from 'three';

import type Object3D from './Object3D';

export default class Emitter<T extends Object3D> extends THREE.Object3D {
  protected num: number;

  protected list: T[] = [];

  constructor(num: number) {
    super();

    this.num = num;
  }

  update() {
    this.list.forEach((obj) => obj.update());
  }
}
