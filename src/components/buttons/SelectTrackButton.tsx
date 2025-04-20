"use client";

import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {CheckCircleIcon} from "@heroicons/react/20/solid";
import {toggleTrackSelection} from "@/lib/store/slices/tracksSlice";

type SelectTrackButton = {
    trackId: string;
};

/**
 *
 * @param trackId
 * @param selected
 * @constructor
 */
const SelectTrackButton = ({trackId}: SelectTrackButton) => {
    const dispatch = useDispatch();
    const selectedTrackIds = useSelector((state: { tracks: { selectedTrackIds: string[] } }) => state.tracks.selectedTrackIds);

    const toggleTrack = () => {
        dispatch(toggleTrackSelection(trackId));
    };

    const selected = selectedTrackIds.includes(trackId);

    return (
        <button
            onClick={toggleTrack}
            className="absolute top-2 right-2 cursor-pointer h-8 w-8"
        >
            {selected ? (
                <CheckCircleIcon className="h-8 w-8 text-green-600 hover:text-red-600"/>
            ) : (
                <CheckCircleIcon className="h-8 w-8 text-gray-300 hover:text-yellow-600"/>
            )}
        </button>
    );
};

export default SelectTrackButton;
