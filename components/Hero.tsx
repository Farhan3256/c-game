import React, { Suspense, useState, useCallback } from 'react';
import { VoxelScene } from './VoxelScene';
import { Play, ArrowRight } from 'lucide-react';

export const Hero: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [cameraPos, setCameraPos] = useState<[number, number, number]>([8, 6, 8]);

  const handleCameraChange = useCallback((pos: [number, number, number]) => {
    setCameraPos(pos);
  }, []);

  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden min-h-[800px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Column: Text and UI Controls */}
          <div className="mb-12 lg:mb-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-[#06B6D4]/30 bg-[#06B6D4]/10 mb-6">
              <span className="text-[#06B6D4] text-xs font-bold uppercase tracking-wide">Beta Access Open</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Build your world with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB703] to-[#ffda7a]">
                C++ Code
              </span>
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed">
              CodeCraft combines the creativity of voxel building with the power of systems programming. Learn memory management, pointers, and algorithms by constructing your own 3D island.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onLogin}
                className="flex items-center justify-center gap-2 bg-[#FFB703] text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#ffc94d] transition-all shadow-[0_4px_0_rgb(180,120,0)] active:translate-y-[4px] active:shadow-none"
              >
                Start Coding
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="flex items-center justify-center gap-2 bg-white/5 text-white border border-white/10 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
                <Play className="w-5 h-5 fill-current" />
                Watch Demo
              </button>
            </div>
          </div>
          
          {/* Right Column: 3D Scene Area */}
          <div className="relative h-[500px] lg:h-[600px] w-full rounded-2xl border-2 border-[#06B6D4]/30 bg-[#071024]/50 shadow-2xl overflow-hidden backdrop-blur-sm">
            {/* Overlay HUD */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <div className="inline-block border border-[#06B6D4]/50 bg-[#0a1630]/90 rounded p-3 backdrop-blur-md shadow-lg">
                    <div className="font-mono text-xs text-[#06B6D4] space-y-1">
                        <p>POS: <span className="text-white">[{cameraPos[0]}, {cameraPos[1]}, {cameraPos[2]}]</span></p>
                        <p>MEM: <span className="text-[#22c55e]">128MB OK</span></p>
                    </div>
                </div>
            </div>

            <Suspense fallback={<div className="flex items-center justify-center h-full text-[#06B6D4] font-mono animate-pulse">Initializing Voxel Engine...</div>}>
              <VoxelScene onCameraChange={handleCameraChange} />
            </Suspense>
          </div>
        </div>
      </div>
      
      {/* Background decoration - keep subtle gradients but reduce opacity to let particles show */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-[#06B6D4] opacity-5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-[#FFB703] opacity-5 blur-[100px] rounded-full pointer-events-none"></div>
    </section>
  );
};