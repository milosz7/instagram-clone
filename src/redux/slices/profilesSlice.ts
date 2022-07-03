import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface State {
  profiles: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: State = {
  profiles: [],
  status: 'idle',
};

const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    createProfile: (state, action) => {
      state.profiles.push(action.payload);
    },
  },
});

export const getCreatedProfiles = (state: RootState) => state.profiles.profiles;

export const { createProfile } = profilesSlice.actions;

export default profilesSlice.reducer;
