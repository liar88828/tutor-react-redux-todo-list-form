import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { selectAllUsers } from '../../User/action';
import { addNewPosts } from '../action';

import { useNavigate } from 'react-router-dom'

export function Create ()
{
  const [ title, setTitle ] = useState( '' );
  const [ context, setContext ] = useState( '' );
  const [ userId, setUserId ] = useState( '' );
  const [ addRequest, setAddRequest ] = useState( 'idle' );
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const canSave = [ title, context, userId ].every( Boolean ) && addRequest === 'idle';

  const users = useSelector( selectAllUsers );
  const onSavePostClicked = () =>
  {
    if ( canSave )
    {
      try
      {
        setAddRequest( 'pending' );
        dispatch( addNewPosts( {
          title, body: context,
          userId //: nanoid()
        } ) )
          .unwrap();
        setTitle( '' );
        setContext( '' );
        setUserId( '' );
        navigate( `/` )
      } catch ( error )
      {
        console.log( 'failed to save the post', error );
      } finally { setAddRequest( 'idle' ); }
    }
  };

  const usersOption = users.map( u => <option key={ u.id }
    value={ u.id }> { u.name } </option>
  );

  return (
    <div className="">
      <section className='card bg-base-300'>
        <div className="card-body">
          <h1 className='card-title'>Form Post</h1>
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
                Post Title
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
                onChange={ e => setUserId( e.target.value ) }
                className="select select-primary w-full max-w-xs">
                <option disabled selected
                  value=''

                >

                  What is the best TV show?</option>
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
  );
}
