import Link from 'next/link';
import { FiltersProps } from "@/lib/client/apiTracks";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    filters: FiltersProps;
};

export default function Pagination({ currentPage, totalPages, filters }: PaginationProps) {
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

    const getPageLink = (page: number) => {
        const searchParams = new URLSearchParams(filters as Record<string, string>);
        searchParams.set('page', page.toString());
        return `?${searchParams.toString()}`;
    };

    return (
        <div className="flex items-center justify-center gap-1 mt-8" data-testid="pagination">
            {currentPage === 1 ? (
                <span
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-400 bg-white border border-gray-300 rounded cursor-not-allowed"
                >
                    <ChevronLeftIcon className="h-4 w-4 mr-1"/>
                    Prev
                </span>
            ) : (
                <Link
                    href={getPageLink(currentPage - 1)}
                    data-testid="pagination-prev"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100"
                >
                    <ChevronLeftIcon className="h-4 w-4 mr-1"/>
                    Prev
                </Link>
            )}

            {pages.map((page, index) =>
                typeof page === 'number' ? (
                    <Link
                        key={index}
                        href={getPageLink(page)}
                        className={`px-3 py-2 text-sm font-medium border rounded cursor-pointer ${
                            currentPage === page
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                    >
                        {page}
                    </Link>
                ) : (
                    <span key={index} className="px-3 py-2 text-sm text-gray-500">...</span>
                )
            )}

            {currentPage === totalPages ? (
                <span
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-400 bg-white border border-gray-300 rounded cursor-not-allowed"
                >
                    Next
                    <ChevronRightIcon className="h-4 w-4 ml-1"/>
                </span>
            ) : (
                <Link
                    href={getPageLink(currentPage + 1)}
                    data-testid="pagination-next"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100"
                >
                    Next
                    <ChevronRightIcon className="h-4 w-4 ml-1"/>
                </Link>
            )}
        </div>
    );
}
