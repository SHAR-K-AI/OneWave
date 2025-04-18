"use client"

import Image from 'next/image'
import { useState } from 'react'

type Props = {
    src?: string | null
    alt: string
    width?: number
    height?: number
    className?: string
}

const defaultImage = '/images/noimage.gif'

export default function AppImage({
                                     src,
                                     alt,
                                     width = 200,
                                     height = 200,
                                     className = '',
                                 }: Props) {
    const [imgSrc, setImgSrc] = useState(src || defaultImage)

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
