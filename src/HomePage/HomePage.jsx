import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { ALL_PRODUCTS } from '../infra/urls'
import { itemsContext, setItemsContext } from '../ItemsContext'
import ItemsList from '../ItemsList/ItemsList'
import { SetNotificationContext } from '../NotificatinContext'
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { Fab, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { UserContext } from '../UserContext'
import { savedItemsContext, SavedItemsFunctionContext } from '../SavedItemsContext'
import { FetchDataContext } from '../fetchDataContext'


const HomePage = () => {
  const items = useContext(itemsContext)
  const setItems = useContext(setItemsContext)
  const setNotification = useContext(SetNotificationContext)
  const user = useContext(UserContext)
  const SavedItemsFunc = useContext(SavedItemsFunctionContext)
  const savedItems = useContext(savedItemsContext)
  const fetchData = async ()=>{
    console.log('user',user)
    try{
      let urlToSend = ALL_PRODUCTS
      if(items.next){
        urlToSend = items.next
      }
     
      const response = await axios.get(urlToSend)
      if (response.data.previous === null) {
        setItems(response.data)
      } else {
        setItems(
          {...items,
            next:response.data.next,
            results:[...items.results, ...response.data.results]
          }
        )
      }
      
  }
  catch(e){
    console.error(e)
    setNotification({open:true,
      msg:JSON.stringify(e.response.data),severity:'error'}) 
    
  }}

  useEffect(
    ()=>{
      fetchData()
    },
    []
  )





  return (
    <>
    <FetchDataContext.Provider value={fetchData} >
    <ItemsList items={items} loadMore={fetchData}/>
    {user?.user?.is_staff &&
    <Fab color="primary" aria-label="add" 
                sx={{position: 'absolute',bottom: 16, right: 16,}}>
                <AddIcon />
            </Fab>}
            </FetchDataContext.Provider>
    </>
  )
}

export default HomePage