import { useSelector } from "react-redux"
import { selectAllUsers } from "./action"

export default function Index ( { userId } )
{

  const users = useSelector( selectAllUsers )
  // console.log(users)
  const author = users.find( user => user.id === userId )
  // console.log(author)
  return (
    <p>by <span className="badge badge-primary">
      { author ? author.name : "Unknown Name" }
    </span>
    </p>
  )
}
