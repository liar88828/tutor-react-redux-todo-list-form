import UserPost from '../User/Index'
import { TimeAgo } from './TimeAgo'
import { ReactionButton } from './ReactionButton'

export default function Excerpt ( { post } )
{
  // console.log(post.id)
  return (
    <article
      className='card card-compact bg-base-200'
    >
      <div className="card-body">
        <h3 className='card-title'>{ post.title }</h3>
        <p className='line-clamp-4 '>{ post.body }</p>
        <div className="flex flex-row">

          <UserPost userId={ post.userId } />
          <TimeAgo timeStamp={ post.date } />
        </div>
        <ReactionButton post={ post } />
      </div>
    </article>
  )
}


export const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😀',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕'
}


