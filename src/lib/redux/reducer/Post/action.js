import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit/dist'
import { sub } from 'date-fns'
const POST_URL = 'https://jsonplaceholder.typicode.com/posts'

export const reaction = {
  thumbsUp: 0,
  wow: 0,
  heart: 0,
  rocket: 0,
  coffee: 0
}

export const fetchPosts = createAsyncThunk( 'posts/fetchPosts', async () =>
{
  try
  {
    const res = await fetch( POST_URL ).then( data => data.json() )
    return res
  } catch ( error )
  {
    return error.message
  }
} )


export const addNewPosts = createAsyncThunk( 'posts/addNewPosts', async ( initialPost ) =>
{
  try
  {
    // console.log( initialState )
    const res = await fetch( POST_URL, {
      method: 'POST',
      body: JSON.stringify( initialPost ),
      headers: {
        'Content-Type': "application/json"
      }
    } ).then( data => data.json() )


    console.log( res )
    return res
  } catch ( error )
  {
    return error.message
  }
} )



// const initialState = [
//   {
//     id: '1',
//     title: "Learning Redux Toolkit",
//     context: "Lorem ipsum dolor sit, amet consectetur",
//     date: sub( new Date, { minutes: 10 } ).toISOString(),
//     reactions: reaction
//   },
//   {
//     id: '2',
//     title: "slices",
//     context: "  tenetur esse iusto sit eligendi",
//     date: sub( new Date, { minutes: 20 } ).toISOString(),
//     reactions: reaction
//   }
// ]

const initialState = {
  posts: [],
  status: "idle",//'loading'|'success'|'failed'
  error: null
}


export const postsSlice = createSlice( {
  name: "posts",
  initialState,
  reducers: {
    // postAdded: ( state, action ) => { state.push( action.payload ) }, //old

    postAdded: {
      reducer ( state, action )
      {
        state.posts.push( action.payload )
      },

      prepare ( title, context, userId )
      {
        console.log( userId )
        return {
          payload: {
            id: nanoid(),
            title,
            context,
            userId,
            date: new Date().toISOString(),
            reactions: reaction
          }
        }
      }
    },

    reactionAdded ( state, action )
    {
      const { postId, reaction } = action.payload
      const exist = state.posts.find( p => p.id === postId )
      if ( exist )
      {
        exist.reactions[ reaction ]++
      }
    },
  },


  extraReducers ( builder )
  {
    builder
      .addCase( fetchPosts.pending, ( state, ) => { state.status = 'loading' } )
      .addCase( fetchPosts.fulfilled, ( state, action ) =>
      {
        state.status = 'success'

        let min = 0
        const loaderPosts = action.payload.map( post =>
        {
          post.date = sub( new Date(), { minutes: min++ } ).toISOString()
          post.reactions = reaction
          return post
        } )
        state.posts = state.posts.concat( loaderPosts )
      } )
      .addCase( addNewPosts.fulfilled, ( state, action ) =>
      {
        action.payload.userId = Number( action.payload.userId )
        action.payload.date = new Date().toISOString()
        action.payload.reactions = reaction
        console.log( action.payload )
        state.posts.push( action.payload )
      }
      )
  }
} )



export const { postAdded, reactionAdded } = postsSlice.actions
export const selectAllPosts = ( state ) => state.posts.posts
export const getPostsStatus = ( state ) => state.posts.status
export const getPostsError = ( state ) => state.posts.error
export default postsSlice.reducer