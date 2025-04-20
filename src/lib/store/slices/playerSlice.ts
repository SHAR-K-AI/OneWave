import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlayerState {
    currentTrackId: string | null;
    isPlaying: boolean;
}

const initialState: PlayerState = {
    currentTrackId: null,
    isPlaying: false,
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setTrackId: (state, action: PayloadAction<string | null>) => {
            state.currentTrackId = action.payload;
        },
        play: (state) => {
            state.isPlaying = true;
        },
        pause: (state) => {
            state.isPlaying = false;
        },
    },
});

export const { setTrackId, play, pause } = playerSlice.actions;
export default playerSlice.reducer;
