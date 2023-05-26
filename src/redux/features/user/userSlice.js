import {
  createSlice
} from '@reduxjs/toolkit'

const userData = JSON.parse(localStorage.getItem("userData"))

const initialState = {
  isLoggedIn: false,
  userData: userData ? userData : {},
  allUsers: []
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_USERDATA(state, action) {
      localStorage.setItem("userData", JSON.stringify(action.payload));
      state.userData = action.payload;
    },

    LOG_IN_USER(state, action) {
      state.isLoggedIn = action.payload;
      
    },

    LOG_OUT_USER(state, action) {
      localStorage.removeItem("userData");
      state.isLoggedIn = action.payload
    },

    SetAllUsers(state, action) {
      state.allUsers = action.payload
    }
  }
});

export const {
  LOG_IN_USER,
  LOG_OUT_USER,
  SetAllUsers,
  SET_USERDATA
} = userSlice.actions
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUserData = (state) => state.user.userData;

export default userSlice.reducer