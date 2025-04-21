'use client';

import classNames from "classnames";

import {useState} from 'react';
import {useDispatch} from "react-redux";
import {useRouter} from 'next/navigation';
import {TrashIcon} from '@heroicons/react/20/solid';

import {deleteTrack} from "@/lib/client/apiTracks";
import {openModal} from "@/lib/store/slices/modalSlice";

/**
 *
 * @param trackId
 * @param className
 * @constructor
 */
const DeleteTrackButton = ({trackId, className}: { trackId: string | undefined, className: string | undefined }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleConfirmDelete = () => {
        handleDelete();
        console.log('Item deleted');
    };

    const handleCancelDelete = () => {
        console.log('Delete canceled');
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteTrack(trackId);
            router.push('/tracks');
        } catch (error) {
            console.error('Error deleting track:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const openConfirmDeleteModal = () => {
        dispatch(openModal({
            modalType: 'CONFIRM', modalProps: {
                onConfirm: handleConfirmDelete, onCancel: handleCancelDelete
            }
        }));
    };

    return (
        /*TODO Elements should indicate loading state via data-loading="true" attribute
            Disabled elements during loading should use both disabled attribute and aria-disabled="true"*/
        /*TODO data-testid="delete-track-{id}" - Delete button for a specific track*/
        <button
            disabled={isDeleting}
            onClick={openConfirmDeleteModal}
            aria-label="Delete Track"
            data-testid={`delete-track-${trackId}`}
            data-loading={isDeleting ? "true" : "false"}
            aria-disabled={isDeleting}
            className={classNames(className, "p-2 bg-red-600 text-white hover:bg-red-700 transition duration-300 cursor-pointer")}
        >
            <TrashIcon className="h-5 w-5"/>
        </button>
    );
};

export default DeleteTrackButton;