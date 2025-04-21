'use client';

import React from 'react';
import {useSelector} from "react-redux";

import {RootState} from "@/lib/store";
import {Track} from "@/lib/client/apiTracks";

import AppImage from "@/components/widgets/AppImage";
import SharkDanceImage from '@/components/widgets/SharkDanceImage';

type TrackImageProps = {
    track: Track;
};

/**
 *
 * @param dance
 * @param track
 * @constructor
 */
const TrackImage = ({track}: TrackImageProps) => {
    const {dance} = useSelector((state: RootState) => state.tracks);

    return (
        <div className="mb-4 w-full relative">
            {dance ? (
                <SharkDanceImage key={`dance-${track.coverImage}`}/>
            ) : (
                <AppImage
                    key={track.coverImage}
                    src={track.coverImage}
                    alt={track.title}
                    width={200}
                    height={200}
                    className="w-64 h-64 object-cover rounded-full m-auto transition-all duration-300 group-hover:shadow-lg group-hover:rotate-4"
                />
            )}
        </div>
    );
};

export default TrackImage;
