import lottie from 'lottie-web';
import React, { useEffect, useRef } from 'react';

function App() {
    const animationContainer = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: animationContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('./animation.json')
        })
    }, [])

    return (
        <div ref={animationContainer}></div>
    )
}