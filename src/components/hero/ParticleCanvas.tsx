import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FocusShader } from 'three/examples/jsm/shaders/FocusShader.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

export function ParticleCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !containerRef.current) return;

    const container = containerRef.current;
    const W = container.clientWidth;
    const H = container.clientHeight;

    /* ---- scene ---- */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x003C69);
    scene.fog = new THREE.FogExp2(0x003C69, 0.0000675);

    const camera = new THREE.PerspectiveCamera(20, W / H, 1, 50000);
    camera.position.set(0, 700, 7000);
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.autoClear = false;
    container.appendChild(renderer.domElement);

    const parent = new THREE.Object3D();
    scene.add(parent);

    /* ---- postprocessing ---- */
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new BloomPass(0.75));
    composer.addPass(new FilmPass());

    const effectFocus = new ShaderPass(FocusShader);
    effectFocus.uniforms['screenWidth'].value = W * window.devicePixelRatio;
    effectFocus.uniforms['screenHeight'].value = H * window.devicePixelRatio;
    composer.addPass(effectFocus);
    composer.addPass(new OutputPass());

    /* ---- data structures (same as original) ---- */
    interface MeshData {
      mesh: THREE.Points;
      verticesDown: number;
      verticesUp: number;
      direction: number;
      speed: number;
      delay: number;
      start: number;
    }
    interface CloneData {
      mesh: THREE.Points;
      speed: number;
    }

    const meshes: MeshData[] = [];
    const clonemeshes: CloneData[] = [];

    /* ---- combineBuffer — exact port ---- */
    function combineBuffer(model: THREE.Object3D, bufferName: string): THREE.BufferAttribute {
      let count = 0;
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const buf = (child as THREE.Mesh).geometry.attributes[bufferName];
          count += buf.array.length;
        }
      });
      const combined = new Float32Array(count);
      let offset = 0;
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const buf = (child as THREE.Mesh).geometry.attributes[bufferName];
          combined.set(buf.array as Float32Array, offset);
          offset += buf.array.length;
        }
      });
      return new THREE.BufferAttribute(combined, 3);
    }

    /* ---- createMesh — exact port ---- */
    function createMesh(
      positions: THREE.BufferAttribute,
      targetScene: THREE.Scene | THREE.Object3D,
      scale: number,
      x: number, y: number, z: number,
      color: number,
    ) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', positions.clone());
      geometry.setAttribute('initialPosition', positions.clone());
      (geometry.attributes.position as THREE.BufferAttribute).setUsage(THREE.DynamicDrawUsage);

      const clones = [
        [6000, 0, -4000],
        [5000, 0, 0],
        [1000, 0, 5000],
        [1000, 0, -5000],
        [4000, 0, 2000],
        [-4000, 0, 1000],
        [-5000, 0, -5000],
        [0, 0, 0],
      ];

      let lastMesh: THREE.Points | null = null;

      for (let i = 0; i < clones.length; i++) {
        const c = i < clones.length - 1 ? 0x0a5a8a : color;
        const mesh = new THREE.Points(geometry, new THREE.PointsMaterial({ size: 30, color: c }));
        mesh.scale.set(scale, scale, scale);
        mesh.position.set(x + clones[i][0], y + clones[i][1], z + clones[i][2]);
        parent.add(mesh);
        clonemeshes.push({ mesh, speed: 0.5 + Math.random() });
        lastMesh = mesh;
      }

      meshes.push({
        mesh: lastMesh!,
        verticesDown: 0,
        verticesUp: 0,
        direction: 0,
        speed: 15,
        delay: Math.floor(200 + 200 * Math.random()),
        start: Math.floor(100 + 200 * Math.random()),
      });
    }

    /* ---- load models ---- */
    const loader = new OBJLoader();

    loader.load('/models/obj/male02/male02.obj', (object) => {
      const positions = combineBuffer(object, 'position');
      createMesh(positions, scene, 4.05, -500, -350, 600, 0x00AFD2);   // cyan
      createMesh(positions, scene, 4.05, 500, -350, 0, 0xD90044);      // red
      createMesh(positions, scene, 4.05, -250, -350, 1500, 0xE8BB03);  // yellow
      createMesh(positions, scene, 4.05, -250, -350, -1500, 0x00AFD2); // cyan
    });

    loader.load('/models/obj/female02/female02.obj', (object) => {
      const positions = combineBuffer(object, 'position');
      createMesh(positions, scene, 4.05, -1000, -350, 0, 0xE8BB03);    // yellow
      createMesh(positions, scene, 4.05, 0, -350, 0, 0x00E5FF);        // light cyan
      createMesh(positions, scene, 4.05, 1000, -350, 400, 0xD90044);   // red
      createMesh(positions, scene, 4.05, 250, -350, 1500, 0x00AFD2);   // cyan
      createMesh(positions, scene, 4.05, 250, -350, 2500, 0xFF6690);   // pink
    });

    /* ---- animation ---- */
    const clock = new THREE.Clock();
    let raf = 0;

    function render() {
      let delta = 10 * clock.getDelta();
      if (delta > 2) delta = 2;

      parent.rotation.y += -0.02 * delta;

      for (const cm of clonemeshes) {
        cm.mesh.rotation.y += -0.1 * delta * cm.speed;
      }

      for (const data of meshes) {
        const positions = data.mesh.geometry.attributes.position as THREE.BufferAttribute;
        const initialPositions = data.mesh.geometry.attributes.initialPosition as THREE.BufferAttribute;
        const count = positions.count;

        if (data.start > 0) {
          data.start -= 1;
        } else {
          if (data.direction === 0) {
            data.direction = -1;
          }
        }

        for (let i = 0; i < count; i++) {
          const px = positions.getX(i);
          const py = positions.getY(i);
          const pz = positions.getZ(i);

          // falling down
          if (data.direction < 0) {
            if (py > 0) {
              positions.setXYZ(
                i,
                px + 1.5 * (0.50 - Math.random()) * data.speed * delta,
                py + 3.0 * (0.25 - Math.random()) * data.speed * delta,
                pz + 1.5 * (0.50 - Math.random()) * data.speed * delta,
              );
            } else {
              data.verticesDown += 1;
            }
          }

          // rising up
          if (data.direction > 0) {
            const ix = initialPositions.getX(i);
            const iy = initialPositions.getY(i);
            const iz = initialPositions.getZ(i);

            const dx = Math.abs(px - ix);
            const dy = Math.abs(py - iy);
            const dz = Math.abs(pz - iz);

            const d = dx + dy + dx;

            if (d > 1) {
              positions.setXYZ(
                i,
                px - (px - ix) / dx * data.speed * delta * (0.85 - Math.random()),
                py - (py - iy) / dy * data.speed * delta * (1 + Math.random()),
                pz - (pz - iz) / dz * data.speed * delta * (0.85 - Math.random()),
              );
            } else {
              data.verticesUp += 1;
            }
          }
        }

        // all vertices down
        if (data.verticesDown >= count) {
          if (data.delay <= 0) {
            data.direction = 1;
            data.speed = 5;
            data.verticesDown = 0;
            data.delay = 320;
          } else {
            data.delay -= 1;
          }
        }

        // all vertices up
        if (data.verticesUp >= count) {
          if (data.delay <= 0) {
            data.direction = -1;
            data.speed = 15;
            data.verticesUp = 0;
            data.delay = 120;
          } else {
            data.delay -= 1;
          }
        }

        positions.needsUpdate = true;
      }

      composer.render(0.01);
    }

    function animate() {
      raf = requestAnimationFrame(animate);
      render();
    }
    animate();

    /* ---- resize ---- */
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      camera.lookAt(scene.position);
      renderer.setSize(w, h);
      composer.setSize(w, h);
      effectFocus.uniforms['screenWidth'].value = w * window.devicePixelRatio;
      effectFocus.uniforms['screenHeight'].value = h * window.devicePixelRatio;
    };
    window.addEventListener('resize', onResize);

    /* ---- cleanup ---- */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [reduced]);

  if (reduced) {
    return (
      <div className="absolute inset-0 bg-ostrava-blue">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-ostrava-cyan/30 animate-float"
            style={{
              width: 2 + Math.random() * 4,
              height: 2 + Math.random() * 4,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{ pointerEvents: 'none' }}
    />
  );
}
