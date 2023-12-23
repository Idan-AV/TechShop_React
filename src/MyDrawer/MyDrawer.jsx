import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import SavedProducts from '../SavedProducts/SavedProducts';
import SavedItemsList from '../SavedItemsList/SavedItemsList';
import { GET_SAVED_ITEMS_FOR_USER } from '../infra/urls';
import axios from 'axios';
import { savedItemsContext, setSavedItemsContext } from '../SavedItemsContext';
import { SetNotificationContext } from '../NotificatinContext';
import { useContext } from 'react';
import { useEffect } from 'react';



export default function MyDrawer({isOpen,setIsOpen }) {
  const savedItems = useContext(savedItemsContext)
  const setSavedItems = useContext(setSavedItemsContext)
  const setNotification = useContext(SetNotificationContext)
  console.log('drawer open')
  const fetchData =async()=>{
    console.log('inside fetchData')
    try{
      console.log('inside try')
      let urlToSend = GET_SAVED_ITEMS_FOR_USER
      if(savedItems.next){
        urlToSend = savedItems.next
      }
      const response = await axios.get(urlToSend)
      console.log('response:',response.data)


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
      console.log('response',response.data)

      
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

    console.log('saved items',savedItems)


    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: isOpen,
    });
    
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return ;
      }
  
      setState({ ...state, [anchor]: open });
    };
  
    const list = (anchor) => (
      <Box
        sx={{ width:'23.5em' }}
        role="presentation"
        onClick={()=>{}}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          <IconButton onClick={()=>{setIsOpen(false)}}>
            <CloseIcon/>
          </IconButton>
          <h2 style={{textAlign:'center'}} >My Cart:</h2>
        </List>
        <Divider />
        <List>
         {/* <SavedProducts/> */}
         
         <SavedItemsList loadMore={fetchData} savedItems={savedItems}/>
        </List>
      </Box>
    );
  
    return (
      <div>
        {['left', 'right', 'top', 'bottom'].map((anchor) => (
          <React.Fragment key={anchor}>
            {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={()=>{setIsOpen(false)}}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    );
  }