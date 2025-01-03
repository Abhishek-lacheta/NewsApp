import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import favoriteArticlesReducer from '../redux/favoriteArticlesSlice';
import favoriteChannelsReducer from '../redux/favoriteChannelSlice';

const persistConfigArticles = {
    key: 'favoriteArticles',
    storage: AsyncStorage,
};

const persistConfigChannels = {
    key: 'favoriteChannels',
    storage: AsyncStorage,
};

const rootReducer = {
    favoriteArticles: persistReducer(persistConfigArticles, favoriteArticlesReducer),
    favoriteChannel: persistReducer(persistConfigChannels, favoriteChannelsReducer),
};

export const store = configureStore({
    reducer: rootReducer,
});

export const persistor = persistStore(store);
