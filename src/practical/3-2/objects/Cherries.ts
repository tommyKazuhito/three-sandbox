import * as THREE from 'three';

export default class Cherries extends THREE.Group {
  constructor() {
    super();

    const clumsyPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 4),
      new THREE.Vector3(0, 3, 1.5),
      new THREE.Vector3(0, 5, 1.0),
      new THREE.Vector3(-0.2, 7, 1.5),
      new THREE.Vector3(0, 5, 0.5),
      new THREE.Vector3(0, 3, 0),
      new THREE.Vector3(0, 0.5, 0),
    ]);
    const clumsyGeometry = new THREE.TubeGeometry(
      clumsyPath,
      20,
      0.1,
      8,
      false
    );
    const clumsyMaterial = new THREE.MeshToonMaterial({ color: 0x2e5925 });

    const cherryGeometry = new THREE.SphereGeometry(2, 30, 30);
    const cherryMaterial = new THREE.MeshToonMaterial({ color: 0xdc102c });
    const cherryMesh = new THREE.Mesh(cherryGeometry, cherryMaterial);

    const cherryMeshAttributes = cherryMesh.geometry.attributes.position;
    for (let i = 0; i < cherryMeshAttributes.count; i++) {
      const posX = cherryMeshAttributes.getX(i);
      const posY = cherryMeshAttributes.getY(i);
      const posZ = cherryMeshAttributes.getZ(i);

      const len = posX ** 2 + posZ ** 2;

      if (posY >= 0 && len < 0.4 ** 2) {
        cherryMeshAttributes.setY(i, len);
      } else {
        cherryMeshAttributes.setY(i, posY * 0.9);
      }
    }
    cherryMesh.geometry.setAttribute('position', cherryMeshAttributes);
    cherryMesh.geometry.attributes.position.needsUpdate = true;

    const clumsy = new THREE.Mesh(clumsyGeometry, clumsyMaterial);
    const cherry1 = cherryMesh.clone();
    const cherry2 = cherryMesh.clone();

    this.add(clumsy);
    this.add(cherry1);
    this.add(cherry2);

    cherry2.position.set(0, 0.5, 4);
    cherry2.rotation.x = (-50 * Math.PI) / 180;

    this.position.set(13, 3, 0);
  }
}
