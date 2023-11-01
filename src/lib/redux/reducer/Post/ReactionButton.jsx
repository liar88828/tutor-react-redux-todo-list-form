import { reactionEmoji } from '../utils';
import { useAddReactionMutation } from './action';

export function ReactionButton ( { post } )
{
  const [ reactionAdded ] = useAddReactionMutation()
  // console.log( post )
  const reactionButton = Object.entries( reactionEmoji ).map( ( [ name, emoji ] ) =>
  {
    return (
      <button key={ name }
        type='button'
        onClick={ async () => reactionAdded(
          {
            postId: post.id,
            reaction: name
          } ) }
      >
        { emoji } { post.reactions[ name ] }
      </button>
    );
  } );
  return (
    <div className='space-x-2'>
      { reactionButton }
    </div>
  );
}
