import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from '@reduxjs/toolkit/dist'
import { sub } from 'date-fns'
const POST_URL = 'https://jsonplaceholder.typicode.com/posts'

const postsAdapter = createEntityAdapter( {
  sortComparer: ( a, b ) => b.date.localeCompare( a.date )
} )
const initialState = postsAdapter.getInitialState( {
  // posts: [],
  status: "idle",//'loading'|'success'|'failed'
  error: null,
  count: 0
} )

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

// postAdded: {
//   reducer( state, action )
//   {
//     state.posts.push( action.payload )
//   },
//   prepare( title, context, userId )
//   {
//     // console.log( userId )
//     return {
//       payload: {
//         id: nanoid(),
//         title,
//         context,
//         userId,
//         date: new Date().toISOString(),
//         reactions: reaction
//       }
//     }
//   }
// },

export const postsSlice = createSlice( {
  name: "posts",
  initialState,
  reducers: {
    // postAdded: ( state, action ) => { state.push( action.payload ) }, //old



    reactionAdded ( state, action )
    {
      const { postId, reaction } = action.payload
      // const exist = state.posts.find( p => p.id === postId )
      const exist = state.entities[ postId ]


      if ( exist )
      {
        exist.reactions[ reaction ]++
      }
    },
    increasedCount: ( state, ) =>
    {
      state.count = state.count + 1
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
        // state.posts = state.posts.concat( loaderPosts )
        postsAdapter.upsertMany( state, loaderPosts, )
      } )
      .addCase( addNewPosts.fulfilled, ( state, action ) =>
      {
        action.payload.userId = Number( action.payload.userId )
        action.payload.date = new Date().toISOString()
        action.payload.reactions = reaction
        // console.log( action.payload )
        // state.posts.push( action.payload )
        postsAdapter.addOne( state, action.payload )
      } )
      .addCase( updatePosts.fulfilled, ( state, action ) =>
      {
        if ( !action.payload.id )
        {
          console.log( 'Update could not complete' )
          console.log( action.payload )
          return
        }
        action.payload.date = new Date().toISOString()
        // const { id } = action.payload
        // const posts = state.posts.filter( post => post.id !== id );
        // state.posts = [ ...posts, action.payload ];
        postsAdapter.upsertOne( state, action.payload )


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
        // console.log( state.posts )
        // const posts = state.posts.filter( post => post.id !== id )
        // state.posts = posts
        postsAdapter.removeOne( state, id )
      } )
  }
} )

//het selector create these selector and we rename them with aliases using destructuring


export const {

  selectAll: selectAllPosts,// get all data post
  selectById: selectPostById,//get data
  selectIds: selectPostIds// get id only
} = postsAdapter.getSelectors( state => state.posts )

// export const selectAllPosts = ( state ) => state.posts.posts//delete
export const getPostsStatus = ( state ) => state.posts.status
export const getPostsError = ( state ) => state.posts.error
export const getCount = ( state ) => state.posts.count




// export const selectPostById = ( state, postId ) => state.posts.posts.find( post => post.id === postId )

export const selectPostByUser = createSelector(
  [ selectAllPosts, ( _, userId ) => userId ],
  ( posts, userId ) => posts.filter( post => post.userId === userId ) )

export const { increasedCount, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
