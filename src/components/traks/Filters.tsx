'use client';

import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import {FiltersProps, Track} from "@/lib/client/apiTracks";

import SelectAllButton from "@/components/buttons/SelectAllButton";
import CreateTrackButton from "@/components/buttons/CreateTrackButton";
import SelectionToggleButton from "@/components/buttons/SelectionToggleButton";
import DeleteSelectedTracksButton from "@/components/buttons/DeleteSelectedTracksButton";

/**
 *
 * @param filters
 * @param tracks
 * @constructor
 */
const Filters = ({filters, tracks}: { filters: FiltersProps, tracks: Track[] }) => {
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
        if (search) params.set('search', Array.isArray(search) ? search.join(',') : search);
        if (genre) params.set('genre', Array.isArray(genre) ? genre.join(',') : genre);
        if (artist) params.set('artist', Array.isArray(artist) ? artist.join(',') : artist);
        if (sortBy) params.set('sortBy', Array.isArray(sortBy) ? sortBy.join(',') : sortBy);
        if (order) params.set('order', Array.isArray(order) ? order.join(',') : order);
        if (limit) params.set('limit', limit.toString());

        router.push(`?${params.toString()}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, genre, artist, sortBy, order, limit, router]);

    return (
        <div
            className="mb-6 grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-7 bg-white p-4 rounded-lg text-gray-400">
            {/*TODO data-testid="search-input" - Search input field*/}
            <input
                data-testid="search-input"
                type="text"
                placeholder="Search by title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 rounded"
            />
            {/*TODO data-testid="filter-genre" - Genre filter control*/}
            <input
                data-testid="filter-genre"
                type="text"
                placeholder="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="border p-2 rounded"
            />
            {/*TODO data-testid="filter-artist" - Artist filter control*/}
            <input
                data-testid="filter-artist"
                type="text"
                placeholder="Artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className="border p-2 rounded"
            />
            {/*TODO data-testid="sort-select" - Sorting control*/}
            <select
                data-testid="sort-select"
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

            <div className="col-span-1 flex justify-end space-x-2">
                <CreateTrackButton
                    className="w-full sm:w-auto px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"/>
                <SelectionToggleButton/>
                {tracks && <SelectAllButton allTrackIds={tracks.map((track: Track) => track.id)}/>}
                {tracks && <DeleteSelectedTracksButton
                    className="w-full sm:w-auto px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"/>}
            </div>
        </div>
    );
};

export default Filters;
