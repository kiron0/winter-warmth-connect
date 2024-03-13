import { baseApi } from '@/redux/api/baseApi';
import authReducer from '@/redux/features/auth/authSlice';
import userReducer from '@/redux/features/user/userSlice';
import { configureStore } from '@reduxjs/toolkit';
import {
          FLUSH,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          REHYDRATE,
          persistReducer,
          persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
          key: 'auth',
          storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
          reducer: {
                    [baseApi.reducerPath]: baseApi.reducer,
                    auth: persistedAuthReducer,
                    user: userReducer,
          },
          middleware: (getDefaultMiddlewares) =>
                    getDefaultMiddlewares({
                              serializableCheck: {
                                        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                              },
                    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);