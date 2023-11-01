import { useState } from "react"
import
{
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation
} from "../../reducer/Todo/action.js"


const Index = () =>
{
  const [ newTodo, setNewTodo ] = useState( '' )
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery()


  const [ addTodo ] = useAddTodoMutation()
  const [ updateTodo ] = useUpdateTodoMutation()
  const [ deleteTodo ] = useDeleteTodoMutation()

  // console.log(
  //   todos,
  //   // isLoading,
  //   // isSuccess,
  //   // isError,
  //   // error,
  // )

  const handleSubmit = ( e ) =>
  {
    e.preventDefault()
    // console.log( newTodo )
    addTodo( {
      userId: 1,
      title: newTodo,
      complete: false
    } )
    setNewTodo( '' )
  }


  const newItemSection = (
    <form
      onSubmit={ handleSubmit }
      className="card bg-base-200">
      <div className="card-body">
        <h1 className="card-title"> New Todo List </h1>

        <label
          htmlFor="new-todo"
          className="form-control">
          <span className="label">Enter New Todo</span>
          <input type="text"
            name="new-todo"
            value={ newTodo }
            className="input input-primary"
            onChange={ e => setNewTodo( e.target.value ) }
          />
        </label>
        <div className="card-action">
          <button className="btn btn-primary">
            Add
          </button>

        </div>
      </div>
    </form >
  )
  let content


  if ( isLoading )
  {
    content = <p>
      <span className="loading loading-spinner"> </span>
      Loading...
    </p>
  } else if ( isSuccess )
  {
    content = todos.map( t => ( <article
      key={ t.userId + t.title }
      className="card card-side mt-2  bg-base-300">
      <div className="card-body flex flex-row">
        <h2 className="card-title">{ t.title }</h2>
        <p>{ t.complete }</p>
        <div className="card-actions flex items-center">
          <input type="checkbox"
            checked={ t.complete }
            id={ t.id }
            className="checkbox checkbox-primary"
            onChange={ () => updateTodo( {
              ...t,
              complete: !t.complete
            } ) } />

          <button
            type="button"
            onClick={ () => deleteTodo( t.id ) }
            className="btn btn-error btn-circle btn-sm ">
            <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
          </button>
        </div>

      </div>
    </article> ) )


  } else if ( isError )
  {
    content = <p>{ error }</p>
  }

  return (
    <main>
      <h1>Todo List</h1>
      { newItemSection }
      { content }
    </main>
  )
}

export default Index