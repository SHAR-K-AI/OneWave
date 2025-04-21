"use client";

import Image from 'next/image';
import {useState, useEffect} from 'react';

type AppImage = {
    src?: string | null
    alt: string
    width?: number
    height?: number
    className?: string
}

const defaultImage = '/images/noimage.gif';

const isValidSrc = (src: string | null | undefined): boolean => {
    if (typeof src !== 'string' || src.trim() === '') return false;

    try {
        new URL(src)
        return true;
    } catch {
        return src.startsWith('/');
    }
}

/**
 *
 * @param src
 * @param alt
 * @param width
 * @param height
 * @param className
 * @constructor
 */
export default function AppImage(
    {
        src,
        alt,
        width = 200,
        height = 200,
        className = '',
    }: AppImage
) {
    const [imgSrc, setImgSrc] = useState(isValidSrc(src) ? src! : defaultImage);

    useEffect(() => {
        setImgSrc(isValidSrc(src) ? src! : defaultImage);
    }, [src])

    return (
        <Image
            src={imgSrc}
            alt={alt}
            width={width}
            height={height}
            className={className}
            onError={() => setImgSrc(defaultImage)}
        />
    )
}
