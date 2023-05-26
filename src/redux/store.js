import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './features/user/userSlice';
import processStatesReducer from './features/processingStates/processStatesSlice';


const rootReducer = combineReducers({
    user: userReducer,
    processStates: processStatesReducer
  });

export const store = configureStore({
reducer: rootReducer
})