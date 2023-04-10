/* eslint-disable import/prefer-default-export */
import * as THREE from 'three';

/**
 * ジオメトリ内のUVを変更します。
 *
 * @param geometry
 * @param unitX
 * @param unitY
 * @param offsetX
 * @param offsetY
 */
export const changeUvs = (
  geometry: THREE.PlaneGeometry,
  unitX: number,
  unitY: number,
  offsetX: number,
  offsetY: number
) => {
  const uvAttr = geometry.getAttribute('uv');
  const uvArray = Array.from(uvAttr.array);

  for (let i = 0; i < uvAttr.count * uvAttr.itemSize; i += 2) {
    const uvX = (uvArray[i + 0] + offsetX) * unitX;
    const uvY = (uvArray[i + 1] + offsetY) * unitY;
    uvArray[i + 0] = uvX;
    uvArray[i + 1] = uvY;
  }

  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvArray, 2));
  geometry.attributes.uv.needsUpdate = true;
};
