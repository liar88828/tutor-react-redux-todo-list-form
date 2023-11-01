import { useSelector } from "react-redux"
import { selectAllUsers } from "./action"
import { Link } from "react-router-dom"

export default function UserList ()
{
  const users = useSelector( selectAllUsers )
  const renderUsers = users.map( ( u, i ) => (
    <li className="card bg-base-300 mt-2"
      key={ u.id }>
      <div className="card-body">
        <Link
          className="card-title"
          to={ `/user/${ u.id }` } > { i + 1 }. { u.name }</Link>
      </div>
    </li>
  ) )


  return (
    <section className="card border border-primary">
      <div className="card-body">
        <h2 className="card-title">User</h2>
        <ul >{ renderUsers }</ul>
      </div>
    </section>
  )
}
