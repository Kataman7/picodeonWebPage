import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const AtmThreeViewer = () => {
  const mountRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const modelRef = useRef(null)
  const controlsRef = useRef(null)
  const animationIdRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 0, 20)

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

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.target.set(0, 0, 0)
    controls.enablePan = false
    controls.enableZoom = false
    controls.minPolarAngle = Math.PI / 2
    controls.maxPolarAngle = Math.PI / 2
    controls.minAzimuthAngle = -Infinity
    controls.maxAzimuthAngle = Infinity
    controls.update()
    controlsRef.current = controls

    // Amélioration de l'éclairage pour plus de luminosité
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6) // Plus lumineux
    scene.add(ambientLight)

    // Lumière directionnelle principale
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.0)
    directionalLight1.position.set(10, 10, 5)
    scene.add(directionalLight1)

    // Lumière directionnelle secondaire
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight2.position.set(-10, 5, -5)
    scene.add(directionalLight2)

    // Lumière de face pour bien éclairer le modèle
    const frontLight = new THREE.DirectionalLight(0xffffff, 0.5)
    frontLight.position.set(0, 0, 10)
    scene.add(frontLight)

    // Check if mobile and adjust settings
    const isMobile = () => {
      return window.innerWidth < 800 || /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)
    }

    const maxPixelRatio = isMobile() ? 1.2 : 2
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio))

    // Load model
    const loader = new GLTFLoader()
    loader.load(
      '/assets/models/picodeon.glb',
      (gltf) => {
        const model = gltf.scene
        model.traverse((obj) => {
          if (obj.isMesh) {
            obj.castShadow = false
            obj.receiveShadow = false
          }
        })
        model.position.y = -6
        scene.add(model)
        modelRef.current = model
        setIsLoading(false)
      },
      undefined,
      (error) => {
        console.error('Erreur GLTF:', error)
        setIsLoading(false)
      }
    )

    // Animation loop
    const targetFPS = 30 // Plus fluide
    const frameDuration = 1000 / targetFPS
    let lastFrame = 0

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)
      const now = performance.now()
      if (now - lastFrame < frameDuration) return
      lastFrame = now

      controls.update()
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
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden relative" id="viewer">
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-90 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <div className="text-gray-600">Chargement du modèle 3D...</div>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="absolute bottom-4 right-4 group">
          <div className="text-gray-500 hover:text-gray-700 text-lg opacity-60 hover:opacity-100 animate-spin transition-all duration-300 cursor-pointer" style={{animationDuration: '3s'}}>
            ⟲
          </div>
          <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-black bg-opacity-80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Faites tourner avec la souris
          </div>
        </div>
      )}
    </div>
  )
}

export default AtmThreeViewer
