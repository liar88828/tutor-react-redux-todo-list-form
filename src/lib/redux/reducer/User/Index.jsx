import { useSelector } from "react-redux"
import { selectAllUsers } from "./action"

export default function Index ( { userId } )
{
  const users = useSelector( selectAllUsers )
  const author = users.find( user => user.id === userId )

  return (
    <p>by <span className="badge badge-primary">
      { author ? author.name : "Unknown Name" }
    </span>
    </p>
  )
}
