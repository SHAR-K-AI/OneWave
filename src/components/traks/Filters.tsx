'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FiltersProps } from "@/lib/client/apiTracks";
import CreateTrackButton from "@/components/buttons/CreateTrackButton";
import DeleteSelectedTracksButton from "@/components/buttons/DeleteSelectedTracksButton";

/**
 *
 * @param filters
 * @constructor
 */
const Filters = ({ filters }: { filters: FiltersProps }) => {
    const router = useRouter();
    const page = filters.page;

    const [search, setSearch] = useState(filters.search);
    const [genre, setGenre] = useState(filters.genre);
    const [artist, setArtist] = useState(filters.artist);
    const [sortBy, setSortBy] = useState(filters.sortBy);
    const [order, setOrder] = useState(filters.order);
    const [limit, setLimit] = useState(filters.limit);

    useEffect(() => {
        const params = new URLSearchParams();

        if (page) params.set('page', page.toString());
        if (search) params.set('search', search);
        if (genre) params.set('genre', genre);
        if (artist) params.set('artist', artist);
        if (sortBy) params.set('sortBy', sortBy);
        if (order) params.set('order', order);
        if (limit) params.set('limit', limit.toString());

        router.push(`?${params.toString()}`);
    }, [search, genre, artist, sortBy, order, limit, router, page]);

    return (
        <div className="mb-6 grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-7 bg-white p-4 rounded-lg text-gray-400">
            <input
                type="text"
                placeholder="Search by title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 rounded"
            />
            <input
                type="text"
                placeholder="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="border p-2 rounded"
            />
            <input
                type="text"
                placeholder="Artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className="border p-2 rounded"
            />
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border p-2 rounded"
            >
                <option value="title">Title</option>
                <option value="createdAt">Created At</option>
            </select>
            <select
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="border p-2 rounded"
            >
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
            </select>
            <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="border p-2 rounded"
            >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
            </select>

            <div className="col-span-1 flex justify-end space-x-4">
                <CreateTrackButton className="w-full sm:w-auto px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300" />
                <DeleteSelectedTracksButton className="w-full sm:w-auto px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition duration-300" />
            </div>
        </div>
    );
};

export default Filters;
