import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import LoginPage from './LoginPage/LoginPage';
import UserProvider from './UserContext';
import Notification from './Notification/Notification';
import SignupPage from './SignupPage/SignupPage';
import ProductDetail from './ProductDetail/ProductDetail';
import SavedProducts from './SavedProducts/SavedProducts';
import PurchasingPage from './PurchasingPage/PurchasingPage';
import axios from 'axios';
import ProfilePage from './ProfilePage/ProfilePage';
axios.interceptors.request.use(
  (config) => {
  
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }
)



const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<HomePage/>
      },
      {
        path:'/products/:productId',
        element:<ProductDetail/>
      },
      {
        path:'/Saved-Products',
        element:<SavedProducts/>
      },
      {
        path:'/purchasing',
        element:<PurchasingPage/>
      },
      {
        path: '/Profile-Page',
        element:<ProfilePage/>
      }
  
    ]
  },
  {
    path:'/login',
    element:<LoginPage/>
  },
  {
    path:'/signup',
    element:<SignupPage/>
  }
]
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <Notification>
<RouterProvider router={router}/>
</Notification>
</UserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
