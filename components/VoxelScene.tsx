import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

// Add missing type declarations for React Three Fiber elements
// Augment the global JSX namespace
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      boxGeometry: any;
      meshStandardMaterial: any;
      lineSegments: any;
      edgesGeometry: any;
      lineBasicMaterial: any;
      group: any;
      ambientLight: any;
      directionalLight: any;
      pointLight: any;
      circleGeometry: any;
      meshBasicMaterial: any;
      color: any;
    }
  }
}

// Augment React's internal JSX namespace for newer React versions
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      boxGeometry: any;
      meshStandardMaterial: any;
      lineSegments: any;
      edgesGeometry: any;
      lineBasicMaterial: any;
      group: any;
      ambientLight: any;
      directionalLight: any;
      pointLight: any;
      circleGeometry: any;
      meshBasicMaterial: any;
      color: any;
    }
  }
}

const VoxelBlock: React.FC<{ position: [number, number, number]; color: string }> = ({ position, color }) => {
  // Optimize: create geometry once for edges to avoid recreating on every render
  const edgeGeometry = useMemo(() => new THREE.BoxGeometry(0.95, 0.95, 0.95), []);

  return (
    <mesh position={position}>
      <boxGeometry args={[0.95, 0.95, 0.95]} />
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
      {/* Edge highlight for voxel look */}
      <lineSegments>
        <edgesGeometry args={[edgeGeometry]} />
        <lineBasicMaterial color="black" linewidth={2} opacity={0.2} transparent />
      </lineSegments>
    </mesh>
  );
};

const InteractiveBlock: React.FC<{ position: [number, number, number]; color: string; message: string }> = ({ position, color, message }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Base animation
      const t = state.clock.getElapsedTime();
      
      // Proximity check
      const dist = state.camera.position.distanceTo(meshRef.current.position);
      const isClose = dist < 6;

      // Animation logic
      if (active) {
        // Floating high when active
        meshRef.current.position.y = position[1] + 0.5 + Math.sin(t * 5) * 0.1;
        meshRef.current.rotation.y += 0.05;
      } else if (isClose) {
        // "Excited" wiggle when camera is close
        meshRef.current.rotation.z = Math.sin(t * 10) * 0.1;
        meshRef.current.rotation.y += 0.02;
        meshRef.current.position.y = position[1] + 0.2;
      } else {
        // Idle
        meshRef.current.rotation.y += 0.005;
        meshRef.current.position.y = position[1] + Math.sin(t) * 0.05;
      }

      // Scale effect on hover
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        position={[position[0], position[1], position[2]]}
        onClick={(e) => { e.stopPropagation(); setActive(!active); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
      >
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial 
            color={active ? '#FFB703' : color} 
            emissive={active ? '#FFB703' : '#000000'}
            emissiveIntensity={active ? 0.5 : 0}
            roughness={0.2}
        />
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(0.4, 0.4, 0.4)]} />
          <lineBasicMaterial color="white" transparent opacity={0.5} />
        </lineSegments>
      </mesh>
      
      {active && (
        <Html position={[position[0], position[1] + 1.5, position[2]]} center distanceFactor={12} zIndexRange={[100, 0]}>
          <div className="bg-[#0a1630]/95 border border-[#FFB703] text-[#FFB703] px-3 py-2 rounded-md text-xs font-mono whitespace-nowrap shadow-[0_0_15px_rgba(255,183,3,0.3)] backdrop-blur-md transform transition-all animate-in fade-in zoom-in duration-200">
             <span className="text-[#06B6D4] mr-2">❯</span>
             {message}
          </div>
        </Html>
      )}
    </group>
  );
};

const Island: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Very slow base rotation for the whole island
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
    }
  });

  const voxels = useMemo(() => {
    const blocks: Array<{ pos: [number, number, number]; color: string }> = [];
    const size = 3;
    
    // Generate a simple island shape
    for (let x = -size; x <= size; x++) {
      for (let z = -size; z <= size; z++) {
        // Base layer
        if (x * x + z * z < size * size + 2) {
          blocks.push({ pos: [x, 0, z], color: '#3b82f6' }); // Water/Base
          if (x * x + z * z < size * size - 3) {
             blocks.push({ pos: [x, 1, z], color: '#22c55e' }); // Grass
             if (Math.random() > 0.8) {
               blocks.push({ pos: [x, 2, z], color: '#4ade80' }); // Tall Grass
             }
          }
        }
      }
    }
    
    // Add a "C++" monolith
    blocks.push({ pos: [0, 2, 0], color: '#FFB703' });
    blocks.push({ pos: [0, 3, 0], color: '#FFB703' });
    blocks.push({ pos: [0, 4, 0], color: '#FFB703' });
    
    return blocks;
  }, []);

  return (
    <group ref={groupRef}>
      {voxels.map((v, i) => (
        <VoxelBlock key={i} position={v.pos} color={v.color} />
      ))}
      
      {/* Floating particles/bits */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <VoxelBlock position={[2.5, 3, 2.5]} color="#06B6D4" />
        <VoxelBlock position={[-2.5, 4, -2]} color="#06B6D4" />
      </Float>

      {/* Interactive Elements */}
      <InteractiveBlock position={[2.5, 1.5, -2]} color="#ef4444" message="int* ptr = &magic;" />
      <InteractiveBlock position={[-2.5, 1.5, 2]} color="#a855f7" message="struct Loot { int gold; };" />
      <InteractiveBlock position={[0, 5, 0]} color="#06B6D4" message="std::cout << 'Found me!';" />
    </group>
  );
};

// Component to track camera position and report back to parent
const CameraTracker: React.FC<{ onChange: (pos: [number, number, number]) => void }> = ({ onChange }) => {
  const { camera } = useThree();
  const prevPos = useRef<string>('');

  useFrame(() => {
    const x = Math.round(camera.position.x);
    const y = Math.round(camera.position.y);
    const z = Math.round(camera.position.z);
    const currentPos = `${x},${y},${z}`;

    if (currentPos !== prevPos.current) {
      prevPos.current = currentPos;
      onChange([x, y, z]);
    }
  });

  return null;
};

interface VoxelSceneProps {
  onCameraChange?: (pos: [number, number, number]) => void;
}

export const VoxelScene: React.FC<VoxelSceneProps> = ({ onCameraChange }) => {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas camera={{ position: [8, 6, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -5]} color="#06B6D4" intensity={0.5} />
        <Island />
        <OrbitControls enableZoom={true} enablePan={true} autoRotate={false} />
        {onCameraChange && <CameraTracker onChange={onCameraChange} />}
      </Canvas>
    </div>
  );
};
