import Link from 'next/link';
import classNames from "classnames";

type ViewTrackButton = {
    slug: string;
    className?: string;
};

/**
 *
 * @param slug
 * @param className
 * @constructor
 */
const ViewTrackButton = ({slug, className}: ViewTrackButton) => {
    return (
        <Link href={`/tracks/${slug}`} passHref>
            <button
                className={classNames(className, "px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md z-10 relative rounded cursor-pointer transform hover:scale-105 transition duration-300")}
            >
                View
            </button>
        </Link>
    );
};

export default ViewTrackButton;
