import { Container, List, Stack } from '@mui/material'
import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import InfiniteScroll from "react-infinite-scroller";
import { GET_SAVED_ITEMS_FOR_USER } from '../infra/urls';
import { SetNotificationContext } from '../NotificatinContext';
import { savedItemsContext, setSavedItemsContext } from '../SavedItemsContext';
import SavedSingleProduct from '../SavedSingleProduct/SavedSingleProduct';
import SingleItem from '../SingleItem/SingleItem';


const SavedItemsList = ({loadMore}) => {
  const savedItems = useContext(savedItemsContext)
  console.log('savedItems  from list',savedItems)
  // const setSavedItems = useContext(setSavedItemsContext)
  // const setNotification = useContext(SetNotificationContext) 
  // const fetchData =async()=>{
  //   try{
  //     let urlToSend = GET_SAVED_ITEMS_FOR_USER
  //     if(savedItems.next){
  //       urlToSend = savedItems.next
  //     }
  //     const response = await axios.get(urlToSend)

  //     if (response.data.previous === null) {
  //       setSavedItems(response.data)
  //     } else {
  //       setSavedItems(
  //         {...savedItems,
  //           next:response.data.next,
  //           results:[...savedItems.results, ...response.data.results]
  //         }
  //       )
  //     }
  //     console.log('response',response.data)

      
  // }
  // catch(e){
  //   console.error(e)
  //   setNotification({open:true,
  //     msg:JSON.stringify(e.response.data),severity:'error'}) 
    
  // }}

  // useEffect(
  //   ()=>{
  //   fetchData()
  //   },[]
  // )
  console.log('saved items', savedItems)
  const {count, results, next} = savedItems
  const allItems =results && results.map((product)=>{
    return (
      <SavedSingleProduct key={product.id} product={product} />
    )
  })
  return (
    <>
     <Container sx={{overflow: 'auto', height: '600px', marginTop:'3em'}}>
    <List sx={{maxWidth: '100%', padding: 0}}>
        <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={next !== null}
            loader={<div className="loader" key={0}>Loading ...</div>}
            useWindow={false}>
                {allItems}
        </InfiniteScroll>
        </List>
        </Container>
        </>
  )
}

export default SavedItemsList








