import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserList = createAsyncThunk("userList/get", async () => {
  const api = "https://reqres.in/api/users";
  const options = {
    method: "GET"
  };
  const res = fetch(api, options);
  return (await res).json();
});

const GetUserSlice = createSlice({
  name: "userList",
  initialState: {
    theme: false,
    isLoading: false,
    userList: [],
    errorMsg: ""
  },
  reducers: {
    changeTheme(state) {
      state.theme = !state.theme;
    }
  },
  extraReducers: {
    [fetchUserList.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUserList.fulfilled]: (state, action) => {
      const updatedData = action.payload.data.map((each) => ({
        id: each.id,
        firstName: each.first_name,
        lastName: each.last_name,
        avatar: each.avatar
      }));

      state.isLoading = false;
      state.userList = updatedData;
    },
    [fetchUserList.rejected]: (state, action) => {
      state.errorMsg = "error while fetching";
      state.isLoading = false;
    }
  }
});

export const getUserActions = GetUserSlice.actions;
export default GetUserSlice;
