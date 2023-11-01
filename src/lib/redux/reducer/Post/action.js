import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit/dist'
import { sub } from 'date-fns'
const POST_URL = 'https://jsonplaceholder.typicode.com/posts'

export const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😀',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕'
}

export const reaction = {
  thumbsUp: 0,
  wow: 0,
  heart: 0,
  rocket: 0,
  coffee: 0
}



const FetchApi = async ( method, id = '', initial = {}, ) =>
{
  try
  {
    let option = { method: method, }

    if ( method !== 'GET' && method !== 'DELETE' )
    {
      option = {
        body: JSON.stringify( initial ),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        ...option
      }
    }

    // console.log(option)
    const res = await fetch( POST_URL + `/${ id }`, option )

    // console.log( res )
    if ( method !== 'DELETE' )
    {
      return res.json()
    }
    return res
  } catch ( error )
  {
    console.error( `error ${ method }` )
    return error.message
  }
}

export const fetchPosts = createAsyncThunk( 'posts/fetchPosts', async () =>
{
  try
  {
    const res = await fetch( POST_URL )
      .then( data => data.json() )
    return res
  } catch ( error )
  {
    return error.message
  }
} )




export const addNewPosts = createAsyncThunk( 'posts/addNewPosts', async ( initialPost ) =>
{
  return FetchApi( 'POST', '', initialPost )
} )




export const updatePosts = createAsyncThunk( 'posts/updatePosts', async ( initialPost ) =>
{
  const { id, } = initialPost
  const data = await FetchApi( 'PUT', id, initialPost )
  return data
} )



export const deletePosts = createAsyncThunk(
  'posts/deletePosts',
  async ( initialPost ) =>
  {
    const { id } = initialPost
    const res = await FetchApi( 'DELETE', id )

    if ( res.ok )
    {
      return initialPost
    }
    else return {}
  } )


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
        // console.log( userId )
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
      .addCase( fetchPosts.pending, ( state, ) =>
      {
        state.status = 'loading'
      } )
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
        // console.log( action.payload )
        state.posts.push( action.payload )
      } )
      .addCase( updatePosts.fulfilled, ( state, action ) =>
      {
        if ( !action.payload.id )
        {
          console.log( 'Update could not complete' )
          console.log( action.payload )
          return
        }
        const { id } = action.payload
        action.payload.date = new Date().toISOString()
        // console.log( state.posts )

        const posts = state.posts.filter( post => post.id !== id );
        state.posts = [ ...posts, action.payload ];

      } )

      .addCase( deletePosts.fulfilled, ( state, action ) =>
      {


        console.log( action )
        if ( !action.payload.id )
        {
          console.log( 'cannot delete the this post' )
          // console.log( action.payload )
          return
        }
        const { id } = action.payload
        console.log( state.posts )
        const posts = state.posts.filter( post => post.id !== id )
        state.posts = posts
      } )
  }
} )



export const { postAdded, reactionAdded } = postsSlice.actions
export const selectAllPosts = ( state ) => state.posts.posts
export const getPostsStatus = ( state ) => state.posts.status
export const getPostsError = ( state ) => state.posts.error

export const selectPostById = ( state, postId ) => state.posts.posts.find( post => post.id === postId )

export default postsSlice.reducer
