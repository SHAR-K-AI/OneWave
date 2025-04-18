import { configureStore } from '@reduxjs/toolkit';

import playerReducer from '@/lib/store/slices/playerSlice';
import tracksReducer from '@/lib/store//slices/tracksSlice';
import filtersReducer from '@/lib/store/slices/filtersSlice';

export const store = configureStore({
    reducer: {
        player: playerReducer,
        tracks: tracksReducer,
        filters: filtersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
