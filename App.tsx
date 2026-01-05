
import React, { useState, useEffect } from 'react';
import LandingPage from './pages/HomePage'; 
import CustomCursor from './components/CustomCursor';
import CRTToggle from './components/CRTToggle';
import BackgroundMusic from './components/BackgroundMusic';

const App: React.FC = () => {
  const [crtEnabled, setCrtEnabled] = useState(true);
  
  // Audio State
  const [bgmPlaying, setBgmPlaying] = useState(true);
  const [bgmVolume, setBgmVolume] = useState(0.12);
  const audioSources = ["https://lz.qaiu.top/parser?url=https://sbcnm.lanzoum.com/ilf0y3f5dxmh"];

  // Initialize CRT effect
  useEffect(() => {
    if (crtEnabled) {
      document.body.classList.add('crt-enabled');
    } else {
      document.body.classList.remove('crt-enabled');
    }
  }, [crtEnabled]);

  return (
    <>
      <CustomCursor />
      
      {/* Top Controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-4">
        <div className="hidden md:block px-3 py-2 border border-void-gray/30 bg-black/50 backdrop-blur-sm text-[10px] text-void-gray font-alim">
            SYS.VER: TL.2.0.9-C
        </div>
        <CRTToggle value={crtEnabled} onChange={setCrtEnabled} />
      </div>

      {/* Global Floating BGM Control */}
      <BackgroundMusic 
        floating
        isPlaying={bgmPlaying}
        onToggle={() => setBgmPlaying(!bgmPlaying)}
        volume={bgmVolume}
        onVolumeChange={setBgmVolume}
        audioSources={audioSources}
        trackTitle="Abstract Glass Menu"
        trackComposer="System Audio"
      />

      <div className="min-h-screen w-full bg-void-black text-void-light font-alim selection:bg-white selection:text-black relative overflow-x-hidden">
        {/* Global Grain Overlay */}
        <div className="grain-overlay"></div>
        
        {/* Main Content */}
        <LandingPage />
      </div>
    </>
  );
};

export default App;
