import { useSelector, useDispatch } from 'react-redux'
import { postAdded, reactionAdded, selectAllPosts } from './action';
import { useState } from 'react';
import { selectAllUsers } from '../User/action';
import UserPost from '../User/Index'
import { parseISO, formatDistanceToNow } from 'date-fns'

export default function Index ()
{
  const posts = useSelector( selectAllPosts )
  const orderedPosts = posts.slice().sort( ( a, b ) => b.date.localeCompare( a.date ) )
  const renderPosts = orderedPosts.map( post => <article
    className='card card-compact bg-base-200'
    key={ post.id }>
    <div className="card-body">
      <h3 className='card-title'>{ post.title }</h3>
      <p className='line-clamp-4 '>{ post.context }</p>
      <div className="flex flex-row">

        <UserPost userId={ post.userId } />
        <TimeAgo timeStamp={ post.date } />
      </div>
      <ReactionButton post={ post } />
    </div>
  </article>
  )

  return <section className='flex flex-row m-5 gap-5'>
    <Form />

    <div className="card bg-base-300">

      <div className="card-body">
        <h2 className='card-title'>Posts</h2>
        { renderPosts }
      </div>
    </div>
  </section>;
}

export function Form ()
{
  const [ title, setTitle ] = useState( '' )
  const [ context, setContext ] = useState( '' )
  const [ userId, setUserId ] = useState( '' )
  const dispatch = useDispatch()
  const users = useSelector( selectAllUsers )
  const onSavePostClicked = () =>
  {
    if ( title && context )
    {
      dispatch( postAdded(
        // { id: nanoid, title, context } //old
        title,
        context,
        userId,
      ) )
    }
    setTitle( '' )
    setContext( '' )
  }


  const usersOption = users.map( u => <option key={ u.id } value={ u.id }> { u.name } </option>
  )



  const canSave = Boolean( title ) && Boolean( context ) && Boolean( userId )
  return (
    <div className="">

      <section className='card bg-base-300'>
        <div className="card-body">
          <h1 className='card-title'>Form Post</h1>
          <form  >

            <label htmlFor="title" className='form-control'>
              <span className='label'>
                Post Title
              </span>
              <input type="text"
                value={ title }
                className='input input-primary'
                onChange={ ( e ) => { setTitle( e.target.value ) } } />
            </label>

            <label htmlFor="context" className='form-control'>
              <span className='label'>
                Post Title
              </span>
              <textarea
                className='textarea textarea-primary'
                value={ context }
                maxLength={ 100 }
                onChange={ ( e ) => { setContext( e.target.value ) } } />
            </label>

            <label htmlFor="context" className='form-control'>
              <span className='label'>
                Select User
              </span>
              <select
                value={ userId }
                defaultValue={ '' }
                onChange={ e => setUserId( e.target.value ) }
                className="select select-primary w-full max-w-xs" >
                <option disabled selected>What is the best TV show?</option>
                { usersOption }
              </select>
            </label>
            <div className="card-actions mt-2">

              <button
                type='button'
                onClick={ onSavePostClicked }
                disabled={ !canSave }
                className='btn btn-primary'>Summit</button>
            </div>
          </form>
        </div>
      </section>
    </div>

  )
}



export const TimeAgo = ( { timeStamp } ) =>
{
  let timeAgo = ''
  if ( timeStamp )
  {
    const date = parseISO( timeStamp )
    const timePeriod = formatDistanceToNow( date )
    timeAgo = `${ timePeriod } ago`
  }

  return (
    <span title={ timeStamp }>
      &nbsp; <i>{ timeAgo }</i>
    </span>
  )

}

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😀',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕'
}


export const ReactionButton = ( { post } ) =>
{
  const dispatch = useDispatch()
  const reactionButton = Object.entries( reactionEmoji ).map( ( [ name, emoji ] ) =>
  {
    return (
      <button key={ name }
        type='button'
        onClick={ () => dispatch( reactionAdded(
          {
            postId: post.id,
            reaction: name
          } ) ) }>
        { emoji } { post.reactions[ name ] }
      </button>
    )
  } )
  return (
    <div className='space-x-2'>
      { reactionButton }
    </div>
  )
}