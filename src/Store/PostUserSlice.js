import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const updateData = createAsyncThunk(
  "updateData/post",
  async (userDetails) => {
    const api = "https://reqres.in/api/users";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails)
    };
    const res = fetch(api, options);
    return (await res).json();
  }
);

const updateSlice = createSlice({
  name: "userUpdation",
  initialState: {
    msg: ""
  },
  extraReducers: {
    [updateData.pending]: () => {},
    [updateData.fulfilled]: (state, action) => {
      state.msg = `user created successfully with Id : ${action.payload.id} `;
    },
    [updateData.rejected]: () => {}
  }
});

export default updateSlice;
