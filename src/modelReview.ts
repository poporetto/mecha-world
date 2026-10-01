import * as THREE from 'three';
import { MechaModel } from './entities/mecha';
import * as Monsters from './entities/monsters';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(2, devicePixelRatio));
renderer.shadowMap.enabled = true;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.prepend(renderer.domElement);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeF2);
// ?boss=Kaiju (any class exported from monsters.ts) reviews a boss instead
const bossName = new URLSearchParams(location.search).get('boss');
const model = new MechaModel();
let target: THREE.Object3D = model.group;
let frameR = 23, frameY = 5.3;
const frameSize = new THREE.Vector3();
const frameCenter = new THREE.Vector3();
if (bossName) {
  const B = (Monsters as unknown as Record<string, new (x: number, z: number) => Monsters.Monster>)[bossName];
  const boss = new B(0, 0);
  boss.group.position.set(0, 0, 0);
  target = boss.group;
  const box = new THREE.Box3().setFromObject(boss.group);
  // parts that live beside the group in the scene (the serpent's body)
  // are laid out along a straight trail behind it, as the head leaves them
  let prev = new THREE.Vector3();
  boss.roots().slice(1).forEach((r, i) => {
    r.scale.setScalar(Monsters.MONSTER_SCALE);
    r.position.set(Math.sin((i + 1) * 0.55) * 4, 0, -(i + 1) * 4.05);
    r.lookAt(prev);
    prev = r.position.clone();
    scene.add(r);
    box.expandByObject(r);
  });
  box.getSize(frameSize);
  box.getCenter(frameCenter);
  frameR = 0; // fitted to the panel in render()
  frameY = frameCenter.y;
}
scene.add(target);
scene.add(new THREE.HemisphereLight(0xffffff, 0x727886, 2.7));
const key = new THREE.DirectionalLight(0xffffff, 4.2); key.position.set(30, 54, 36); key.shadow.camera.left=-60; key.shadow.camera.right=60; key.shadow.camera.top=60; key.shadow.camera.bottom=-60; key.shadow.camera.far=200; key.shadow.mapSize.set(2048,2048); key.shadow.normalBias=0.06; key.shadow.bias=-0.0004; key.castShadow = !new URLSearchParams(location.search).has('noshadow'); scene.add(key);
const ground = new THREE.Mesh(new THREE.PlaneGeometry(400,400),new THREE.MeshStandardMaterial({color:0xe5e5e9,roughness:.8}));ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);
const camera = new THREE.PerspectiveCamera(31, 1, .1, 600);
const allViews = [0, Math.PI/4, Math.PI/2, Math.PI, Math.PI*1.25, -Math.PI/2];
// ?view=1 shows one of the six angles full-frame, ?zoom=2 moves in on it
const one = new URLSearchParams(location.search).get('view');
const zoom = Number(new URLSearchParams(location.search).get('zoom')) || 1;
const views = one === null ? allViews : [allViews[Number(one)] ?? 0];
if (!bossName) frameR /= zoom;
// ?at=0,26,10 looks at a world point (e.g. a boss's head) instead of the middle
const at = new URLSearchParams(location.search).get('at')?.split(',').map(Number);
const look = new THREE.Vector3(frameCenter.x, frameY, frameCenter.z);
if (at && at.length === 3) look.set(at[0], at[1], at[2]);
function render(){
  const w=innerWidth,h=innerHeight;renderer.setSize(w,h,true);renderer.setScissorTest(true);
  const cw=views.length>1?w/3:w,ch=views.length>1?h/2:h;
  // a boss is framed so its whole bounds fit the panel from every angle
  let r=frameR;
  if(!r){const t=Math.tan(THREE.MathUtils.degToRad(camera.fov/2)),wide=Math.max(frameSize.x,frameSize.z);r=(Math.max(frameSize.y/2/t,wide/2/(t*cw/ch))*1.12+wide/2)/zoom;}
  views.forEach((a,i)=>{const frameR=r;const col=i%3,row=Math.floor(i/3);const x=col*cw,y=h-(row+1)*ch;renderer.setViewport(x,y,cw,ch);renderer.setScissor(x,y,cw,ch);camera.aspect=cw/ch;camera.updateProjectionMatrix();camera.position.set(look.x+Math.sin(a)*frameR,look.y+frameR*0.05,look.z+Math.cos(a)*frameR);camera.lookAt(look);renderer.render(scene,camera);});
}addEventListener('resize',render);
if (new URLSearchParams(location.search).has('saber')) {
  let last=performance.now(), t=0, restart=0, combo=0;
  const forcedStyle=Number(new URLSearchParams(location.search).get('style'));
  if(Number.isFinite(forcedStyle)) combo=Math.max(0,Math.min(2,forcedStyle));
  const loop=(now:number)=>{const dt=Math.min(.04,(now-last)/1000);last=now;t+=dt;restart-=dt;if(restart<=0){model.startSwing(combo,combo>0);combo=(combo+1)%3;restart=.72;}model.animate(t,0,true,dt);render();requestAnimationFrame(loop);};
  requestAnimationFrame(loop);
} else render();
