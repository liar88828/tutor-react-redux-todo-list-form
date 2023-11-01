import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import Excerpt from './Excerpt';
import
{
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPosts
} from './action';
import { Form } from './Form';

export default function Index ()
{
  const dispatch = useDispatch()
  const posts = useSelector( selectAllPosts )
  const postStatus = useSelector( getPostsStatus )
  const postsError = useSelector( getPostsError )

  useEffect( () =>
  {
    if ( postStatus === 'idle' )
    {
      dispatch( fetchPosts() )
    }
  }, [ postStatus, dispatch ] )


  let content;

  if ( postStatus === 'loading' )
  {

    content = <p>loading...</p>
  } else if ( postStatus === 'success' )
  {
    const orderedPosts = posts.slice().sort( ( a, b ) => b.date.localeCompare( a.date ) )

    content = orderedPosts
      .map( post => <Excerpt
        key={ post.id }
        post={ post }
      />
      )
  } else if ( postStatus === 'failed' )
  {
    content = <p>{ postsError }</p>
  }

  return <section className='flex flex-row m-5 gap-5'>
    <Form />
    <div className="card bg-base-300">
      <div className="card-body">
        <h2 className='card-title'>Posts</h2>
        { content }
      </div>
    </div>
  </section>;
}


