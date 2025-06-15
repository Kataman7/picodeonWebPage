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

  // Lumière principale douce
  const aLight1 = new THREE.DirectionalLight(0xffffff, 0.45);
  aLight1.position.set(10, 18, 8);
  aLight1.castShadow = false;
  animatedScene.add(aLight1);
  // Ambiance douce
  const aLight2 = new THREE.AmbientLight(0xffffff, 0.5);
  animatedScene.add(aLight2);

  // Chargement du modèle animé
  const animatedLoader = new GLTFLoader();
  let animatedModel, mixer = null, actions = [], allClips = [], playing = false;
  animatedLoader.load('picodeon-animated.glb',
    gltf => {
      animatedModel = gltf.scene;
      animatedModel.position.z = -5; // place le modèle plus haut sur l'axe Y
      animatedScene.add(animatedModel);
      // Animation GLTF : chaque animation une seule fois, puis restart
      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(animatedModel);
        let actions = gltf.animations.map(clip => {
          const action = mixer.clipAction(clip);
          action.reset();
          action.setLoop(THREE.LoopOnce, 1);
          action.clampWhenFinished = true;
          return action;
        });
        let finishedCount = 0;
        actions.forEach(action => {
          action.play();
          action._hasFinished = false;
        });
        mixer.addEventListener('finished', () => {
          finishedCount++;
          if (finishedCount === actions.length) {
            setTimeout(() => {
              finishedCount = 0;
              actions.forEach(action => {
                action.reset();
                action.play();
              });
            }, 5000);
          }
        });
      }
    },
    undefined,
    err => console.error('Erreur GLTF animé:', err)
  );

  // === Spotlights animés classiques ===
  const spot1 = new THREE.SpotLight(0xfff6e0, 0.7, 40, Math.PI / 7, 0.28, 1);
  spot1.position.set(-6, 18, 0);
  spot1.target.position.set(0, 0, 0);
  spot1.castShadow = true;
  spot1.shadow.mapSize.width = 2048;
  spot1.shadow.mapSize.height = 2048;
  spot1.shadow.radius = 6;
  spot1.shadow.bias = -0.0012;
  spot1.shadow.blurSamples = 6;
  spot1.penumbra = 0.3;
  animatedScene.add(spot1);
  animatedScene.add(spot1.target);

  const spot2 = new THREE.SpotLight(0x80aaff, 0.5, 40, Math.PI / 8, 0.32, 1);
  spot2.position.set(6, 18, 0);
  spot2.target.position.set(0, 0, 0);
  spot2.castShadow = true;
  spot2.shadow.mapSize.width = 2048;
  spot2.shadow.mapSize.height = 2048;
  spot2.shadow.radius = 6;
  spot2.shadow.bias = -0.0012;
  spot2.shadow.blurSamples = 6;
  spot2.penumbra = 0.3;
  animatedScene.add(spot2);
  animatedScene.add(spot2.target);

  let spotTime = 0;

  window.addEventListener('resize', () => {
    animatedCamera.aspect = animatedContainer.clientWidth / animatedContainer.clientHeight;
    animatedCamera.updateProjectionMatrix();
    animatedRenderer.setSize(animatedContainer.clientWidth, animatedContainer.clientHeight);
  });

  function animateAnimated() {
    requestAnimationFrame(animateAnimated);
    if (mixer) mixer.update(0.016);
    // Animation des spots gauche-droite
    spotTime += 0.016;
    const amplitude = 6;
    const speed = 1.2;
    spot1.position.x = -amplitude * Math.cos(spotTime * speed);
    spot2.position.x = amplitude * Math.cos(spotTime * speed);
    animatedRenderer.render(animatedScene, animatedCamera);
  }
  animateAnimated();
}
