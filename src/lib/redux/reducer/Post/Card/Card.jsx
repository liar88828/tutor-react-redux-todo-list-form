import { TimeAgo } from '../TimeAgo'
import { ReactionButton } from '../ReactionButton'
import UserPost from '../../User/Index'
import { Link } from 'react-router-dom'
// import { memo } from 'react'
const Card = ( { post, page = '', id = '' } ) =>
{
  return (
    <article
      className='card card-compact bg-base-200'
    >
      <div className="card-body">
        <h3 className='card-title'>{ post.title }</h3>
        <p className='line-clamp-4 '>{ post.body }</p>
        <div className="flex flex-row">
          { page !== 'single' &&
            <Link
              className=' badge badge-secondary btn-sm'
              to={ `post/${ post.id }` }>View Post</Link>
          }
          { id !== '' &&
            <Link
              className=' badge badge-secondary btn-sm'
              to={ `/post/edit/${ post.id }` }>View Edit</Link>
          }
          <UserPost userId={ post.userId } />
          <TimeAgo timeStamp={ post.date } />
        </div>
        <ReactionButton post={ post } />
      </div>
    </article>
  )
}

// Card = memo( Card )
export default Card