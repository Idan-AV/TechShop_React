import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { ALL_PRODUCTS } from '../infra/urls'
import { itemsContext, setItemsContext } from '../ItemsContext'
import ItemsList from '../ItemsList/ItemsList'
import { SetNotificationContext } from '../NotificatinContext'

const HomePage = () => {
  const items = useContext(itemsContext)
  const setItems = useContext(setItemsContext)
  const setNotification = useContext(SetNotificationContext)
  const fetchData = async ()=>{
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
    <ItemsList items={items} loadMore={fetchData}/>
    </>
  )
}

export default HomePage