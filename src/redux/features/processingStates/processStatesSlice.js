import { createSlice } from '@reduxjs/toolkit'

const initialState = {
loading: null,
success: null,
error: null
}

const processStatesSlice = createSlice({
  name: "processStates",
  initialState,
  reducers: {
      SET_LOADING(state, action){
          state.loading = true;
          state.success = false;
          state.error = false;
      },

      SET_SUCCESS(state, action){
        state.loading = false;
        state.success = true;
        state.error = false;
    },

    SET_ERROR(state, action){
        state.loading = false;
        state.success = false;
        state.error = true;
    },
      
  }
});

export const { SET_LOADING, SET_SUCCESS, SET_ERROR } = processStatesSlice.actions

export const selectLoading = (state) => state.processStates.loading;
export const selectSuccess = (state) => state.processStates.success;
export const selectError = (state) => state.processStates.error;

export default processStatesSlice.reducer