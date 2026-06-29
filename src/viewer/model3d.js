// Self-hosted STL/3MF viewer. Bundled by Vite into a lazy chunk that's only
// fetched when a page actually contains a `.model-3d` element (see Model3D.astro).
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js';

function accent() {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--accent-bright').trim();
  return v || '#34d399';
}

function setup(el) {
  el.dataset.init = '1';
  const hint = el.querySelector('.model-3d-hint');
  const w = el.clientWidth || 400;
  const h = el.clientHeight || 300;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h);
  el.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100000);
  camera.position.set(0, 0, 100);
  scene.add(new THREE.AmbientLight(0xffffff, 0.65));
  const key = new THREE.DirectionalLight(0xffffff, 0.95); key.position.set(1, 1, 1); scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, 0.35); rim.position.set(-1, 0.6, -1); scene.add(rim);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.6;
  controls.addEventListener('start', () => { controls.autoRotate = false; });

  function frame(obj) {
    const box = new THREE.Box3().setFromObject(obj);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    obj.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    camera.position.set(maxDim * 0.9, maxDim * 0.7, maxDim * 1.9);
    camera.near = maxDim / 100; camera.far = maxDim * 100; camera.updateProjectionMatrix();
    controls.target.set(0, 0, 0); controls.update();
    if (hint) hint.remove();
  }
  const fail = () => { if (hint) hint.textContent = 'Could not load model'; };

  const src = el.dataset.src;
  const fmt = (el.dataset.format || '').toLowerCase();
  if (fmt === '3mf') {
    new ThreeMFLoader().load(src, (g) => { scene.add(g); frame(g); }, undefined, fail);
  } else {
    new STLLoader().load(src, (geo) => {
      geo.computeVertexNormals();
      const mat = new THREE.MeshStandardMaterial({ color: new THREE.Color(accent()), metalness: 0.15, roughness: 0.55 });
      scene.add(new THREE.Mesh(geo, mat));
      frame(scene);
    }, undefined, fail);
  }

  (function loop() { requestAnimationFrame(loop); controls.update(); renderer.render(scene, camera); })();
  window.addEventListener('resize', () => {
    const nw = el.clientWidth, nh = el.clientHeight || h;
    renderer.setSize(nw, nh); camera.aspect = nw / nh; camera.updateProjectionMatrix();
  });
}

export function init() {
  const els = Array.from(document.querySelectorAll('.model-3d'));
  if (!els.length) return;
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !e.target.dataset.init) { setup(e.target); obs.unobserve(e.target); }
    });
  }, { rootMargin: '200px' });
  els.forEach((el) => io.observe(el));
}
