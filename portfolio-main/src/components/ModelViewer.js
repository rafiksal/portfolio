import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'

function Model({ url }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

export default function ModelViewer({ modelUrl }) {
  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <Model url={modelUrl} />
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls autoRotate />
      </Canvas>
    </div>
  )
}

