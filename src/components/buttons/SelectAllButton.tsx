"use client";

import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {BarsArrowUpIcon, BarsArrowDownIcon} from "@heroicons/react/20/solid";

import {RootState} from "@/lib/store";
import {toggleTrackSelection} from "@/lib/store/slices/tracksSlice";

type SelectAllButtonProps = {
    allTrackIds: string[];
};

/**
 *
 * @param allTrackIds
 * @constructor
 */
const SelectAllButton = ({allTrackIds}: SelectAllButtonProps) => {
    const dispatch = useDispatch();
    const {selectedTrackIds, selectionModeEnabled} = useSelector((state: RootState) => state.tracks);

    if (!selectionModeEnabled || allTrackIds.length === 0) return null;

    const areAllSelected = allTrackIds.every(id => selectedTrackIds.includes(id));

    const handleClick = () => {
        allTrackIds.forEach(id => {
            const isSelected = selectedTrackIds.includes(id);
            if (areAllSelected && isSelected) {
                dispatch(toggleTrackSelection(id));
            } else if (!areAllSelected && !isSelected) {
                dispatch(toggleTrackSelection(id));
            }
        });
    };

    return (
        /*TODO data-testid="select-all" - Select all checkbox*/
        <button
            onClick={handleClick}
            data-testid="select-all"
            className="px-4 py-2 bg-gray-600 text-white rounded shadow hover:bg-gray-700 transition transform hover:scale-105 cursor-pointer"
        >
            {areAllSelected ? <BarsArrowDownIcon className="h-5 w-5"/>
                : <BarsArrowUpIcon className="h-5 w-5"/>
            }
        </button>
    );
};

export default SelectAllButton;
