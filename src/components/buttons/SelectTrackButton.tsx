"use client";

import React from "react";
import {RootState} from "@/lib/store";
import {useDispatch, useSelector} from "react-redux";
import {toggleTrackSelection} from "@/lib/store/slices/tracksSlice";

type SelectTrackInputProps = {
    trackId: string;
};

/**
 *
 * @param trackId
 * @constructor
 */
const SelectTrackInput = ({trackId}: SelectTrackInputProps) => {
    const dispatch = useDispatch();
    const {selectedTrackIds, selectionModeEnabled} = useSelector((state: RootState) => state.tracks);

    const isSelected = selectedTrackIds.includes(trackId);

    const handleChange = () => {
        dispatch(toggleTrackSelection(trackId));
    };

    if (!selectionModeEnabled) return null;

    return (
        /*TODO data-testid="track-checkbox-{id}" - Checkbox for individual track*/
        <input
            type="checkbox"
            checked={isSelected}
            onChange={handleChange}
            data-testid={`track-checkbox-${trackId}`}
            className="absolute top-2 right-2 h-5 w-5 cursor-pointer accent-green-600"
        />
    );
};

export default SelectTrackInput;
