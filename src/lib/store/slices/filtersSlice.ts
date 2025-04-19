import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
    page: number;
    limit: number;
    sortBy: string;
    order: string;
    search: string;
    genre: string;
    artist: string;
}

const initialState: FiltersState = {
    page: 1,
    limit: 5,
    sortBy: 'title',
    order: 'desc',
    search: '',
    genre: '',
    artist: '',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setLimit(state, action: PayloadAction<number>) {
            state.limit = action.payload;
        },
        setSortBy(state, action: PayloadAction<string>) {
            state.sortBy = action.payload;
        },
        setOrder(state, action: PayloadAction<string>) {
            state.order = action.payload;
        },
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },
        setGenre(state, action: PayloadAction<string>) {
            state.genre = action.payload;
        },
        setArtist(state, action: PayloadAction<string>) {
            state.artist = action.payload;
        },
        resetFilters() {
            return initialState;
        }
    },
});

export const {
    setPage, setLimit, setSortBy, setOrder,
    setSearch, setGenre, setArtist, resetFilters
} = filtersSlice.actions;

export default filtersSlice.reducer;
