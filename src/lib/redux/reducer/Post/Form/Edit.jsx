import { useSelector, } from 'react-redux';
import { useState } from 'react';
import { selectAllUsers } from '../../User/action';
import { selectPostById, useUpdatePostMutation, useDeletePostMutation } from '../action';
import { useParams, useNavigate } from 'react-router-dom'

export function Edit ()
{
  const { postId } = useParams()
  const navigate = useNavigate()

  const [ updatePost, { isLoading } ] = useUpdatePostMutation()
  const [ deletePost ] = useDeletePostMutation()

  const post = useSelector( state => selectPostById( state, Number( postId ) ) )

  const users = useSelector( selectAllUsers );

  const [ title, setTitle ] = useState( post.title );
  const [ context, setContext ] = useState( post.body );
  const [ userId, setUserId ] = useState( post.userId );

  if ( !postId )
  {
    return (
      <section className='text-red-200'>
        <h2>Post not Found!</h2>
      </section>
    )
  }

  const canSave = [ title, context, userId ].every( Boolean ) && !isLoading

  const onSavePostClicked = async () =>
  {
    if ( canSave )
    {
      try
      {
        // console.log(
        //   {
        //     title,
        //     body: context,
        //     id: Number( userId ),
        //     userId: Number( userId ),
        //     reactions: post.reactions
        //   }
        // )
        await updatePost( {
          title,
          body: context,
          id: Number( userId ),
          userId: Number( userId ),
          reactions: post.reactions
        } )
          .unwrap();


        setTitle( '' );
        setContext( '' );
        setUserId( '' );
        navigate( `/` )
        // navigate( `/post/${ postId }` )

      } catch ( error )
      {
        console.log( 'failed to save the post', error );
      }
    }
  };

  const usersOption = users.map( u => <option key={ u.id }
    value={ u.id }> { u.name } </option>
  );

  const onDeletePost = async () =>
  {
    try
    {
      await deletePost( { id: post.id } ).unwrap()
      setTitle( '' );
      setContext( '' );
      setUserId( '' );
      navigate( `/` )

    } catch ( error )
    {
      console.log( 'Fail to Delete the post', error )
    }
  }

  return (
    <div className="">
      <section className='card bg-base-300'>
        <div className="card-body">
          <h1 className='card-title'>Form Edit</h1>
          <form>
            <label htmlFor="title" className='form-control'>
              <span className='label'>
                Post Title
              </span>
              <input type="text"
                value={ title }
                className='input input-primary'
                onChange={ ( e ) => { setTitle( e.target.value ); } } />
            </label>

            <label htmlFor="context" className='form-control'>
              <span className='label'>
                Post Context
              </span>
              <textarea
                className='textarea textarea-primary'
                value={ context }
                maxLength={ 100 }
                onChange={ ( e ) => { setContext( e.target.value ); } } />
            </label>

            <label htmlFor="context" className='form-control'>
              <span className='label'>
                Select User
              </span>
              <select
                value={ userId }
                // defaultValue={ '' }
                onChange={ e => setUserId( e.target.value ) }
                className="select select-primary w-full max-w-xs">
                <option
                  disabled

                  value=''>Select Option</option>
                { usersOption }
              </select>
            </label>
            <div className="card-actions mt-2">

              <button
                type='button'
                onClick={ onSavePostClicked }
                disabled={ !canSave }
                className='btn btn-primary'>Edit</button>

              <button
                type='button'
                onClick={ onDeletePost }
                disabled={ !canSave }
                className='btn btn-error'>Delete</button>
            </div>

          </form>
        </div>
      </section>
    </div>
  );
}
