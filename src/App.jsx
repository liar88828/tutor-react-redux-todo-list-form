// import Counter from './lib/redux/reducer/Counter/Index.jsx'
import Layout from './components/Layout.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import SinglePost from './lib/redux/reducer/Post/Card/SinglePost.jsx'
import AddFormPost from './lib/redux/reducer/Post/Index.jsx'
import TodoList from './lib/redux/reducer/Todo/Index.jsx'
import { Create } from './lib/redux/reducer/Post/Form/Create.jsx'
import { Edit } from './lib/redux/reducer/Post/Form/Edit.jsx'
import UserList from './lib/redux/reducer/User/List.jsx'
import UserPage from './lib/redux/reducer/User/UserPage.jsx'


function App ()
{
  return (
    <Routes>
      <Route path='/' element={ <Layout /> }>

        <Route index element={ <AddFormPost /> } />

        <Route path='post'>
          <Route index element={ <Create /> } />
          <Route path=':postId' element={ <SinglePost /> } />
          <Route path='edit/:postId' element={ <Edit /> } />
        </Route>


        <Route path='user'>
          <Route index element={ <UserList /> } />
          <Route path=':userId' element={ <UserPage /> } />
        </Route>

        <Route path='todo'>
          <Route index element={ <TodoList /> } />
          {/* <Route path=':userId' element={ <UserPage /> } /> */}
        </Route>


        {/* 404 Catch All replace with code 404 component if you want */ }
        <Route path='*' element={ <Navigate to={ '/' } replace /> } />


      </Route>
    </Routes>
  )
}

export default App
