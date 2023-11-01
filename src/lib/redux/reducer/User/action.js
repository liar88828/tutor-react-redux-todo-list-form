import { createSlice, createAsyncThunk } from '@reduxjs/toolkit/dist'
const USER_URL = 'https://jsonplaceholder.typicode.com/users'


const initialState = [
]

export const fetchUsers = createAsyncThunk( 'users/fetchUsers', async () =>
{
  try
  {
    const response = await fetch( USER_URL )
      .then( data => data.json() )
    return response
  } catch ( error )
  {
    return error.message
  }
} )

export const usersSlice = createSlice( {
  name: "users",
  initialState,
  reducers: {},

  extraReducers ( builder )
  {
    builder
      .addCase( fetchUsers.fulfilled, ( state, action ) =>
      {
        return action.payload
      } )

  }
} )
export const { userAdded } = usersSlice.actions
export const selectAllUsers = ( state ) => state.users
export const selectUserById = ( state, userId ) => state.users.find( u => u.id === userId )

export default usersSlice.reducer