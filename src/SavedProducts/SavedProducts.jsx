import axios from 'axios'
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { GET_SAVED_ITEMS_FOR_USER } from '../infra/urls'
import { SetNotificationContext } from '../NotificatinContext'
import { savedItemsContext, setSavedItemsContext } from '../SavedItemsContext'
import SavedItemsList from '../SavedItemsList/SavedItemsList'

const SavedProducts = () => {
  const savedItems = useContext(savedItemsContext)
  const setSavedItems = useContext(setSavedItemsContext)
  const setNotification = useContext(SetNotificationContext) 
  const fetchData =async()=>{
    try{
      let urlToSend = GET_SAVED_ITEMS_FOR_USER
      if(savedItems.next){
        urlToSend = savedItems.next
      }
      const response = await axios.get(urlToSend)

      if (response.data.previous === null) {
        setSavedItems(response.data)
      } else {
        setSavedItems(
          {...savedItems,
            next:response.data.next,
            results:[...savedItems.results, ...response.data.results]
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
    },[]
  )
  console.log('saved items', savedItems)
  return (
    <>
    <SavedItemsList items={savedItems} loadMore={fetchData}/>
    </>
  )
}

export default SavedProducts