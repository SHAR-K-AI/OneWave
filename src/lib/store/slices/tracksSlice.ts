import { getTracks } from '@/lib/client/apiTracks';
import { FiltersState } from '@/lib/store/slices/filtersSlice';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
}

const initialState: TracksState = {
    tracks: [],
    meta: null,
    loading: false,
    error: null,
};

export const fetchTracks = createAsyncThunk(
    'tracks/fetchTracks',
    async (filters: FiltersState, { rejectWithValue }) => {
        try {
            const { data } = await getTracks(filters);
            return data;
        } catch (err: unknown) {
            if (err instanceof Error) {
                return rejectWithValue(err.message || 'Failed to fetch tracks');
            }
            return rejectWithValue('Failed to fetch tracks');
        }
    }
);

const tracksSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {
        clearTracks(state) {
            state.tracks = [];
            state.meta = null;
            state.loading = false;
            state.error = null;
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

export const { clearTracks } = tracksSlice.actions;
export default tracksSlice.reducer;
