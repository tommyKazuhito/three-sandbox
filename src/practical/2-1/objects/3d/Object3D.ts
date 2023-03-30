import * as THREE from 'three';

export default abstract class Object3D extends THREE.Object3D {
  /** ジオメトリ */
  protected geometry?: THREE.BufferGeometry;

  /** カラーマップ */
  protected map?: THREE.Texture;

  /** マテリアル */
  protected material?: THREE.Material;

  /** メッシュ */
  protected mesh?: THREE.Mesh;

  abstract update(): void;
}
