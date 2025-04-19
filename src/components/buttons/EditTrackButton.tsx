'use client';

import Link from 'next/link';
import classNames from 'classnames';
import {useDispatch} from 'react-redux';

import {PencilIcon} from '@heroicons/react/24/solid';
import {openModal} from '@/lib/store/slices/modalSlice';

type EditTrackButtonProps = {
    slug: string;
    className: string;
    openInModal?: boolean;
};

/**
 *
 * @param slug
 * @param className
 * @param openInModal
 * @constructor
 */
export default function EditTrackButton({slug, className, openInModal = true}: EditTrackButtonProps) {
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

    return openInModal ? (
        <button
            aria-label="Edit"
            onClick={handleOpen}
            className={classNames(className, "flex items-center justify-center p-2 bg-blue-600 hover:bg-blue-700 transition duration-300")}
        >
            <PencilIcon className="h-5 w-5 text-white"/>
        </button>
    ) : (
        <Link
            passHref
            aria-label="Edit"
            href={`/tracks/edit/${slug}`}
            className={classNames(className, "flex items-center justify-center p-2 bg-blue-600 hover:bg-blue-700 transition duration-300")}
        >
            <PencilIcon className="h-5 w-5 text-white"/>
        </Link>
    );
}
