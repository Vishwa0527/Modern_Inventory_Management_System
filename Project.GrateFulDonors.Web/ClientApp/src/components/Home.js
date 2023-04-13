import lottie from 'lottie-web';
import React, { useRef, useEffect } from 'react';

export default function Home() {
  const animationContainer = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../animation.json')
    });
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <div
        ref={animationContainer}
        style={{
          height: '500px',
          width: '500px'
        }}
      ></div>
    </div>
  );
}
