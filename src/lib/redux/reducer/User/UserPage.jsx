import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { selectUserById } from './action'
import { useGetPostsUserIdQuery } from '../Post/action'

export default function UserPage ()
{

  const { userId } = useParams()

  const user = useSelector( state => selectUserById( state, Number( userId ) ) )

  const { data: postsForUser, isError, isSuccess, isLoading, error } = useGetPostsUserIdQuery( userId )

  // const postsForUser = useSelector( state => selectPostByUser( state, Number( userId ) ) )
  let content;
  if ( isLoading )
  {
    content = <span className='loading loading-spinner'></span>
  } else if ( isSuccess )
  {
    content = postsForUser.map( post => (
      <li key={ post.id }>
        <Link to={ `/post/${ post.id }` }>{ post.title } </Link>
      </li>
    ) )
  } else if ( isError )
  {
    content = <span className='text-red-500'> { error }</span>
  }

  return (
    <section>
      <h2 >{ user.name }</h2>
      <ol>{ content }</ol>
    </section>
  )
}
