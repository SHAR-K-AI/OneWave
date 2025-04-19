'use client';

import AppImage from '@/components/AppImage';
import React, { useEffect, useState } from 'react';

const images = [
    '/images/shark-dance.gif',
    '/images/twerk-shark.gif',
    '/images/sound-shark.gif',
    '/images/wave.gif',
    '/images/many-shark.gif',
];

/**
 *
 * @constructor
 */
const SharkDanceImage = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <AppImage
            width={500}
            height={500}
            key={images[index]}
            alt="Shark in action"
            src={images[index]}
            className="max-h-full w-auto absolute top-0 right-50 mr-auto transition-transform duration-500 transform hover:scale-105 animate-fadeIn cursor-pointer m-auto"
        />
    );
};

export default SharkDanceImage;
