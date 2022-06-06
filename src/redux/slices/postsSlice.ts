import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../store';
import axios from "axios";
import { Buffer } from "buffer";

const USERDATA_URL = 'https://randomuser.me/api/?inc=login,picture';
const IMAGE_URL = 'https://source.unsplash.com/random/400x500';

type Post = {imageURL: string, username: string, picture: string, likes: number};

interface Login {
  username: string;
}

interface Picture {
  thumbnail: string;
}

interface Data {
  login: Login;
  picture: Picture;
}

const initialState = {
  posts: [] as Post[],
  status: 'idle', // idle, loading, succeeded, failed
  error: null
};

export const fetchPostData = createAsyncThunk('posts/fetchPost', async () => {
    const userDataRequest = axios.get(USERDATA_URL);
    const imageDataRequest = axios.get(IMAGE_URL, {
      responseType: 'arraybuffer'
    });
    const userData = axios.all([userDataRequest, imageDataRequest]).then(axios.spread((...responses) => {
      const userDataResp = responses[0].data.results[0];
      const imageDataResp = responses[1].data;
      const imageURL = Buffer.from(imageDataResp, 'binary').toString('base64');
      return [userDataResp, imageURL];
    }));
    return userData;
  })

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostData.fulfilled, (state, action) => {
        const userDetails: Data = action.payload[0];
        const imageURL: string = action.payload[1];
        const generatedPost: Post = {
          imageURL: `data:image/jpeg;base64,${imageURL}`,
          username: userDetails.login.username,
          picture: userDetails.picture.thumbnail,
          likes: Math.floor(Math.random() * 5000) + 1,
        }
        state.status = 'succeeded';
        state.posts.push(generatedPost);
      })
      .addCase(fetchPostData.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action.error.message)
      })
  }
});

export const getAllPosts = (state: RootState) => state.postsReducer.posts;
export const getPostStatus = (state: RootState) => state.postsReducer.status;

export default postsSlice.reducer;