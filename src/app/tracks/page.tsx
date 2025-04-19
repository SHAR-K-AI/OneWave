'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/lib/store';
import { setPage } from '@/lib/store/slices/filtersSlice';

import Filters from "@/components/traks/Filters";
import TrackItem from "@/components/traks/TrackItem";
import Pagination from "@/components/traks/Pagination";

import {deleteSelectedTracksAsync, fetchTracks} from '@/lib/store/slices/tracksSlice';

/**
 *
 * @constructor
 */
export default function TracksPage() {
    const dispatch = useDispatch();
    const filters = useSelector((state: RootState) => state.filters);
    const { tracks, meta, loading, error, selectedTrackIds } = useSelector((state: RootState) => state.tracks);

    useEffect(() => {
        dispatch(fetchTracks(filters));
    }, [dispatch, filters]);

    const handleDeleteSelectedTracks = () => {
         dispatch(deleteSelectedTracksAsync(selectedTrackIds));
    };

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-700">Track List</h1>

            <Filters />

            {loading ? (
                <p className="text-center">Loading tracks...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : tracks.length === 0 ? (
                <p className="text-center text-gray-500">No results found</p>
            ) : (
                <>
                    <button
                        onClick={handleDeleteSelectedTracks}
                        className="mb-4 p-2 bg-red-500 text-white"
                        disabled={selectedTrackIds.length === 0}
                    >
                        Delete Selected Tracks
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {tracks.map((track) => (
                            <TrackItem key={track.id} track={track} />
                        ))}
                    </div>
                </>
            )}

            {!!meta?.totalPages && (
                <Pagination
                    currentPage={filters.page}
                    totalPages={meta.totalPages}
                    onPageChange={(page) => dispatch(setPage(page))}
                />
            )}
        </div>
    );
}
