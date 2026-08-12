import * as THREE from 'three';
import { MechaModel } from './entities/mecha';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(2, devicePixelRatio));
renderer.shadowMap.enabled = true;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.prepend(renderer.domElement);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeF2);
const model = new MechaModel();
model.group.position.y = 0;
scene.add(model.group);
scene.add(new THREE.HemisphereLight(0xffffff, 0x727886, 2.7));
const key = new THREE.DirectionalLight(0xffffff, 4.2); key.position.set(10, 18, 12); key.castShadow = true; scene.add(key);
const ground = new THREE.Mesh(new THREE.PlaneGeometry(80,80),new THREE.MeshStandardMaterial({color:0xe5e5e9,roughness:.8}));ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);
const camera = new THREE.PerspectiveCamera(31, 1, .1, 120);
const views = [0, Math.PI/4, Math.PI/2, Math.PI, Math.PI*1.25, -Math.PI/2];
function render(){
  const w=innerWidth,h=innerHeight;renderer.setSize(w,h,true);renderer.setScissorTest(true);
  const cw=w/3,ch=h/2;
  views.forEach((a,i)=>{const col=i%3,row=Math.floor(i/3);const x=col*cw,y=h-(row+1)*ch;renderer.setViewport(x,y,cw,ch);renderer.setScissor(x,y,cw,ch);camera.aspect=cw/ch;camera.updateProjectionMatrix();camera.position.set(Math.sin(a)*23,6.3,Math.cos(a)*23);camera.lookAt(0,5.3,0);renderer.render(scene,camera);});
}addEventListener('resize',render);render();
