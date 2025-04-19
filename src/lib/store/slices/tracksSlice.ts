import {deleteMultipleTracks, getTracks} from '@/lib/client/apiTracks';
import {FiltersState} from '@/lib/store/slices/filtersSlice';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export interface Track {
    id: string;
    title: string;
    artist: string;
    slug: string;
    coverImage: string;
    album: string;
    genres: string[];
    updatedAt: string;
    audioUrl: string;
}

interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

interface TracksState {
    tracks: Track[];
    meta: Meta | null;
    loading: boolean;
    error: string | null;
    selectedTrackIds: [];
}

const initialState: TracksState = {
    tracks: [],
    meta: null,
    loading: false,
    error: null,
    selectedTrackIds: [],
};

export const fetchTracks = createAsyncThunk(
    'tracks/fetchTracks',
    async (filters: FiltersState, {rejectWithValue}) => {
        try {
            const {data} = await getTracks(filters);
            return data;
        } catch (err: unknown) {
            if (err instanceof Error) {
                return rejectWithValue(err.message || 'Failed to fetch tracks');
            }
            return rejectWithValue('Failed to fetch tracks');
        }
    }
);

export const deleteSelectedTracksAsync = createAsyncThunk(
    'tracks/deleteSelectedTracksAsync',
    async (trackIds: string[], {dispatch, rejectWithValue}) => {
        try {
            const response = await deleteMultipleTracks(trackIds); // Ваша функція для видалення треків
            dispatch(deleteSelectedTracks());
            return response;
        } catch (err: any) {
            return rejectWithValue('Failed to delete tracks');
        }
    }
);


const tracksSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {
        toggleTrackSelection(state, action) {
            const trackId = action.payload;
            if (state.selectedTrackIds.includes(trackId)) {
                state.selectedTrackIds = state.selectedTrackIds.filter(id => id !== trackId);
            } else {
                state.selectedTrackIds.push(trackId);
            }
        },
        deleteSelectedTracks(state) {
            state.tracks = state.tracks.filter(track =>
                !state.selectedTrackIds.includes(track.id)
            );
            state.selectedTrackIds = [];
        },
        updateSelectedTrack(state, action) {
            const updatedTrack = action.payload;
            const index = state.tracks.findIndex(track => track.id === updatedTrack.id);
            if (index !== -1) {
                state.tracks[index] = updatedTrack;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTracks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTracks.fulfilled, (state, action) => {
                state.tracks = action.payload.data;
                state.meta = action.payload.meta;
                state.loading = false;
            })
            .addCase(fetchTracks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const {toggleTrackSelection, deleteSelectedTracks, updateSelectedTrack} = tracksSlice.actions;
export default tracksSlice.reducer;
