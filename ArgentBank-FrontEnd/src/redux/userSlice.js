import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  userName: "",
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { firstName, lastName, userName, token } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.userName = userName;
      state.token = token || null;
    },
    updateUserName: (state, action) => {
      state.userName = action.payload;
    },
    logout: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.userName = "";
      state.token = null;
    },
  },
});

export const { setUser, updateUserName, logout } = userSlice.actions;
export default userSlice.reducer;
