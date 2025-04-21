import React from "react";
import { useDispatch } from 'react-redux';
import {Cog8ToothIcon} from "@heroicons/react/20/solid";
import {toggleSelectionMode} from "@/lib/store/slices/tracksSlice";

/**
 *
 * @constructor
 */
export default function SelectionToggleButton() {
    const dispatch = useDispatch();

    return (
        /*TODO data-testid="select-mode-toggle" - Toggle for selection mode*/
        <button
            data-testid="select-mode-toggle"
            onClick={() => dispatch(toggleSelectionMode())}
            className="px-4 py-2 bg-yellow-600 text-white rounded shadow hover:bg-yellow-700 transition transform hover:scale-105 cursor-pointer"
        >
            <Cog8ToothIcon className="h-5 w-5"/>
        </button>
    );
}
