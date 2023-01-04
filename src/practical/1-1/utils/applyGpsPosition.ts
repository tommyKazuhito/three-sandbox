/* eslint-disable import/prefer-default-export */
import type { Object3D } from 'three';

import GeoUtil from './GeoUtil';

/**
 * 座標を更新
 *
 * @param {Object3D} object3d - 座標を変更したい3Dオブジェクト
 * @param {{ lat: number; lng: number; radius: number }} coords - 緯度（度数法）・ 経度（度数法）・半径を格納したオブジェクト
 * @return {void}
 */
export const applyGpsPosition = (
  object3d: Object3D,
  coords: { lat: number; lng: number; radius: number }
) => {
  const pos = GeoUtil.translateGeoCoords(coords.lat, coords.lng, coords.radius);

  object3d.position.copy(pos);
};
