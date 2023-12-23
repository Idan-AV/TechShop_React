import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, IconButton, Stack } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { useState } from 'react';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import { PRODUCT_BY_ID } from '../infra/urls';
import { FetchDataContext } from '../fetchDataContext';
import { SetNotificationContext } from '../NotificatinContext';

const SingleItem = ({product}) => {
  const user = useContext(UserContext)
  const navigate = useNavigate()
  const fetchData = useContext(FetchDataContext)
  const setNotification = useContext(SetNotificationContext)
  // const [quantity, setQuantity] = useState(1)
  const removeItem = async()=>{
    try{
    const response = await axios.delete(`${PRODUCT_BY_ID}${product.id}`)
    await fetchData()
    setNotification({open:true,
      msg:'You have succesfully deleted an item',severity:'success'})
  }
  catch(e){
    setNotification({open:true,
      msg:JSON.stringify(e.response.data),severity:'error'})

  }

  }
  return (
<Card sx={{ maxWidth: 280 ,marginBottom:'3em'}}>
      <CardActionArea onClick={()=>{navigate(`/products/${product.id}`)}}>
        <CardMedia
          component="img"
          style={{maxWidth:'17em', height:'20em',margin:'auto' }}
          image={product.img_url}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {`${product.model} ${product.storage}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <h2>{`price: ${product.price}₪`}</h2>
        </CardContent>
      </CardActionArea>
      {user.user?.is_staff &&
      <Stack direction={'row'} gap={'1em'} >
        {/* <IconButton>
          <AddShoppingCartIcon/>
        </IconButton>
        <IconButton>
        <RemoveShoppingCartIcon/>
        </IconButton>
        <h3>Qty:</h3>
        <IconButton disabled={quantity===product.quantity} onClick={()=>{setQuantity(prev=>prev+1)}}>
          <AddTwoToneIcon/>
        </IconButton>
        <h4>{quantity}</h4>
        <IconButton disabled={quantity===1} onClick={()=>{setQuantity(prev=>prev-1)}}>
          <RemoveTwoToneIcon/>
        </IconButton> */}
        <IconButton onClick={removeItem}>
          <DeleteIcon color='primary'/>
        </IconButton>

      </Stack>}
    </Card>  
    )
}

export default SingleItem