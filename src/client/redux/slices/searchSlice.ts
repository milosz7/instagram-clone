import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface State {
  search: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: State = {
  search: '',
  status: 'idle',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const getSearchQuery = (state: RootState) => state.search.search;

export const { setSearch } = searchSlice.actions;

export default searchSlice.reducer;