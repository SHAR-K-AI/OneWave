'use client';

import React from 'react';
import classNames from "classnames";
import { useRouter } from 'next/navigation';
import {useDispatch, useSelector} from 'react-redux';

import {TrashIcon} from "@heroicons/react/20/solid";
import {openModal} from "@/lib/store/slices/modalSlice";

import {AppDispatch, RootState} from "@/lib/store";
import {deleteSelectedTracksAsync} from "@/lib/store/slices/tracksSlice";

type DeleteSelectedTracksButton = {
    className?: string;
};

/**
 *
 * @param className
 * @constructor
 */
const DeleteSelectedTracksButton = ({className}: DeleteSelectedTracksButton) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const {selectedTrackIds} = useSelector((state: RootState) => state.tracks);

    const handleConfirmDelete = () => {
        deleteSelectedTracks();
        router.refresh();
        console.log('Items deleted');
    };

    const handleCancelDelete = () => {
        console.log('Delete canceled');
    };

    const deleteSelectedTracks = () => {
        dispatch(deleteSelectedTracksAsync(selectedTrackIds));
    };

    const openConfirmDeleteModal = () => {
        dispatch(openModal({
            modalType: 'CONFIRM', modalProps: {
                onConfirm: handleConfirmDelete, onCancel: handleCancelDelete
            }
        }));
    };

    return (
        <div className="col-span-1 flex justify-center">
            <button
                onClick={openConfirmDeleteModal}
                disabled={selectedTrackIds.length === 0}
                className={classNames(className, "px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition transform hover:scale-105 cursor-pointer")}
            >
                <TrashIcon className="h-5 w-5"/>
            </button>
        </div>
    );
};

export default DeleteSelectedTracksButton;
