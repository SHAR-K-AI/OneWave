'use client';

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
        // eslint-disable-next-line @next/next/no-img-element
        <img
            width={500}
            height={500}
            key={images[index]}
            src={images[index]}
            alt="Shark in action"
            className="w-64 h-64 object-cover rounded-full m-auto transition-all duration-300 group-hover:shadow-lg group-hover:rotate-4"
        />
    );
};

export default SharkDanceImage;
