'use client';

import React from 'react';
import {useRouter} from 'next/navigation';
import {useDebouncedCallback} from 'use-debounce';
import {FiltersProps} from "@/lib/client/apiTracks";

/**
 *
 * @param filters
 * @param tracks
 * @constructor
 */
const Filters = ({filters}: { filters: FiltersProps }) => {
    const router = useRouter();
    const page = filters.page;

    /**
     *
     * @param search
     * @param genre
     * @param artist
     * @param sortBy
     * @param order
     * @param limit
     */
    const buildUrl = (search: string, genre: string, artist: string, sortBy: string, order: string, limit: number) => {
        const params = new URLSearchParams();

        if (page) params.set('page', page.toString());
        if (search) params.set('search', Array.isArray(search) ? search.join(',') : search);
        if (genre) params.set('genre', Array.isArray(genre) ? genre.join(',') : genre);
        if (artist) params.set('artist', Array.isArray(artist) ? artist.join(',') : artist);
        if (sortBy) params.set('sortBy', Array.isArray(sortBy) ? sortBy.join(',') : sortBy);
        if (order) params.set('order', Array.isArray(order) ? order.join(',') : order);
        if (limit) params.set('limit', limit.toString());

        router.push(`?${params.toString()}`);
    };

    const debouncedPush = useDebouncedCallback((search, genre, artist, sortBy, order, limit) => {
        buildUrl(search, genre, artist, sortBy, order, limit);
    }, 300);

    return (
        <>
            {/*TODO data-testid="search-input" - Search input field*/}
            <input
                data-testid="search-input"
                type="text"
                placeholder="Search by title"
                defaultValue={filters.search}
                onChange={(e) => debouncedPush(e.target.value, filters.genre, filters.artist, filters.sortBy, filters.order, filters.limit)}
                className="border p-2 rounded"
            />
            {/*TODO data-testid="filter-genre" - Genre filter control*/}
            <input
                data-testid="filter-genre"
                type="text"
                placeholder="Genre"
                defaultValue={filters.genre}
                onChange={(e) => debouncedPush(filters.search, e.target.value, filters.artist, filters.sortBy, filters.order, filters.limit)}
                className="border p-2 rounded"
            />
            {/*TODO data-testid="filter-artist" - Artist filter control*/}
            <input
                data-testid="filter-artist"
                type="text"
                placeholder="Artist"
                defaultValue={filters.artist}
                onChange={(e) => debouncedPush(filters.search, filters.genre, e.target.value, filters.sortBy, filters.order, filters.limit)}
                className="border p-2 rounded"
            />
            {/*TODO data-testid="sort-select" - Sorting control*/}
            <select
                data-testid="sort-select"
                defaultValue={filters.sortBy}
                onChange={(e) => debouncedPush(filters.search, filters.genre, filters.artist, e.target.value, filters.order, filters.limit)}
                className="border p-2 rounded"
            >
                <option value="title">Title</option>
                <option value="createdAt">Created At</option>
            </select>
            <select
                defaultValue={filters.order}
                onChange={(e) => debouncedPush(filters.search, filters.genre, filters.artist, filters.sortBy, e.target.value, filters.limit)}
                className="border p-2 rounded"
            >
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
            </select>
            <select
                defaultValue={filters.limit}
                onChange={(e) => debouncedPush(filters.search, filters.genre, filters.artist, filters.sortBy, filters.order, Number(e.target.value))}
                className="border p-2 rounded"
            >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
            </select>
        </>
    );
};

export default Filters;
