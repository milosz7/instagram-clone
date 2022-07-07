import { combineReducers, configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';
import profilesReducer from './slices/profilesSlice';
import searchReducer from './slices/searchSlice';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({search: searchReducer, profiles: profilesReducer, postsReducer })

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['search'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
