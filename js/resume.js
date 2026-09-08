import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.166.1/build/three.module.js';

document.getElementById('year').textContent = new Date().getFullYear();
const canvas = document.getElementById('quality-canvas');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealSections = document.querySelectorAll('[data-reveal]');
if (reduced) {
  revealSections.forEach((section) => section.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .12 });
  revealSections.forEach((section) => revealObserver.observe(section));
}

if (canvas && !reduced) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, .1, 100);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0xd8eee8, 1);
  const cluster = new THREE.Group(); scene.add(cluster);
  const material = (color) => new THREE.MeshStandardMaterial({ color, roughness: .45, metalness: .08 });
  const ink = material(0x12251f), coral = material(0xfb765b), acid = material(0xd3f45b), aqua = material(0x79d8cc), paper = material(0xf3f1e9);
  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, .45, 6), ink); base.rotation.x = Math.PI / 2; cluster.add(base);
  [[-.8,-.2,1.3,coral],[-.23,.12,1.02,acid],[.36,-.12,.8,aqua],[.91,.08,.58,paper]].forEach(([y,x,scale,mat]) => { const layer = new THREE.Mesh(new THREE.CylinderGeometry(scale,scale,.19,6),mat); layer.position.set(x,y,.05); layer.rotation.z=Math.PI/6; cluster.add(layer); });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.85,.028,8,64),ink); ring.rotation.x=Math.PI/2.45; ring.rotation.z=.45; cluster.add(ring);
  const satellite = new THREE.Mesh(new THREE.IcosahedronGeometry(.17,1),coral); satellite.position.set(1.55,.98,.22); cluster.add(satellite);
  const satelliteTwo = new THREE.Mesh(new THREE.IcosahedronGeometry(.11,1),ink); satelliteTwo.position.set(-1.35,-.48,.35); cluster.add(satelliteTwo);
  scene.add(new THREE.HemisphereLight(0xffffff,0x668c7c,2.3)); const light = new THREE.DirectionalLight(0xffffff,2.5); light.position.set(3,4,5); scene.add(light); camera.position.set(0,0,6.4);
  const resize = () => { const {width,height}=canvas.getBoundingClientRect(); renderer.setSize(width,height,false); camera.aspect=width/height; camera.updateProjectionMatrix(); }; const pointer={x:0,y:0};
  canvas.closest('.hero-visual').addEventListener('pointermove',(event)=>{const rect=canvas.getBoundingClientRect();pointer.x=(event.clientX-rect.left)/rect.width-.5;pointer.y=(event.clientY-rect.top)/rect.height-.5;});
  const animate = (time) => { const t=time*.00045; cluster.rotation.y=t+pointer.x*.55; cluster.rotation.x=Math.sin(t*.9)*.14-pointer.y*.35; ring.rotation.z=.45+t*.6; satellite.position.y=.98+Math.sin(t*2)*.18; renderer.render(scene,camera); requestAnimationFrame(animate); };
  window.addEventListener('resize',resize); resize(); animate(0);
}
