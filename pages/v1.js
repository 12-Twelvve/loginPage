import { useContext,} from 'react';
import Head from 'next/head';
import { useFormik } from 'formik'; 
import { Box, Button, Checkbox, Container, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import NextLink from 'next/link'
import PhoneInput from 'react-phone-input-2'
import "react-phone-input-2/lib/style.css";
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Store } from '../utils/Store';
import axios from 'axios';


const Home = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [phonenumber, setphonenumber] = useState('');
  const {dispatch} = useContext(Store);
  const url = 'http://3.135.237.248:5222/v0.0.1/auth/login';
  const formik = useFormik({
    initialValues: {
      password: '',
      rememberme:false,
    },
    validate:values=>{
      const errors = {}; 
      if(!values.password){
        errors.password = 'Required!'
      } 
      if(values.password.length < 6){
        errors.password = 'Hint: minimum of 6 character '
      }    
      return errors;
     }
  });
 

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit =async(e)=>{
    e.preventDefault();
    await axios.post(url, {phoneNumber:phonenumber, password:formik.values.password}, {
      headers: {
      'Content-Type': 'application/json',
      'cb-client-api-key': '6df22a6a-c971-493f-9161-6ecfc72ddc35'
       },
      }).then((response) => {
       console.log(response.data)
       dispatch({type:'USER_LOGIN', payload:data});
      }).catch((error) => {
      console.log(error)
      })  

  }
  return (
    <>
      <Head>
        <title>Login </title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                variant="h4"
              >
                Login
              </Typography>
             
            </Box>
            <Typography
             variant="caption"
             color='text.secondary'
            >
              Phone Number
            </Typography>
            {/* phone input */} 
            <PhoneInput
                InputProps={{
                  name:'phone',
                  id:'phone',
                  required: true,
                  autoFocus: true,
                }}
                disableCountryCode='true'
                value={phonenumber}
                onChange={(value)=>(setphonenumber(value))}
                name='phone'
                country="np"
                placeholder="Enter Phone Number"
                containerStyle={{
                width: "100%"
                }}
                inputStyle={{
                  variant:'outlined',
                  height: 60,
                  borderwidth:1 ,
                  width: "100%",
                  borderRadius: 8,
                  fontSize: 18,
                  paddingLeft: 70,
                  color: "#444"
                }}
                buttonStyle={{
                  backgroundColor: "#fff",
                  borderLeft: 0,
                  borderTop: 0,
                  borderBottom: 0,
                  paddingLeft: 12,
                  paddingRight: 10,
                  margin:"3px 1px",
                }}                
              />
              <Typography
              sx={{
                color:'text.secondary',
                variant:'caption',
                mt:3
              }}
            >
              Password
            </Typography>
            <TextField
              color="info"
              fullWidth
              error={Boolean(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              name="password"
              placeholder="Enter Your Password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type={showPassword ? 'text' : 'password'}
              value={formik.values.password}
              variant="outlined"
              InputProps={{
                endAdornment:(
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box
              sx={{
                // alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                ml: -1,
                mb:2,
              }}
            >
              <Box sx={{alignItems: 'center', display: 'flex'}}>
              <Checkbox
                checked={formik.values.rememberme}
                name="rememberme"
                onChange={formik.handleChange}
              />
              <Typography
                color="text.secondary"
                // variant="caption"
                variant="body2"
              >
                Remember my phone number
              </Typography>
                </Box>
              <NextLink
                  href="#"
                  passHref
                >
                  <Link
                    underline="none"
                    // variant="caption"
                    variant="body2"
                  >
                    Forget Password?
                  </Link>
                </NextLink>
            </Box>
            <Box sx={{ py: 1 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                // onSubmit={formik.handleSubmit}
              >
                Submit
              </Button>
            </Box>
           
            <Typography
              color="text.secondary"
              variant="body2"
              sx={{ py: 2, }}
              align='center'
            >
              Don&apos;t have an account yet?
              {' '}
            </Typography>
            <Button
                color="info"
                fullWidth
                size="large"
                variant="contained"
              >
                Create Account
              </Button>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Home;
