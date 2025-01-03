import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favorites: [],
};

const favoriteArticlesSlice = createSlice({
    name: 'favoriteArticles',
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            if (!state.favorites.some(article => article.link === action.payload.link)) {
                state.favorites.push(action.payload);
            }
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter(
                article => article.link !== action.payload.link
            );
        },
    },
});

export const { addFavorite, removeFavorite } = favoriteArticlesSlice.actions;

export default favoriteArticlesSlice.reducer;