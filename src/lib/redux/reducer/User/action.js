import { createSlice, nanoid } from '@reduxjs/toolkit/dist'

const initialState = [
  { id: '1', name: "Philip" },
  { id: '2', name: "Ruth", },
  { id: '3', name: "Sue", }
]

export const usersSlice = createSlice( {
  name: "users",
  initialState,
  reducers: {

  }
} )
export const { userAdded } = usersSlice.actions
export const selectAllUsers = ( state ) => state.users
export default usersSlice.reducer