import './App.css'
import { useState, useEffect, use } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth/auth';
import {login,logout} from './store/authSlice';
import {Header, Footer} from './components/index';
import { Browser } from 'appwrite';
import { BrowserRouter } from 'react-router-dom';


function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((user) => {
        if(user){
            dispatch(login(user));
        }
        else{
          dispatch(logout());
        }
    })
    .catch(()=>{
      dispatch(logout());
    })
    .finally(()=>{
      setLoading(false);
    })
  }, []);


return loading ? (
  <div>
    <h2>Loading...</h2>
  </div>
):(
  <BrowserRouter>
  <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header />
      <Footer />
    </div>
  </div>
  </BrowserRouter>
);
}


export default App
