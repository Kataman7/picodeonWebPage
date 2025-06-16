import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const container = document.getElementById('viewer');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
camera.position.set(0, 0, 20); // Centré verticalement

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
// Amélioration de la netteté du rendu
renderer.setPixelRatio(Math.max(window.devicePixelRatio, 2));
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.shadowMap.enabled = true;
container.appendChild(renderer.domElement);

// Ajout OrbitControls pour le viewer 1
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.target.set(0, 0, 0); // Garde le modèle centré
controls.enablePan = false;
controls.enableZoom = false;
controls.minPolarAngle = Math.PI / 2;
controls.maxPolarAngle = Math.PI / 2;
controls.minAzimuthAngle = -Infinity;
controls.maxAzimuthAngle = Infinity;
controls.update();

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
    model.position.y = -6; // replacer le modèle à y=0
    scene.add(model); },
  undefined,
  err => console.error('Erreur GLTF:', err)
);

window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});

// === OPTIMISATIONS PERFORMANCE ===
function isMobile() {
  return window.innerWidth < 800 || /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

// Limite le pixelRatio sur mobile
const maxPixelRatio = isMobile() ? 1.2 : 2;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));

// Désactive les ombres sur mobile
if (isMobile()) {
  renderer.shadowMap.enabled = false;
  spotLight1.castShadow = false;
  spotLight2.castShadow = false;
}

// Limite le framerate à 30 FPS sur tous les appareils
let lastFrame = 0;
function animate() {
  requestAnimationFrame(animate);
  const now = performance.now();
  if (now - lastFrame < 33) return; // ~30 FPS max
  lastFrame = now;
  if (mainViewerActive && model) {
    // plus de rotation automatique
  }
  controls.update();
  renderer.render(scene, camera);
}
animate();

// === Deuxième viewer animé sous le footer ===
const animatedContainer = document.getElementById('animated-viewer');
if (animatedContainer) {
  const animatedScene = new THREE.Scene();
  // Ajout d'une lumière ambiante pour le viewer animé
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  animatedScene.add(ambientLight);

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
      // SUPPRESSION de tout hideLoader ou animatedModelLoaded ici
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
    err => { console.error('Erreur GLTF animé:', err); }
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

  // === Utilisation d'une variable de frame séparée pour le viewer animé ===
  let lastAnimatedFrame = 0;
  function animateAnimated() {
    requestAnimationFrame(animateAnimated);
    const now = performance.now();
    if (now - lastAnimatedFrame < 33) return; // ~30 FPS max
    lastAnimatedFrame = now;
    if (animatedViewerActive && mixer) {
      mixer.update(0.016);
      spotTime += 0.016;
      // Animation des spotlights de droite à gauche
      const amplitude = 8; // distance de déplacement
      const speed = 0.7; // vitesse
      spot1.position.x = -amplitude * Math.cos(spotTime * speed);
      spot2.position.x = amplitude * Math.cos(spotTime * speed);
    }
    animatedRenderer.render(animatedScene, animatedCamera);
  }
  animateAnimated();
}

// === Ajout d'un loader visuel ===
function showLoader() {
  let loader = document.getElementById('pk-loader');
  if (!loader) {
    loader = document.createElement('div');
    loader.id = 'pk-loader';
    loader.style.position = 'fixed';
    loader.style.top = 0;
    loader.style.left = 0;
    loader.style.width = '100vw';
    loader.style.height = '100vh';
    loader.style.background = 'var(--black, #222)';
    loader.style.display = 'flex';
    loader.style.alignItems = 'center';
    loader.style.justifyContent = 'center';
    loader.style.zIndex = 9999;
    loader.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;"><div style=\'font-family:"Tilt Neon",sans-serif;text-align:center;margin-bottom:2em;\'><div style=\'font-size:3.5em;letter-spacing:0.05em;line-height:1.2;margin-bottom:0.4em;color:#FAFAFA;\'>PicoKeebs</div><div style=\'font-size:1.2em;opacity:0.8;letter-spacing:0.02em;color:#FAFAFA;\'>Chargement de la page en cours...</div></div><img src="img/loading.gif" alt="Chargement..." style="width:180px;height:180px;display:block;"/></div>';
    document.body.appendChild(loader);
  } else {
    loader.style.display = 'flex';
  }
}
function hideLoader() {
  const loader = document.getElementById('pk-loader');
  if (loader) loader.style.display = 'none';
}

showLoader();

// === Chargement du modèle principal ===
let modelLoaded = false, animatedModelLoaded = false;
loader.load('picodeon.glb',
  gltf => { 
    if (!model) {
      model = gltf.scene;
      model.traverse(obj => {
        if (obj.isMesh) {
          obj.castShadow = true;
          obj.receiveShadow = true;
        }
      });
      model.position.y = 0;
      scene.add(model);
    }
    modelLoaded = true;
    hideLoader(); // On masque le loader dès que le viewer principal est chargé
  },
  undefined,
  err => { console.error('Erreur GLTF:', err); modelLoaded = true; hideLoader(); }
);

// === Gestion de la pause/reprise des viewers 3D selon la visibilité ===
var mainViewerActive = true;
var animatedViewerActive = true;
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0 &&
    rect.left < window.innerWidth &&
    rect.right > 0
  );
}
function checkViewersVisibility() {
  // Pause le main viewer si pas visible
  if (container) {
    const visible = isElementInViewport(container);
    mainViewerActive = visible;
  }
  // Pause le viewer animé si pas visible
  if (animatedContainer) {
    const visible = isElementInViewport(animatedContainer);
    animatedViewerActive = visible;
  }
}
window.addEventListener('scroll', checkViewersVisibility);
window.addEventListener('resize', checkViewersVisibility);
setInterval(checkViewersVisibility, 500);

// Pause l'animation si l'onglet est inactif
let pageActive = true;
document.addEventListener('visibilitychange', () => {
  pageActive = !document.hidden;
  mainViewerActive = pageActive && isElementInViewport(container);
  if (animatedContainer) animatedViewerActive = pageActive && isElementInViewport(animatedContainer);
});
