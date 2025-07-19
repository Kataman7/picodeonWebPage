import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const AtmThreeAnimatedViewer = () => {
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

    // Camera setup (top view)
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 10, 0)
    camera.up.set(0, 0, -1)
    camera.lookAt(0, 0, 0)

    // Renderer setup with transparent background
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      premultipliedAlpha: false
    })
    renderer.setClearColor(0x000000, 0) // Transparent background
    renderer.setPixelRatio(Math.max(window.devicePixelRatio, 2))
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.shadowMap.enabled = false // Pas d'ombres
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Éclairage amélioré pour plus de luminosité
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8) // Plus lumineux
    scene.add(ambientLight)

    // Lumière directionnelle principale
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.2)
    directionalLight1.position.set(10, 18, 8)
    scene.add(directionalLight1)

    // Lumière directionnelle secondaire
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight2.position.set(-10, 18, -8)
    scene.add(directionalLight2)

    // Lumière du haut pour bien éclairer
    const topLight = new THREE.DirectionalLight(0xffffff, 0.6)
    topLight.position.set(0, 20, 0)
    scene.add(topLight)

    // Spotlights animés pour l'effet mais sans ombres
    const spot1 = new THREE.SpotLight(0xfff6e0, 0.8, 40, Math.PI / 7, 0.28, 1)
    spot1.position.set(-6, 18, 0)
    spot1.target.position.set(0, 0, 0)
    spot1.castShadow = false
    spot1.penumbra = 0.3
    scene.add(spot1)
    scene.add(spot1.target)

    const spot2 = new THREE.SpotLight(0x80aaff, 0.6, 40, Math.PI / 8, 0.32, 1)
    spot2.position.set(6, 18, 0)
    spot2.target.position.set(0, 0, 0)
    spot2.castShadow = false
    spot2.penumbra = 0.3
    scene.add(spot2)
    scene.add(spot2.target)

    // Load animated model
    const loader = new GLTFLoader()
    loader.load(
      '/assets/models/picodeon-animated.glb',
      (gltf) => {
        const animatedModel = gltf.scene
        animatedModel.position.z = -5
        scene.add(animatedModel)
        modelRef.current = animatedModel

        // Pas d'ombres sur le modèle
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
    const targetFPS = 30 // Plus fluide
    const frameDuration = 1000 / targetFPS
    let lastFrame = 0
    let spotTime = 0

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)
      const now = performance.now()
      if (now - lastFrame < frameDuration) return
      lastFrame = now

      if (mixerRef.current) {
        const anyPlaying = actionsRef.current.some(a => a.isRunning())
        if (anyPlaying) mixerRef.current.update(0.016)
      }

      // Animate spotlights
      spotTime += 0.016
      const amplitude = 8
      const speed = 0.7
      spot1.position.x = -amplitude * Math.cos(spotTime * speed)
      spot2.position.x = amplitude * Math.cos(spotTime * speed)

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
    <div className="bg-stone-800 py-2">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="h-96 md:h-[500px] bg-stone-800 rounded-lg overflow-hidden relative"
          id="animated-viewer"
        >
          <div
            ref={mountRef}
            className="w-full h-full md:w-full md:h-full origin-center"
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-stone-800 bg-opacity-90 z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                <div className="text-white">Chargement de l'animation 3D...</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AtmThreeAnimatedViewer
