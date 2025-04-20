'use client';

import React from "react";
import classNames from 'classnames';
import {useDispatch} from 'react-redux';

import {openModal} from '@/lib/store/slices/modalSlice';
import {PlusCircleIcon} from "@heroicons/react/20/solid";

type CreateTrackButtonProps = {
    className?: string;
};

/**
 *
 * @param className
 * @constructor
 */
export default function CreateTrackButton({className}: CreateTrackButtonProps) {
    const dispatch = useDispatch();

    const createTrack = () => {
        dispatch(openModal({
            modalType: 'CREATE_TRACK',
        }));
    };

    return (
        <button
            onClick={createTrack}
            data-testid="create-track-button"
            className={
                classNames(
                    className, "px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition transform hover:scale-105 cursor-pointer")
            }
        >
            <PlusCircleIcon className="h-5 w-5"/>
        </button>
    );
}
