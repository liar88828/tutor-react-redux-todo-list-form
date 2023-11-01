import { createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../../apis"

const todosAdapter = createEntityAdapter( {
  sortComparer: ( a, b ) => b.date.localeCompare( a.date )
} )

todosAdapter.getInitialState()

export const extendedApiTodos = apiSlice.injectEndpoints( {
  endpoints: ( builder ) => ( {

    getTodos: builder.query( {
      query: () => '/todos',
      transformResponse: res => res.sort( ( a, b ) => b.id - a.id ),
      providesTags: [ 'Todos' ],
    } ),

    addTodo: builder.mutation( {
      query: ( todo ) => ( {
        url: '/todos',
        method: 'POST',
        body: todo
      } ),
      invalidatesTags: [ 'Todos' ],

    } ),

    updateTodo: builder.mutation( {
      query: ( todo ) => ( {
        url: `/todos/${ todo.id }`,
        method: 'PATCH',
        body: todo
      } ),
      invalidatesTags: [ 'Todos' ],

    } ),

    deleteTodo: builder.mutation( {
      query: ( id ) => ( {
        url: `/todos/${ id }`,
        method: 'DELETE',
        body: id
      } ),
      invalidatesTags: [ 'Todos' ],

    } ),

  } )
} )



export const {
  useGetTodosQuery
  , useAddTodoMutation
  , useDeleteTodoMutation
  , useUpdateTodoMutation
} = extendedApiTodos