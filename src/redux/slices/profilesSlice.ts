import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';
import { Buffer } from 'buffer';
import { Post } from '../slices/postsSlice';
import shortid from 'shortid';

const IMAGE_URL = 'https://source.unsplash.com/random/400x500';
const DESC_URL = 'https://api.quotable.io/random?maxLength=100';

interface Profile {
  username: string;
  picture: string;
  posts: Post[];
}

interface State {
  profiles: Profile[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: undefined | string;
}

const initialState: State = {
  profiles: [],
  status: 'idle',
  error: undefined,
};

export const fetchProfileData = createAsyncThunk(
  'profiles/fetchProfile',
  async (postData: Post) => {
    const profilePostsData = {
      username: postData.username,
      picture: postData.picture,
      posts: [postData],
    };
    const profilePostsNumber = Math.floor(Math.random() * 5 + 1);
    for (let i = 0; i < profilePostsNumber; i++) {
      const imageDataRequest = axios.get(IMAGE_URL, {
        responseType: 'arraybuffer',
      });
      const descDataRequest = axios.get(DESC_URL);
      const imageDataResponse = await imageDataRequest;
      const descResponse = await descDataRequest;
      const imageURL = Buffer.from(imageDataResponse.data, 'binary').toString('base64');
      const generatedProfilePost = {
        id: shortid(),
        imageURL: `data:image/jpeg:base64,${imageURL}`,
        username: postData.username,
        picture: postData.picture,
        desc: descResponse.data.content as string,
        likes: Math.floor(Math.random() * 5000) + 1,
        isFavorite: false,
      };
      profilePostsData.posts.push(generatedProfilePost);
    }
    return profilePostsData;
  }
);

const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        console.log(action.payload);
        // state.profiles = state.profiles.concat(action.payload)
      });
  },
});

export const getProfileData = (state: RootState, username: string) =>
  state.profilesReducer.profiles.filter((profile) => profile.username === username);

export default profilesSlice.reducer;
