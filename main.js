import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const container = document.getElementById('viewer');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
camera.position.set(0, 6.2, 20); // Zoom légèrement plus proche

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
// Amélioration de la netteté du rendu
renderer.setPixelRatio(Math.max(window.devicePixelRatio, 2));
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.shadowMap.enabled = true;
container.appendChild(renderer.domElement);

// Lumière principale plus lumineuse
const spotLight1 = new THREE.SpotLight(0xfff6e0, 2.2); // blanc chaud, intensité augmentée
spotLight1.position.set(10, 18, 8);
spotLight1.castShadow = true;
spotLight1.shadow.mapSize.width = 4096;
spotLight1.shadow.mapSize.height = 4096;
spotLight1.shadow.radius = 10;
spotLight1.shadow.bias = -0.0007;
spotLight1.shadow.blurSamples = 16;
scene.add(spotLight1);

// Spotlight secondaire plus visible
const spotLight2 = new THREE.SpotLight(0xcce0ff, 0.18); // bleu très pâle, intensité augmentée
spotLight2.position.set(-15, 5, -15);
spotLight2.castShadow = true;
spotLight2.shadow.mapSize.width = 2048;
spotLight2.shadow.mapSize.height = 2048;
spotLight2.shadow.radius = 8;
spotLight2.shadow.bias = -0.0005;
spotLight2.shadow.blurSamples = 8;
scene.add(spotLight2);

// Lumière d'ambiance un peu plus forte
const ambient = new THREE.AmbientLight(0xffffff, 0.18);
scene.add(ambient);

const loader = new GLTFLoader();
let model;
loader.load('picodeon.glb',
  gltf => { 
    model = gltf.scene;
    model.traverse(obj => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
    model.position.y = 0; // replacer le modèle à y=0
    scene.add(model); },
  undefined,
  err => console.error('Erreur GLTF:', err)
);

window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});

// Rotation automatique du modèle 3D
function animate() {
  requestAnimationFrame(animate);
  if (model) model.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();

// === Deuxième viewer animé sous le footer ===
const animatedContainer = document.getElementById('animated-viewer');
if (animatedContainer) {
  const animatedScene = new THREE.Scene();
  const animatedCamera = new THREE.PerspectiveCamera(45, animatedContainer.clientWidth / animatedContainer.clientHeight, 0.1, 100);
  animatedCamera.position.set(0, 10, 0); // Vue parfaitement au-dessus
  animatedCamera.up.set(0, 0, -1); // Pour que l'avant du modèle soit vers le bas de l'écran
  animatedCamera.lookAt(0, 0, 0);

  const animatedRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  animatedRenderer.setPixelRatio(Math.max(window.devicePixelRatio, 2));
  animatedRenderer.setSize(animatedContainer.clientWidth, animatedContainer.clientHeight);
  animatedRenderer.shadowMap.enabled = true;
  animatedContainer.appendChild(animatedRenderer.domElement);

  // Lumière directionnelle douce (optionnelle)
  const aLight1 = new THREE.DirectionalLight(0xffffff, 0.12);
  aLight1.position.set(10, 18, 8);
  aLight1.castShadow = false;
  animatedScene.add(aLight1);
  // Ambiance très faible
  const aLight2 = new THREE.AmbientLight(0xffffff, 0.18);
  animatedScene.add(aLight2);

  // === Spotlights dynamiques pour ombres mouvantes ===
  const spotCount = 2;
  const spots = [];
  const spotColors = [0xffffff, 0xffffff];
  for (let i = 0; i < spotCount; i++) {
    const color = spotColors[i % spotColors.length];
    const spot = new THREE.SpotLight(color, 2.2, 40, Math.PI / 16, 0.18, 1);
    spot.position.set(0, 18, 0);
    spot.target.position.set(0, 0, 0);
    spot.castShadow = true;
    spot.shadow.mapSize.width = 4096;
    spot.shadow.mapSize.height = 4096;
    spot.shadow.radius = 4;
    spot.shadow.bias = -0.0007;
    spot.shadow.blurSamples = 8;
    spot.penumbra = 0.4;
    spot.decay = 2;
    spot.distance = 60;
    animatedScene.add(spot);
    animatedScene.add(spot.target);
    spots.push(spot);
  }
  let spotTime = 0;

  window.addEventListener('resize', () => {
    animatedCamera.aspect = animatedContainer.clientWidth / animatedContainer.clientHeight;
    animatedCamera.updateProjectionMatrix();
    animatedRenderer.setSize(animatedContainer.clientWidth, animatedContainer.clientHeight);
  });

  function animateAnimated() {
    requestAnimationFrame(animateAnimated);
    if (mixer) mixer.update(0.016);
    // Animation des spots gauche-droite pour créer des ombres mouvantes
    spotTime += 0.016;
    const amplitude = 10;
    const speed = 0.7;
    for (let i = 0; i < spots.length; i++) {
      const phase = (i / spots.length) * Math.PI;
      spots[i].position.x = amplitude * Math.cos(spotTime * speed + phase);
    }
    animatedRenderer.render(animatedScene, animatedCamera);
  }
  animateAnimated();
}
