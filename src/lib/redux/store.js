import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from './reducer/Counter/action'
import PostReducer from './reducer/Post/action'
import UsersReducer from './reducer/User/action'

export const store = configureStore( {
  reducer: {
    counter: CounterReducer,
    posts: PostReducer,
    users: UsersReducer
  }
} )