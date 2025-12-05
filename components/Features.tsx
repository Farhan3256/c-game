import React from 'react';
import { Gamepad2, Cpu, Bot, Code2 } from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    id: 'gamified',
    title: 'Play to Learn',
    description: 'Solve puzzles by writing real C++ code. Your functions control the environment, move blocks, and optimize resources.',
    icon: <Gamepad2 className="w-8 h-8 text-[#FFB703]" />,
  },
  {
    id: 'ai-feedback',
    title: 'AI Feedback',
    description: 'Stuck on a segmentation fault? Our Gemini-powered AI tutor analyzes your code instantly and explains bugs in plain English.',
    icon: <Bot className="w-8 h-8 text-[#06B6D4]" />,
  },
  {
    id: 'compiler',
    title: 'In-Browser Compiler',
    description: 'No setup required. We use WebAssembly to compile and run C/C++ code directly in your browser with near-native speed.',
    icon: <Cpu className="w-8 h-8 text-[#FFB703]" />,
  },
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-[#0a1630]/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Master Systems Programming</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Forget boring textbooks. CodeCraft immerses you in a world where code is the only tool you need to survive and build.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="bg-[#071024]/60 p-8 rounded-xl border border-gray-800 hover:border-[#06B6D4]/50 transition-all hover:translate-y-[-4px] group backdrop-blur-sm">
              <div className="bg-gray-800/50 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#06B6D4]/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Teacher/Admin Feature Card */}
        <div className="mt-12 bg-gradient-to-r from-[#071024]/80 to-[#0f1d3a]/80 rounded-2xl p-8 border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md">
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                    <Code2 className="w-6 h-6 text-[#06B6D4]" />
                    <h3 className="text-xl font-bold text-white">For Educators</h3>
                </div>
                <p className="text-gray-400 mb-4">
                    Monitor student progress, assign custom voxel challenges, and review code automatically with our admin dashboard.
                </p>
                <a href="#" className="text-[#FFB703] font-semibold hover:underline decoration-2 underline-offset-4">
                    View Teacher Tools &rarr;
                </a>
            </div>
            <div className="w-full md:w-1/3 h-32 bg-gray-900/50 rounded-lg border border-gray-700 flex items-center justify-center font-mono text-xs text-gray-500">
                [Admin Dashboard Preview]
            </div>
        </div>
      </div>
    </section>
  );
};