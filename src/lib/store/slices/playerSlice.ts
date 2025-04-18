import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlayerState {
    currentTrack: string | null;
    playing: boolean;
}

const initialState: PlayerState = {
    currentTrack: null,
    playing: false,
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setTrack(state, action: PayloadAction<string>) {
            state.currentTrack = action.payload;
        },
        play(state) {
            state.playing = true;
        },
        pause(state) {
            state.playing = false;
        },
    },
});

export const { setTrack, play, pause } = playerSlice.actions;
export default playerSlice.reducer;
