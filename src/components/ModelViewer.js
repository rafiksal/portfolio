import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';

const ModelViewer = ({ modelUrl }) => {
  const Model = () => {
    const { scene } = useGLTF(modelUrl); // Load the GLB model
    return <primitive object={scene} />;
  };

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      {/* Add controls for interaction */}
      <OrbitControls />
      {/* Lighting and environment */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Environment preset="sunset" />
      {/* Render the model */}
      <Model />
    </Canvas>
  );
};

export default ModelViewer;
