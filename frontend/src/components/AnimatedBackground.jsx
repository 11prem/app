import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    let vantaEffect = null;
    const isMobile = window.innerWidth < 768;
    
    const initVanta = () => {
      if (window.VANTA && window.THREE) {
        vantaEffect = window.VANTA.NET({
          el: vantaRef.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: isMobile ? 0.6 : 1.00,
          scaleMobile: 0.6,
          color: 0x02d3e6,
          backgroundColor: 0x0a192f,
          points: isMobile ? 6.00 : 12.00, // Reduce points on mobile
          maxDistance: isMobile ? 18.00 : 28.00, // Reduce distance on mobile
          spacing: isMobile ? 20.00 : 15.00,
          showDots: false
        });
      } else {
        setTimeout(initVanta, 100);
      }
    };

    initVanta();

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, []);

  return <div ref={vantaRef} className="fixed inset-0 z-0" />;
};

export default AnimatedBackground;
