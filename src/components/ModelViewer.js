import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PresentationControls, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContext';

// Simple cube model
const SimpleCube = () => {
  return (
    <mesh rotation={[0, Math.PI / 4, 0]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#3b82f6" />
    </mesh>
  );
};

const LoadingScreen = () => {
  const { darkMode } = useTheme();
  
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className={`w-16 h-16 rounded-full ${darkMode ? 'border-t-blue-500' : 'border-t-blue-700'} border-4 border-opacity-30`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

const ErrorDisplay = () => {
  const { darkMode } = useTheme();
  
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <div className={`text-lg ${darkMode ? 'text-red-400' : 'text-red-600'} mb-2`}>
        Unable to load 3D model
      </div>
      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Displaying fallback content
      </div>
    </div>
  );
};

const ModelViewer = ({ onError }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { darkMode } = useTheme();
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle errors
  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
    if (onError && typeof onError === 'function') {
      onError();
    }
  }, [onError]);

  return (
    <div className="relative w-full h-80 rounded-lg overflow-hidden">
      {isLoading && <LoadingScreen />}
      {hasError && <ErrorDisplay />}
      
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 50 }}
        shadows
        className={`${darkMode ? 'bg-gray-900' : 'bg-blue-100'}`}
        onError={handleError}
      >
        <Suspense fallback={null}>
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
          >
            <SimpleCube />
          </PresentationControls>
          
          <Environment preset="city" />
          <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={darkMode ? 0.4 : 0.2} 
            scale={10} 
            blur={2} 
            far={4} 
          />
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
        </Suspense>
      </Canvas>
      
      <div className={`absolute bottom-2 right-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};

export default ModelViewer;
