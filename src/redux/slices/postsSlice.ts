import { createSlice, createAsyncThunk, PayloadAction, current } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';
import { Buffer } from 'buffer';
import shortid from 'shortid';

const USERDATA_URL = 'https://randomuser.me/api/?inc=login,picture';
const IMAGE_URL = 'https://source.unsplash.com/random/400x500';
const DESC_URL = 'https://api.quotable.io/random?maxLength=100';

export type Post = {
  imageURL: string;
  username: string;
  picture: string;
  likes: number;
  desc: string;
  id: string;
  isFavorite: boolean;
};

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
  error: undefined,
};

export const fetchPostData = createAsyncThunk('posts/fetchPost', async () => {
  const userDataRequest = axios.get(USERDATA_URL);
  const imageDataRequest = axios.get(IMAGE_URL, {
    responseType: 'arraybuffer',
  });
  const descDataRequest = axios.get(DESC_URL);
  const userData = axios.all([userDataRequest, imageDataRequest, descDataRequest]).then(
    axios.spread((...responses) => {
      const userDataResp = responses[0].data.results[0];
      const imageDataResp = responses[1].data;
      const userDataRequest = responses[2].data.content;
      const imageURL = Buffer.from(imageDataResp, 'binary').toString('base64');
      return [userDataResp, imageURL, userDataRequest];
    })
  );
  return userData;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    likePost: (state, action) => {
      state.posts = state.posts.map((post) =>
        post.id === action.payload
          ? { ...post, likes: post.likes + 1, isFavorite: !post.isFavorite }
          : post
      );
    },
    dislikePost: (state, action) => {
      state.posts = state.posts.map((post) =>
        post.id === action.payload
          ? { ...post, likes: post.likes - 1, isFavorite: !post.isFavorite }
          : post
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostData.fulfilled, (state, action) => {
        const userDetails: Data = action.payload[0];
        const imageURL: string = action.payload[1];
        const postDescription: string = action.payload[2];
        const generatedPost: Post = {
          id: shortid(),
          imageURL: `data:image/jpeg;base64,${imageURL}`,
          username: userDetails.login.username,
          picture: userDetails.picture.thumbnail,
          desc: postDescription,
          likes: Math.floor(Math.random() * 5000) + 1,
          isFavorite: false,
        };
        state.status = 'succeeded';
        state.posts = state.posts.concat(generatedPost);
      })
      .addCase(fetchPostData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.log(action.error.message);
      });
  },
});

export const { likePost, dislikePost } = postsSlice.actions;

export const getAllPosts = (state: RootState) => state.postsReducer.posts;
export const getPostStatus = (state: RootState) => state.postsReducer.status;
export const getPostById = (state: RootState, id: string | undefined) =>
  state.postsReducer.posts.find((post) => post.id === id);
export const getFavoritePosts = (state: RootState) =>
  state.postsReducer.posts.filter((post) => post.isFavorite);

export default postsSlice.reducer;
