import logo from './logo.svg';
import './App.css';
import Header from './Header/Header';
import { Outlet } from 'react-router-dom';
import { itemsContext, setItemsContext } from './ItemsContext';
import { useContext, useEffect, useState } from 'react';
import { ME_URL } from './infra/urls';
import axios from 'axios';
import { SetUserContext } from './UserContext';
import Notification from './Notification/Notification';

function App() {
  const [items, setItems] = useState({results:[]})
  const setUser = useContext(SetUserContext)
  useEffect(
    () => {
      const fetchData = async () => {
        const token = localStorage.getItem('token')
        if (token) {
          const meResponse = await axios.get(ME_URL,
            {headers: {Authorization: `Bearer ${token}`}})
          console.log(meResponse)
          setUser({
            user: {...meResponse.data}
          })
        }
      }
      fetchData()
    }
  )
 return(
    <>
  <Header/>
  <br/>
  <setItemsContext.Provider value={setItems}>
  <itemsContext.Provider value={items}>
  <Outlet/>
  </itemsContext.Provider>
  </setItemsContext.Provider>
  <Notification/>
  </>
 )
}

export default App;
