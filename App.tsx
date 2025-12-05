import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { AITutor } from './components/AITutor';
import { Footer } from './components/Footer';
import { mockSignIn } from './services/firebase';
import Particles from './components/Particles';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  const handleLogin = async () => {
    // In production, call signInWithGoogle from firebase.ts
    const userData = await mockSignIn();
    setUser(userData);
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-[#071024]">
      {/* Global Background Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={['#ffffff', '#06B6D4']}
          particleCount={250}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex flex-col flex-grow">
        <Navbar onLogin={handleLogin} user={user} />
        <main className="flex-grow">
          <Hero onLogin={handleLogin} />
          <Features />
          <HowItWorks />
          <AITutor />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;