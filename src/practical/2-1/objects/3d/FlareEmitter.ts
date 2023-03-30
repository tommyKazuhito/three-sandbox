import Emitter from './Emitter';
import Flare from './Flare';

export default class FlareEmitter extends Emitter<Flare> {
  constructor() {
    super(10);

    const perAngle = 360 / this.num;

    [...Array(this.num)].forEach((_, i) => {
      const rad = (perAngle * i * Math.PI) / 180;
      const flare = new Flare();

      flare.rotation.x = rad;
      flare.rotation.y = rad;
      flare.rotation.z = rad / 2;

      this.add(flare);
      this.list.push(flare);
    });
  }
}
