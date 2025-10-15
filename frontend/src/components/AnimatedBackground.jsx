import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    let vantaEffect = null;

    // Wait for Vanta to load from CDN
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
          scale: 1.00,
          scaleMobile: 0.8,
          color: 0x02d3e6,        // Bright teal for lines
          backgroundColor: 0x0a192f, // Dark navy background
          points: 12.00,           // Reduced for better performance
          maxDistance: 28.00,      // Good connectivity
          spacing: 15.00,          // Balanced spacing
          showDots: false          // Clean lines only
        });
      } else {
        // Retry if libraries haven't loaded yet
        setTimeout(initVanta, 100);
      }
    };

    // Start initialization
    initVanta();

    // Cleanup function
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  );
};

export default AnimatedBackground;
