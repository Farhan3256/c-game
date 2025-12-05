import React from 'react';
import { Step } from '../types';

const steps: Step[] = [
    { id: 1, title: 'Choose a Mission', description: 'Select a task, from building a bridge to sorting inventory using algorithms.' },
    { id: 2, title: 'Write C++ Code', description: 'Implement the logic in our editor. Use pointers, loops, and structs to control the world.' },
    { id: 3, title: 'Compile & Watch', description: 'Run your code. If it works, the voxel world updates in real-time. If not, debug with AI.' },
];

export const HowItWorks: React.FC = () => {
    return (
        <section id="how-it-works" className="py-20 bg-transparent relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-800 -z-10"></div>

                    {steps.map((step) => (
                        <div key={step.id} className="flex flex-col items-center text-center relative z-10">
                            <div className="w-24 h-24 bg-[#0a1630]/90 border-2 border-[#FFB703] rounded-full flex items-center justify-center text-2xl font-bold text-[#FFB703] mb-6 shadow-[0_0_20px_rgba(255,183,3,0.2)] backdrop-blur-sm">
                                {step.id}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-gray-400 max-w-xs">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};