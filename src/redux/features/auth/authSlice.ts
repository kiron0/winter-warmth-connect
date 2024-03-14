import { RootState } from '@/redux/store';
import { TAuthState } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: TAuthState = {
          user: undefined,
          token: undefined,
};

const authSlice = createSlice({
          name: 'auth',
          initialState,
          reducers: {
                    setUser: (state, action) => {
                              const { user, token } = action.payload;
                              state.user = user;
                              state.token = token;
                    },
                    logout: (state) => {
                              state.user = undefined;
                              state.token = undefined;
                              localStorage.removeItem('wwAccessToken');
                    }
          },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const currentToken = (state: RootState) => state.auth.token;
export const currentUser = (state: RootState) => state.auth.user;