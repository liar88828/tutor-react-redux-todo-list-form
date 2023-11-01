// import Counter from './lib/redux/reducer/Counter/Index.jsx'
import Layout from './components/Layout.jsx'
import { Routes, Route } from 'react-router-dom'
import SinglePost from './lib/redux/reducer/Post/Card/SinglePost.jsx'
import AddFormPost from './lib/redux/reducer/Post/Index.jsx'
import { Create } from './lib/redux/reducer/Post/Form/Create.jsx'
import { Edit } from './lib/redux/reducer/Post/Form/Edit.jsx'
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
      </Route>
    </Routes>
  )
}

export default App
