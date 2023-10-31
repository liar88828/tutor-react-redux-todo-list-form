import { createSlice, nanoid } from '@reduxjs/toolkit/dist'
import { sub } from 'date-fns'

const reaction = {
  thumbsUp: 0,
  wow: 0,
  heart: 0,
  rocket: 0,
  coffee: 0
}

const initialState = [
  {
    id: '1',
    title: "Learning Redux Toolkit",
    context: "Lorem ipsum dolor sit, amet consectetur",
    date: sub( new Date, { minutes: 10 } ).toISOString(),
    reactions: reaction
  },
  {
    id: '2',
    title: "slices",
    context: "  tenetur esse iusto sit eligendi",
    date: sub( new Date, { minutes: 20 } ).toISOString(),
    reactions: reaction


  }
]

export const postsSlice = createSlice( {
  name: "posts",
  initialState,
  reducers: {
    // postAdded: ( state, action ) => { state.push( action.payload ) }, //old

    postAdded: {
      reducer ( state, action )
      {
        state.push( action.payload )
      },

      prepare ( title, context, userId )
      {
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
      const exist = state.find( p => p.id === postId )
      if ( exist )
      {
        exist.reactions[ reaction ]++
      }

    }
  }
} )
export const { postAdded, reactionAdded } = postsSlice.actions
export const selectAllPosts = ( state ) => state.posts
export default postsSlice.reducer