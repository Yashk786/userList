import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    page: 1,
    loading: false,
    error: null,
  },
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action) {
      state.list = [...state.list, ...action.payload];
      state.loading = false;
    },
    fetchFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetUsers(state) {
      state.list = [];
      state.page = 1;
    },
    incrementPage(state) {
      state.page += 1;
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  resetUsers,
  incrementPage,
} = usersSlice.actions;

export default usersSlice.reducer;
