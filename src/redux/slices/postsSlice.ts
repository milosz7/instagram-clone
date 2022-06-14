import { createSlice, createAsyncThunk, PayloadAction, current } from "@reduxjs/toolkit";
import { RootState } from '../store';
import axios from "axios";
import { Buffer } from "buffer";
import shortid from "shortid";

const USERDATA_URL = 'https://randomuser.me/api/?inc=login,picture';
const IMAGE_URL = 'https://source.unsplash.com/random/400x500';

type Post = {imageURL: string, username: string, picture: string, likes: number, id: string};

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

interface State {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: undefined | string;
}

const initialState: State = {
  posts: [],
  status: 'idle',
  error: undefined
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
    likePost: (state, action) => {
      state.posts = state.posts.map((post) => post.id === action.payload ? {...post, likes: post.likes + 1} : post)
    },
    dislikePost: (state, action) => {
      state.posts = state.posts.map(post => post.id === action.payload ? {...post, likes: post.likes - 1} : post)
    }
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
          id: shortid(),
          imageURL: `data:image/jpeg;base64,${imageURL}`,
          username: userDetails.login.username,
          picture: userDetails.picture.thumbnail,
          likes: Math.floor(Math.random() * 5000) + 1,
        }
        state.status = 'succeeded';
        state.posts = state.posts.concat(generatedPost);
      })
      .addCase(fetchPostData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message
        console.log(action.error.message)
      })
  }
});

export const { likePost, dislikePost } = postsSlice.actions;

export const getAllPosts = (state: RootState) => state.postsReducer.posts;
export const getPostStatus = (state: RootState) => state.postsReducer.status;
export const getPostById = (state: RootState, id: string) => state.postsReducer.posts.find(post => post.id === id); 

export default postsSlice.reducer;