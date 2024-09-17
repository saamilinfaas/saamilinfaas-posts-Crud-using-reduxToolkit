import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fetchPosts } from './features/posts/postsSlice';
import { fetchUsers, selectAllUsers } from './features/users/userSlice';


store.dispatch(fetchPosts());
store.dispatch(fetchUsers());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  
  
    <Provider store={store}>
      <Router>
        <Routes>
          
            <Route path='/*' element={<App />}/>
          
        </Routes>      
      </Router>
    </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

