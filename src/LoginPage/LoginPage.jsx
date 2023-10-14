import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useContext, useState } from "react";
import axios from "axios";
import { LOGIN, ME_URL } from "../infra/urls";
import { useNavigate } from "react-router-dom";
import { SetUserContext } from "../UserContext";
import { SetNotificationContext } from "../NotificatinContext";

export default function LoginPage() {

    const navigate = useNavigate()
    const setUser = useContext(SetUserContext)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const setNotification = useContext(SetNotificationContext)



  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
    const response = 
        await axios.post(LOGIN, {username: email, password: password})
    console.log(response)
    localStorage.setItem('token', response.data.access)
    
    const token = localStorage.getItem('token')
    const meResponse = await axios.get(ME_URL,
        {headers: {Authorization: `Bearer ${token}`}})
    console.log(meResponse)
    setUser({
        user: {...meResponse.data}
    })
    navigate('/')
    setNotification({open:true,
      msg:'You have succesfully logged in',severity:'success'})
  }
    catch(e){
      console.log('error',e)
    //   setNotification({open:true,msg:e.response.data.detail,severity:'error'})
    }
    if(email===''||password===''){
      setNotification({open:true,msg:'sorry please fill all the fields',severity:'error'})}
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{  
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}