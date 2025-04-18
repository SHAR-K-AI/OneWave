import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/20/solid';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

/**
 *
 * @param currentPage
 * @param totalPages
 * @param onPageChange
 * @constructor
 */
export default function Pagination({currentPage, totalPages, onPageChange}: PaginationProps) {
    const getPages = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible + 2) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const left = Math.max(currentPage - 1, 2);
            const right = Math.min(currentPage + 1, totalPages - 1);

            pages.push(1);

            if (left > 2) pages.push('...');

            for (let i = left; i <= right; i++) {
                pages.push(i);
            }

            if (right < totalPages - 1) pages.push('...');

            pages.push(totalPages);
        }

        return pages;
    };

    const pages = getPages();

    return (
        <div className="flex items-center justify-center gap-1 mt-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
            >
                <ChevronLeftIcon className="h-4 w-4 mr-1"/>
                Prev
            </button>

            {pages.map((page, index) =>
                typeof page === 'number' ? (
                    <button
                        key={index}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-2 text-sm font-medium border rounded cursor-pointer ${
                            currentPage === page
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                    >
                        {page}
                    </button>
                ) : (
                    <span key={index} className="px-3 py-2 text-sm text-gray-500">...</span>
                )
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
            >
                Next
                <ChevronRightIcon className="h-4 w-4 ml-1"/>
            </button>
        </div>
    );
}
