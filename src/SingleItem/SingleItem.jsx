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

const SingleItem = ({product}) => {
  const user = useContext(UserContext)
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(0)
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
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      {user.user &&
      <Stack direction={'row'} gap={'1em'}>
        <IconButton>
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
        <IconButton disabled={quantity===0} onClick={()=>{setQuantity(prev=>prev-1)}}>
          <RemoveTwoToneIcon/>
        </IconButton>

      </Stack>}
    </Card>  
    )
}

export default SingleItem