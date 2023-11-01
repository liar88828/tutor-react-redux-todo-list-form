import { useSelector, } from 'react-redux'
import Excerpt from '../Post/Card/Excerpt';
import
{
  selectPostIds,
  useGetPostsQuery,
} from './action';

export default function Index ()
{
  const { isLoading, isError, error, isSuccess } = useGetPostsQuery();
  const orderPostId = useSelector( selectPostIds )

  let content;
  if ( isLoading === 'loading' )
  {
    content = <p>loading...</p>
  }
  else if ( isSuccess )
  {
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
  } else if ( isError )
  {
    content = <p>{ error }</p>
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


