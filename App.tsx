
import React, { useState, useEffect } from 'react';
import LandingPage from './pages/HomePage'; 
import CustomCursor from './components/CustomCursor';
import CRTToggle from './components/CRTToggle';

const App: React.FC = () => {
  const [crtEnabled, setCrtEnabled] = useState(true);

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
            SYS.VER: TL.2.0.8-A
        </div>
        <CRTToggle value={crtEnabled} onChange={setCrtEnabled} />
      </div>

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
