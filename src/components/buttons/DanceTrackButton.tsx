'use client';

import React from 'react';
import classNames from "classnames";
import {useDispatch} from 'react-redux';

import {BeakerIcon} from "@heroicons/react/20/solid";

import {AppDispatch} from "@/lib/store";
import {toggleDanceMode} from "@/lib/store/slices/tracksSlice";

type DanceTrackButton = {
    className?: string;
};

/**
 *
 * @param track
 * @param className
 * @constructor
 */
const DanceTrackButton = ({ className}: DanceTrackButton) => {
    const dispatch = useDispatch<AppDispatch>();

    const playSelectedTrack = () => {
        dispatch(toggleDanceMode());
    };

    return (
        <div className="col-span-1 flex justify-center">
            <button
                onClick={playSelectedTrack}
                className={classNames(className, "px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition transform hover:scale-105 cursor-pointer")}
            >
                <BeakerIcon className="h-5 w-5"/>
            </button>
        </div>
    );
};

export default DanceTrackButton;
