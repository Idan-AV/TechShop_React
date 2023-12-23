import { Button, Container, Grid, IconButton, Paper, Stack, Typography } from "@mui/material"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import CircleProgress from "../CircleProgress/CircleProgress"
import Drawer from "../MyDrawer/MyDrawer"
import { ALL_SAVED_ITEMS_IDS_FOR_USER, GET_SAVED_ITEMS_FOR_USER, GET_SAVED_ITEM_BY_ID, PRODUCT_BY_ID } from "../infra/urls"
import './ProductDetail.css'
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';
import { useContext } from "react"
import { UserContext } from "../UserContext"
import { SavedItemsFunctionContext } from "../SavedItemsContext"


const ProductDetail=() => {
    const {productId} = useParams()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [product, setProduct] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const user = useContext(UserContext)
    const getSavedItems = useContext(SavedItemsFunctionContext)
    console.log('product:',product)

    const addToCart=async()=>{
      console.log('id', product.id)
      const savedIds = await axios.get(ALL_SAVED_ITEMS_IDS_FOR_USER)
      console.log('list',savedIds.data.includes(product.id))
      if(savedIds.data.includes(product.id)){
      console.log('inside if')
      const responseSavedItem = await axios.get(`${GET_SAVED_ITEM_BY_ID}${product.id}`)
        const savedItemResponse = await axios.patch(`${GET_SAVED_ITEM_BY_ID}${product.id}`,
          {'cart_quantity':responseSavedItem.data.cart_quantity +quantity
      })
      console.log('saved item:',savedItemResponse.data)
      await getSavedItems()
    }

      else{
      
      console.log('inside else')
      const response = await axios.post(GET_SAVED_ITEMS_FOR_USER,{item:product.id,user:user.user.id,'cart_quantity':quantity})
      await getSavedItems()

         

      }

      setIsOpen(true)
    }
    const  state1 = {
        data: [
          { id: 1, name: 'storage',price:product.storage },
          { id: 2, name: 'description', price: product.description },
          { id: 3, name: 'model', price: product.model },
          { id: 4, name: 'category', price: product.category },
          { id: 5, name: 'color', price: product.color },
          { id: 6, name: 'company', price: product.company_name },

        ]
      };
    useEffect(
        ()=>{
            const fetchData =async()=>{
                console.log(productId)
                const response = await axios.get(`${PRODUCT_BY_ID}${productId}`)
              
                setProduct(response.data)
                setIsLoading(false)

            }
            fetchData()
        },
        [productId]
    )
  return( 
 <>
 {!isLoading&&
 <Stack direction={'column'} maxWidth={'50em'} margin={'auto'}>
 <Grid container spacing={2}>
      <Grid  item xs={12} md={6}>
          <img src={product.img_url} style={{ maxWidth: '100%', height: 'auto' }} />
      </Grid>
      <Grid marginTop={'3em'} item xs={12} md={6}>
          <Typography variant="h4">{`${product.company_name} ${product.model} ${product.storage} ${product.price}₪`}</Typography>
          {user?.user &&
          <Button onClick={()=>{navigate('/purchasing')}}   sx={{marginTop:'2em' , maxWidth:'20em'}} variant="contained">BUY NOW</Button>}
          
          <Stack marginTop={'2em'} direction={'row'}>
            {user?.user &&
            <>
          <h3>Qty:</h3>
        <IconButton disabled={quantity===product.quantity} onClick={()=>{setQuantity(prev=>prev+1)}}>
          <AddTwoToneIcon/>
        </IconButton>
        <h4>{quantity}</h4>
        <IconButton disabled={quantity===1} onClick={()=>{setQuantity(prev=>prev-1)}}>
          <RemoveTwoToneIcon/>
        </IconButton>
        </>}
        {user?.user &&
        <Button onClick={addToCart}>Add to cart</Button>}

          </Stack>
      </Grid>
    </Grid>
    <h3>{`description : ${product.description}`}</h3>
    <div className="table-container">

        <table>
          <thead>

          </thead>
          <tbody>
            {state1.data.map(item => (
              <tr key={item.id}>
                {/* <td>{item.id}</td> */}
                <td>{item.name}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
 </Stack>}
 {isLoading &&
 <CircleProgress/>

 }
 
 {isOpen&&
<Drawer isOpen={isOpen} setIsOpen={setIsOpen}/>

 }


 </>
  )
}

export default ProductDetail