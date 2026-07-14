// Sun disc + drifting voxel clouds. Both ignore fog so the sky stays alive.

import * as THREE from 'three';

interface Cloud {
  group: THREE.Group;
  speed: number;
}

export class Sky {
  group = new THREE.Group();
  private sun: THREE.Group;
  private clouds: Cloud[] = [];

  constructor(private sunDir: THREE.Vector3) {
    // sun: bright core + soft halo, always face the camera
    this.sun = new THREE.Group();
    const core = new THREE.Mesh(
      new THREE.CircleGeometry(22, 24),
      new THREE.MeshBasicMaterial({ color: 0xfff6c8, fog: false })
    );
    const halo = new THREE.Mesh(
      new THREE.CircleGeometry(44, 24),
      new THREE.MeshBasicMaterial({ color: 0xfff0b0, fog: false, transparent: true, opacity: 0.28, depthWrite: false })
    );
    halo.position.z = -0.5;
    this.sun.add(core, halo);
    this.group.add(this.sun);

    const cloudMat = new THREE.MeshLambertMaterial({ color: 0xffffff, fog: false, transparent: true, opacity: 0.92 });
    for (let i = 0; i < 16; i++) {
      const g = new THREE.Group();
      const puffs = 3 + Math.floor(Math.random() * 4);
      let cx = 0;
      for (let p = 0; p < puffs; p++) {
        const w = 10 + Math.random() * 16;
        const h = 2.5 + Math.random() * 2.5;
        const d = 8 + Math.random() * 12;
        const puff = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), cloudMat);
        puff.position.set(cx, (Math.random() - 0.5) * 2.5, (Math.random() - 0.5) * 8);
        g.add(puff);
        cx += w * 0.55;
      }
      g.position.set((Math.random() - 0.5) * 600, 105 + Math.random() * 45, (Math.random() - 0.5) * 600);
      this.group.add(g);
      this.clouds.push({ group: g, speed: 1.2 + Math.random() * 1.8 });
    }
  }

  update(dt: number, center: THREE.Vector3, camera: THREE.Camera): void {
    this.sun.position.copy(center).addScaledVector(this.sunDir, 430);
    this.sun.lookAt(camera.position);

    for (const c of this.clouds) {
      c.group.position.x += c.speed * dt;
      // wrap around the player so clouds are always overhead
      if (c.group.position.x - center.x > 330) c.group.position.x -= 660;
      if (c.group.position.x - center.x < -330) c.group.position.x += 660;
      if (c.group.position.z - center.z > 330) c.group.position.z -= 660;
      if (c.group.position.z - center.z < -330) c.group.position.z += 660;
    }
  }
}
