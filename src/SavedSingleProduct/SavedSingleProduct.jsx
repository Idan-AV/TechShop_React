import { CardMedia, Divider, IconButton, Stack } from '@mui/material'
import React from 'react'
import { useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const SavedSingleProduct = ({product}) => {
  console.log('product',product)
  return (<>

      <Stack direction={'row'} maxWidth={'25em'} gap={'1em'}>
        {/* <img style={{width:'7em'}} src={product.item.img_url}/> */}
        <CardMedia
        component="img"
        sx={{ width:90 }}
        image={product.item.img_url}
        // alt="Live from space album cover"
      />
        <Stack direction={'column'}>
        <h4 style={{marginBottom:0}}>{`${product.item.company_name} ${product.item.model}`}</h4>
        <Stack direction={'row'} gap={'1em'}>
        <h4 style={{marginTop:0}}>{product.item.price}₪</h4>
        <IconButton ><AddIcon/></IconButton>
        <p >{`${product.cart_quantity}`}</p>
        <IconButton><RemoveIcon/></IconButton>

        {/* <p style={{marginTop:0}}>{`Qnt:${product.cart_quantity}`}</p> */}
        </Stack>
        </Stack>

        
      </Stack>
      <Divider style={{marginTop:'2em'}}/>

  </>
    
  )
}

export default SavedSingleProduct