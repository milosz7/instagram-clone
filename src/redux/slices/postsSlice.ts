import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';
import { Buffer } from 'buffer';
import shortid from 'shortid';

const USERDATA_URL = 'https://randomuser.me/api/?inc=login,picture';
const IMAGE_URL = 'https://source.unsplash.com/random/';
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
  large: string;
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
  return await userData as [Data, string, string];
});

export const fetchProfilePosts = createAsyncThunk(
  'posts/fetchProfilePosts',
  async ({username, picture}: {username: string, picture: string}) => {
    const profilePostsNumber = Math.floor(Math.random() * 5);
    const fetchedPosts = [];
    for (let i = 0; i < profilePostsNumber; i++) {
      const imageDataRequest = axios.get(IMAGE_URL, {
        responseType: 'arraybuffer',
      });
      const descDataRequest = axios.get(DESC_URL);
      const imageDataResponse = await imageDataRequest;
      const descResponse = await descDataRequest;
      const imageURL = Buffer.from(imageDataResponse.data, 'binary').toString('base64');
      const generatedPost: Post = {
        id: shortid(),
        imageURL: `data:image/jpeg;base64,${imageURL}`,
        username: username,
        picture: picture,
        desc: descResponse.data.content as string,
        likes: Math.floor(Math.random() * 5000) + 1,
        isFavorite: false,
      };
      fetchedPosts.push(generatedPost);
    }
    return fetchedPosts;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    likePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.map((post) =>
        post.id === action.payload
          ? { ...post, likes: post.likes + 1, isFavorite: !post.isFavorite }
          : post
      );
    },
    dislikePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.map((post) =>
        post.id === action.payload
          ? { ...post, likes: post.likes - 1, isFavorite: !post.isFavorite }
          : post
      );
    },
    clearPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostData.fulfilled, (state, action) => {
        const userDetails = action.payload[0];
        const imageURL = action.payload[1];
        const postDescription = action.payload[2];
        const generatedPost: Post = {
          id: shortid(),
          imageURL: `data:image/jpeg;base64,${imageURL}`,
          username: userDetails.login.username,
          picture: userDetails.picture.large,
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
      })
      .addCase(fetchProfilePosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfilePosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        const generatedPosts = action.payload;
        for (const post of generatedPosts) {
          state.posts = state.posts.concat(post);
        }
        state.status = 'succeeded';
      })
  },
});

export const { likePost, dislikePost, clearPosts } = postsSlice.actions;

export const getAllPosts = (state: RootState) => state.postsReducer.posts;
export const getPostStatus = (state: RootState) => state.postsReducer.status;
export const getPostById = (state: RootState, id: string | undefined) =>
  state.postsReducer.posts.find((post) => post.id === id);
export const getFavoritePosts = (state: RootState) =>
  state.postsReducer.posts.filter((post) => post.isFavorite);
export const getOnePostForUser = (state: RootState) => {
  const uniqueUsers: string[] = [];
  const filteredPosts = state.postsReducer.posts.filter((post) => {
    const userCheck = uniqueUsers.indexOf(post.username) === -1;
    uniqueUsers.push(post.username);
    return userCheck;
  });
  return filteredPosts;
};
export const getPostByUsername = (state: RootState, username: string | undefined) =>
  state.postsReducer.posts.find((post) => post.username === username);
export const getAllUserPosts = (state: RootState, username: string | undefined) =>
state.postsReducer.posts.filter((post) => post.username === username);
export const getSearchedUsers = (state: RootState, query: string) => {
  const checkedUsers: string[] = [];
  const filteredPosts = state.postsReducer.posts.filter((post) => {
    const userCheck = checkedUsers.indexOf(post.username) === -1 && post.username.includes(query)
    checkedUsers.push(post.username);
    return userCheck
  });
  return filteredPosts;
};

export default postsSlice.reducer;
