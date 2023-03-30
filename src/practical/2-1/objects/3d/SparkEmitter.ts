import Emitter from './Emitter';
import Spark from './Spark';

export default class SparkEmitter extends Emitter<Spark> {
  constructor() {
    super(50);

    const perAngle = 360 / this.num;

    [...Array(this.num)].forEach((_, i) => {
      const rad = perAngle * i * (Math.PI / 180);
      const spark = new Spark();

      spark.rotation.x = 360 * Math.sin(rad);
      spark.rotation.z = rad;

      this.add(spark);
      this.list.push(spark);
    });
  }
}
