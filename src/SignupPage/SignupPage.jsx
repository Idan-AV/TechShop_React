import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import { LOGIN, ME_URL, SIGNUP } from '../infra/urls';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SetUserContext } from '../UserContext';
import { SetNotificationContext } from '../NotificatinContext';



const defaultTheme = createTheme();

export default function SignUpPage() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [phoneNumber, setPhoneNumber] = useState('') 
    const [address, setAddress] =useState('')
    const setUser = useContext(SetUserContext)
    const navigate = useNavigate()
    const setNotification = useContext(SetNotificationContext)


  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
    const responseUser = await axios.post(SIGNUP,{email:email,password:password,
        address:address,
        phone_number:phoneNumber})
        // ask valeria if i can take the email value and put it in login
        // because i dont give the password back after creation
        // console.log({...responseUser.data})
        const responseLogin = 
        await axios.post(LOGIN, {username: responseUser.data.email,
     password: password})
    // console.log(responseLogin)
    localStorage.setItem('token', responseLogin.data.access)
    setUser({
        user: {...responseUser.data}
    })
    navigate('/')
    
    setNotification({open:true,
      msg:'You have succesfully signed up',severity:'success'})
  }
    catch (e){
      console.log(e.response)
      
      setNotification({open:true,msg:JSON.stringify(e.response.data),severity:'error'})

    }
    if(email===''||password===''||phoneNumber===''||address===''){
      setNotification({open:true,msg:'sorry please fill all the fields',severity:'error'})


    }

    
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-number"
                  name="phoneNumber"
                  required
                  fullWidth
                  id="phoneNumber"
                  pattern="05[0-9]{8}"
                  label="phone number"
                  autoFocus
                  onChange={(e)=>{setPhoneNumber(e.target.value)}}
                  value={phoneNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="address"
                  name="address"
                  autoComplete="address"
                  onChange={(e)=>{setAddress(e.target.value)}}
                  value={address}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e)=>{setEmail(e.target.value)}}
                  value={email}
                />
                
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e)=>{setPassword(e.target.value)}}
                  value={password}
                />
              </Grid>
              
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
