import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from './reducer/Counter/action'

export const store = configureStore( {
  reducer: {
    counter: CounterReducer
  }
} )