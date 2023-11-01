import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from './reducer/Counter/action'
import UsersReducer from './reducer/User/action'
import { apiSlice } from "./apis";

export const store = configureStore( {
  reducer: {
    [ apiSlice.reducerPath ]: apiSlice.reducer,
    counter: CounterReducer,
    // posts: PostReducer,
    users: UsersReducer
  },
  middleware: ( getDefaultMiddleware ) =>
    getDefaultMiddleware().concat( apiSlice.middleware ),
} )