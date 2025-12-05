import React from 'react';
import { Github, Twitter, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-[#050b1a]/90 border-t border-gray-800 pt-16 pb-8 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <Terminal className="h-6 w-6 text-[#FFB703]" />
                            <span className="text-lg font-bold font-mono text-white">
                                Code<span className="text-[#06B6D4]">Craft</span>
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm">
                            Building the next generation of systems engineers through immersive voxel gameplay.
                        </p>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-white mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-[#FFB703]">Features</a></li>
                            <li><a href="#" className="hover:text-[#FFB703]">Pricing</a></li>
                            <li><a href="#" className="hover:text-[#FFB703]">For Schools</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-white mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-[#FFB703]">Documentation</a></li>
                            <li><a href="#" className="hover:text-[#FFB703]">C++ Cheatsheet</a></li>
                            <li><a href="#" className="hover:text-[#FFB703]">Community</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-white mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-[#FFB703]">Privacy</a></li>
                            <li><a href="#" className="hover:text-[#FFB703]">Terms</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-600 text-sm mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} CodeCraft Learning Inc. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-white"><Github className="w-5 h-5" /></a>
                        <a href="#" className="text-gray-400 hover:text-white"><Twitter className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};