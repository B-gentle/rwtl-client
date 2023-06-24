import {
  createSlice
} from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn:  false,
  loading: true,
  userData: null,
  transactions: []
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
   SET_USERDATA(state, action) {
      state.userData = action.payload;
    },

    LOG_IN_USER(state, action) {
      state.isLoggedIn = action.payload; 
    },

    LOG_OUT_USER(state, action) {
      state.isLoggedIn = action.payload;
    },

    GET_TRANSACTIONS(state, action) {
      state.transactions = action.payload
    }
  }
});

export const {
  LOG_IN_USER,
  LOG_OUT_USER,
  GET_TRANSACTIONS,
  SET_USERDATA
} = userSlice.actions

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUserData = (state) => state.user.userData;
export const selectTransaction = (state) => state.user.transactions;

export default userSlice.reducer