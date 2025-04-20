import {deleteMultipleTracks} from '@/lib/client/apiTracks';
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
    meta: Meta | null;
    loading: boolean;
    error: string | null;
    selectedTrackIds: string[];
}

const initialState: TracksState = {
    meta: null,
    loading: false,
    error: null,
    selectedTrackIds: [],
};


export const deleteSelectedTracksAsync = createAsyncThunk(
    'tracks/deleteSelectedTracksAsync',
    async (trackIds: string[], {rejectWithValue}) => {
        try {
            const response = await deleteMultipleTracks(trackIds);

            return response;
        } catch (error) {
            console.log(error);
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
            .addCase(deleteSelectedTracksAsync.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    }
});

export const {toggleTrackSelection, deleteSelectedTracks, updateSelectedTrack} = tracksSlice.actions;
export default tracksSlice.reducer;
