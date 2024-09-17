import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './features/components/Layout';
import AddPost from './features/posts/AddPost';
import SinglePost from './features/posts/SinglePost';
import Posts from './features/posts/Posts';
import EditPost from './features/posts/EditPost';
import Users from './features/users/Users';
import PostsByUserId from './features/posts/PostsByUserId';




function App() {
  return (
    <Routes>

        <Route path='/' element={<Layout/>} >
          <Route index element={<Posts/>}/>

          <Route path='post'>
            <Route index element={<AddPost/>}/>
            <Route path=':postId' element={<SinglePost/>} />            
          </Route>
          <Route path='edit'>
            <Route path=':postId' element={<EditPost/>}/>
          </Route>
          <Route path='users'>
            <Route index element={<Users/>}/>
            <Route path=':userId' element={<PostsByUserId/>}/>
          </Route>

        </Route>
          <Route path='*' element={<Navigate to='/'/>}/>
          


    </Routes>
   
  );
}

export default App;
