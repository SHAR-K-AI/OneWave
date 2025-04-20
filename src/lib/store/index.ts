import { configureStore } from '@reduxjs/toolkit';

import modalReducer from '@/lib/store/slices/modalSlice';
import playerReducer from '@/lib/store/slices/playerSlice';
import tracksReducer from '@/lib/store//slices/tracksSlice';

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        player: playerReducer,
        tracks: tracksReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
