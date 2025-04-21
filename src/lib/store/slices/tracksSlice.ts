import { deleteMultipleTracks } from '@/lib/client/apiTracks';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

interface TracksState {
    meta: Meta | null;
    loading: boolean;
    dance: boolean;
    error: string | null;
    selectedTrackIds: string[];
    selectionModeEnabled: boolean;
}

const initialState: TracksState = {
    meta: null,
    loading: false,
    dance: false,
    error: null,
    selectedTrackIds: [],
    selectionModeEnabled: false,
};

export const deleteSelectedTracksAsync = createAsyncThunk(
    'tracks/deleteSelectedTracksAsync',
    async (trackIds: string[], { rejectWithValue }) => {
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
        toggleSelectionMode(state) {
            state.selectionModeEnabled = !state.selectionModeEnabled;
            if (!state.selectionModeEnabled) {
                state.selectedTrackIds = [];
            }
        },
        toggleDanceMode(state) {
            state.dance = !state.dance;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(deleteSelectedTracksAsync.rejected, (state, action) => {
            state.error = action.payload as string;
        });
    }
});

export const { toggleTrackSelection, toggleSelectionMode, toggleDanceMode } = tracksSlice.actions;
export default tracksSlice.reducer;
