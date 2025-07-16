import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const AtmThreeAnimatedViewerMobile = () => {
  const mountRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const modelRef = useRef(null)
  const mixerRef = useRef(null)
  const actionsRef = useRef([])
  const animationIdRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup (portrait)
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 17, 0)
    camera.up.set(0, 0, -1)
    camera.lookAt(0, 0, 0)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      premultipliedAlpha: false
    })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.max(window.devicePixelRatio, 2))
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.shadowMap.enabled = false
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.2)
    directionalLight1.position.set(10, 18, 8)
    scene.add(directionalLight1)
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight2.position.set(-10, 18, -8)
    scene.add(directionalLight2)
    const topLight = new THREE.DirectionalLight(0xffffff, 0.6)
    topLight.position.set(0, 20, 0)
    scene.add(topLight)

    // Load animated model
    const loader = new GLTFLoader()
    loader.load(
      '/assets/models/picodeon-animated.glb',
      (gltf) => {
        const animatedModel = gltf.scene
        animatedModel.position.z = 0
        // Décale le modèle sur X pour le centrer après rotation portrait
        animatedModel.position.x = -5
        animatedModel.rotation.y = Math.PI / 2
        scene.add(animatedModel)
        modelRef.current = animatedModel
        animatedModel.traverse((obj) => {
          if (obj.isMesh) {
            obj.castShadow = false
            obj.receiveShadow = false
          }
        })
        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(animatedModel)
          mixerRef.current = mixer
          const actions = gltf.animations.map(clip => {
            const action = mixer.clipAction(clip)
            action.reset()
            action.setLoop(THREE.LoopOnce, 1)
            action.clampWhenFinished = true
            return action
          })
          actionsRef.current = actions
          let finishedCount = 0
          actions.forEach(action => {
            action.play()
            action._hasFinished = false
          })
          mixer.addEventListener('finished', () => {
            finishedCount++
            if (finishedCount === actions.length) {
              setTimeout(() => {
                finishedCount = 0
                actions.forEach(action => {
                  action.reset()
                  action.play()
                })
              }, 5000)
            }
          })
        }
        setIsLoading(false)
      },
      undefined,
      (error) => {
        console.error('Erreur GLTF animé:', error)
        setIsLoading(false)
      }
    )

    // Animation loop
    const targetFPS = 30
    const frameDuration = 1000 / targetFPS
    let lastFrame = 0
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)
      const now = performance.now()
      if (now - lastFrame < frameDuration) return
      lastFrame = now
      if (mixerRef.current) {
        const anyPlaying = actionsRef.current.some(a => a.isRunning())
        if (anyPlaying) mixerRef.current.update(0.016)
      }
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div className="w-full h-[90vh] aspect-[9/16] bg-stone-800 overflow-hidden relative flex items-center justify-center" id="animated-viewer-mobile">
      <div ref={mountRef} className="w-full h-full" />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-90 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <div className="text-gray-600">Chargement de l'animation 3D...</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AtmThreeAnimatedViewerMobile
