'use client';

import { RootState } from '@/lib/store';
import { useDispatch, useSelector } from 'react-redux';

import {
    setLimit,
    setOrder,
    setGenre,
    setSortBy,
    setArtist,
    setSearch
} from '@/lib/store/slices/filtersSlice';

/**
 *
 * @constructor
 */
const Filters = () => {
    const dispatch = useDispatch();
    const filters = useSelector((state: RootState) => state.filters);

    return (
        <div className="mb-6 grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-6 bg-white p-4 rounded-lg text-gray-400">
            <input
                type="text"
                placeholder="Search by title"
                value={filters.search}
                onChange={(e) => dispatch(setSearch(e.target.value))}
                className="border p-2 rounded"
            />
            <input
                type="text"
                placeholder="Genre"
                value={filters.genre}
                onChange={(e) => dispatch(setGenre(e.target.value))}
                className="border p-2 rounded"
            />
            <input
                type="text"
                placeholder="Artist"
                value={filters.artist}
                onChange={(e) => dispatch(setArtist(e.target.value))}
                className="border p-2 rounded"
            />
            <select
                value={filters.sortBy}
                onChange={(e) => dispatch(setSortBy(e.target.value))}
                className="border p-2 rounded"
            >
                <option value="title">Title</option>
                <option value="createdAt">Created At</option>
            </select>
            <select
                value={filters.order}
                onChange={(e) => dispatch(setOrder(e.target.value))}
                className="border p-2 rounded"
            >
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
            </select>
            <select
                value={filters.limit}
                onChange={(e) => dispatch(setLimit(Number(e.target.value)))}
                className="border p-2 rounded"
            >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
            </select>
        </div>
    );
};

export default Filters;
