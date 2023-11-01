import { useSelector, } from 'react-redux'
import Excerpt from '../Post/Card/Excerpt';
import
{
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  selectPostIds,
} from './action';

export default function Index ()
{
  const orderPostId = useSelector( selectPostIds )
  const postStatus = useSelector( getPostsStatus )
  const postsError = useSelector( getPostsError )


  let content;

  if ( postStatus === 'loading' )
  {

    content = <p>loading...</p>
  } else if ( postStatus === 'success' )
  {
    // const orderedPosts = orderPostId.slice().sort( ( a, b ) => b.date.localeCompare( a.date ) )

    content = orderPostId
      .map( postId =>
      {
        // console.log( postId )
        return ( 
            <Excerpt
          key={ postId }
          postId={ postId }
          />
        )
      }
      )
  } else if ( postStatus === 'failed' )
  {
    content = <p>{ postsError }</p>
  }

  return <section className='flex flex-row m-5 gap-5'>
    {/* <Form /> */ }
    <div className="card bg-base-300">
      <div className="card-body">
        <h2 className='card-title'>Posts</h2>
        { content }
      </div>
    </div>
  </section>;
}


