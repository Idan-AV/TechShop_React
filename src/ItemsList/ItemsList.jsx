import { Container, List, Stack } from '@mui/material'
import React from 'react'
import InfiniteScroll from "react-infinite-scroller";
import SingleItem from '../SingleItem/SingleItem';


const ItemsList = ({items, loadMore}) => {
  const {count, results, next} = items
  const allItems =results && results.map((product)=>{
    return (
      <SingleItem key={product.id} product={product} />
    )
  })
  return (
    <>
     <Container sx={{overflow: 'auto', height: '600px', marginTop:'3em'}}>
    <List sx={{maxWidth: '100%', padding: 0}}>
        <InfiniteScroll
        style={{justifyContent: 'space-around',display:'flex', flexDirection:'row',flexWrap: 'wrap',maxWidth:'100em',margin:'auto'}}
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

export default ItemsList