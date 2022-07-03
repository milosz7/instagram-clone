import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Profile {
  username: string,
  followers: number;
  following: number;
}

interface State {
  profiles: Profile[];
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
    createProfile: (state, action: PayloadAction<Profile>) => {
      state.profiles.push(action.payload);
    },
  },
});

export const getCreatedProfiles = (state: RootState) => state.profiles.profiles.map(profileData => profileData.username);
export const getProfileData = (state: RootState, username: string) => state.profiles.profiles.find(profile => profile.username === username);

export const { createProfile } = profilesSlice.actions;

export default profilesSlice.reducer;
