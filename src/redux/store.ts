import { baseApi } from '@/redux/api/baseApi';
import authReducer from '@/redux/features/auth/authSlice';
import userReducer from '@/redux/features/user/userSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
          reducer: {
                    [baseApi.reducerPath]: baseApi.reducer,
                    auth: authReducer,
                    user: userReducer,
          },
          middleware: (getDefaultMiddlewares) =>
                    getDefaultMiddlewares().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;