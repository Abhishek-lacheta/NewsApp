import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favorites: [],
};

const favoriteChannelsSlice = createSlice({
    name: 'favoriteChannels',
    initialState,
    reducers: {
        addToFavorite: (state, action) => {
            if (!state.favorites.some(channel => channel.url === action.payload.url)) {
                state.favorites.push(action.payload);
            }
        },
        removeToFavorite: (state, action) => {
            state.favorites = state.favorites.filter(
                channel => channel.url !== action.payload.url
            );
        },
    },
});

export const { addToFavorite, removeToFavorite } = favoriteChannelsSlice.actions;

export default favoriteChannelsSlice.reducer;