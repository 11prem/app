import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    const initVanta = () => {
      if (window.VANTA && window.THREE && vantaRef.current && !vantaEffect.current) {
        vantaEffect.current = window.VANTA.NET({
          el: vantaRef.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: isMobile ? 0.5 : 0.8,
          scaleMobile: 0.5,
          color: 0x02d3e6,
          backgroundColor: 0x0a192f,
          points: isMobile ? 7.00 : 10.00,
          maxDistance: isMobile ? 15.00 : 25.00,
          spacing: isMobile ? 25.00 : 20.00,
          showDots: false
        });
      } else if (!window.VANTA) {
        setTimeout(initVanta, 100);
      }
    };

    initVanta();

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return <div ref={vantaRef} className="fixed inset-0 z-0" />;
};

export default AnimatedBackground;
