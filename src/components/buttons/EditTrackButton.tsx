'use client';

import Link from 'next/link';
import classNames from 'classnames';
import {useDispatch} from 'react-redux';

import {PencilIcon} from '@heroicons/react/24/solid';
import {openModal} from '@/lib/store/slices/modalSlice';

type EditTrackButtonProps = {
    slug: string;
    trackId: string;
    className: string;
    openInModal?: boolean;
};

/**
 *
 * @param slug
 * @param trackId
 * @param className
 * @param openInModal
 * @constructor
 */
export default function EditTrackButton(
    {
        slug,
        trackId,
        className,
        openInModal = true,
    }: EditTrackButtonProps
) {
    const dispatch = useDispatch();

    const handleOpen = (event: React.MouseEvent) => {
        event.preventDefault();
        if (openInModal) {
            dispatch(openModal({
                modalType: 'EDIT_TRACK',
                modalProps: {trackSlug: slug},
            }));
        }
    };

    /* TODO data-testid="edit-track-{id}" - Edit button for a specific track */
    return openInModal ? (
        <button
            aria-label="Edit"
            onClick={handleOpen}
            data-testid={`edit-track-${trackId}`}
            className={classNames(className, "flex items-center justify-center p-2 bg-blue-600 hover:bg-blue-700 transition duration-300 cursor-pointer")}
        >
            <PencilIcon className="h-5 w-5 text-white"/>
        </button>
    ) : (
        <Link
            passHref
            aria-label="Edit"
            href={`/tracks/edit/${slug}`}
            data-testid={`edit-track-${slug}`}
            className={classNames(className, "flex items-center justify-center p-2 bg-blue-600 hover:bg-blue-700 transition duration-300 cursor-pointer")}
        >
            <PencilIcon className="h-5 w-5 text-white"/>
        </Link>
    );
}
