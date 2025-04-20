'use client';

import React from 'react';
import classNames from "classnames";
import {useDispatch} from 'react-redux';

import {getAudioFileUrl} from "@/helpers/audio";
import {SpeakerWaveIcon} from "@heroicons/react/20/solid";

import {AppDispatch} from "@/lib/store";
import {Track} from "@/lib/client/apiTracks";
import {play} from '@/lib/store/slices/playerSlice';

type PlayTrackButton = {
    track: Track;
    className?: string;
};

/**
 *
 * @param track
 * @param className
 * @constructor
 */
const PlayTrackButton = ({track, className}: PlayTrackButton) => {
    const dispatch = useDispatch<AppDispatch>();

    const playSelectedTrack = () => {
        dispatch(play());
    };

    return (
        <div className="col-span-1 flex justify-center">
            <button
                onClick={playSelectedTrack}
                className={classNames(className, "px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition transform hover:scale-105 cursor-pointer")}
            >
                <SpeakerWaveIcon className="h-5 w-5"/>
            </button>
        </div>
    );
};

export default PlayTrackButton;
