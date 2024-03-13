import { RootState } from '@/redux/store';
import { TUserDetails } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: TUserDetails = {
          email: '',
          username: '',
          role: '',
          image: '',
};

const userSlice = createSlice({
          name: 'user',
          initialState,
          reducers: {
                    setUserDetails: (state, action) => {
                              const { email, username, role, image } = action.payload;
                              state.email = email;
                              state.username = username;
                              state.role = role;
                              state.image = image;
                    },
                    clearUserDetails: (state) => {
                              state.email = '';
                              state.username = '';
                              state.role = '';
                              state.image = '';
                    },
          },
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;

export default userSlice.reducer;

export const currentUserDetails = (state: RootState) => state.user;