import * as THREE from 'three';

type PlaneType = 'image' | 'video';

export default class Planes {
  private type: PlaneType = 'image';

  private readonly renderer: THREE.WebGLRenderer;

  private video: HTMLVideoElement | null = null;

  private videoContext: CanvasRenderingContext2D | null = null;

  private videoTexture: THREE.Texture | null = null;

  readonly meshVideo: THREE.Group;

  readonly meshImage: THREE.Group;

  constructor(
    renderer: THREE.WebGLRenderer,
    videoFile: string,
    imageFile: string
  ) {
    this.renderer = renderer;

    this.meshVideo = this.createVideoPlane(videoFile);
    this.meshImage = this.createImagePlane(imageFile);
  }

  public changeType(type: PlaneType) {
    this.type = type;

    switch (this.type) {
      case 'video':
        this.video?.play();
        this.meshImage.visible = false;
        this.meshVideo.visible = true;
        break;

      default:
        this.video?.pause();
        this.meshImage.visible = true;
        this.meshVideo.visible = false;
        break;
    }
  }

  private createVideoPlane(videoFile: string) {
    // video要素とそれをキャプチャするcanvas要素を生成
    this.video = document.createElement('video');
    this.video.src = videoFile;
    this.video.width = 320;
    this.video.height = 180;
    this.video.muted = true;
    this.video.loop = true;
    this.video.load();

    const canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 180;

    this.videoContext = canvas.getContext('2d');
    if (this.videoContext) {
      this.videoContext.fillStyle = '#000000';
      this.videoContext.fillRect(0, 0, canvas.width, canvas.height);
    }

    // 生成したcanvasをtextureとしてTHREE.Textureオブジェクトを生成
    this.videoTexture = new THREE.Texture(canvas);
    this.videoTexture.minFilter = THREE.LinearFilter;
    this.videoTexture.magFilter = THREE.LinearFilter;

    // 生成したvideo textureをmapに指定し、overdrawをtrueにしてマテリアルを生成
    const material = new THREE.MeshBasicMaterial({
      map: this.videoTexture,
      side: THREE.DoubleSide,
    });
    const geometry = new THREE.PlaneGeometry(32, 18);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.setLength(0.5);

    const group = new THREE.Group();
    group.add(mesh);
    group.visible = this.type === 'video';

    return group;
  }

  private createImagePlane(imageFile: string) {
    const texture = new THREE.TextureLoader().load(imageFile);
    texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.FrontSide,
    });
    const geometry = new THREE.PlaneGeometry(10, 10);
    const mesh = new THREE.Mesh(geometry, material);

    const group = new THREE.Group();
    group.add(mesh);
    group.visible = this.type === 'image';

    return group;
  }

  public update() {
    if (this.type === 'image') {
      return;
    }

    // ビデオの場合は、videoの再生フレームをcanvasに描画する
    if (this.video?.readyState === this.video?.HAVE_ENOUGH_DATA) {
      if (this.video) {
        this.videoContext?.drawImage(this.video, 0, 0);
      }
      if (this.videoTexture) {
        this.videoTexture.needsUpdate = true;
      }
    }
  }
}
