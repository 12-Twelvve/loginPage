import { useContext, useState} from 'react';
import Head from 'next/head';
import { useFormik } from 'formik'; 
import { Box, Button, Checkbox, Container, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import NextLink from 'next/link'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Store } from '../utils/Store';
import axios from 'axios';


const Home = () => {
   const [showPassword, setShowPassword] = useState(false);
  const {dispatch} = useContext(Store);
  const url = 'http://3.135.237.248:5222/v0.0.1/auth/login';
  const formik = useFormik({
    initialValues: {
      phonenumber:'',
      password: '',
      rememberme:false,
    },
    onSubmit:async (values)=>{
        await axios.post(url, {phoneNumber:values.phonenumber, password:values.password}, {
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
    },
    validate:values=>{
      const errors = {}; 
      const phLen = values.phonenumber.length;
      const passLen = values.password.length
      if(!values.phonenumber){
        errors.phonenumber = 'Required!'
      } 
      if(isNaN(values.phonenumber)){
          errors.phonenumber = 'Hint: Only Digital Value'
      }
      if(phLen<6 || phLen > 15){
        errors.phonenumber = 'Hint: minimum of 6 and maximum of 15 digit'
      } 
      if(!values.password){
        errors.password = 'Required!'
      } 
      if(passLen < 6){
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
          <form onSubmit={formik.handleSubmit}>
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
            <TextField
              color="info"
              fullWidth
              onWheel={event => { event.preventDefault(); }}
              error={Boolean(formik.touched.phonenumber && formik.errors.phonenumber)}
              helperText={formik.touched.phonenumber && formik.errors.phonenumber}
              name="phonenumber"
              placeholder="Enter Phone Number"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="tel"
              value={formik.values.phonenumber}
              variant="outlined"
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
                onSubmit={formik.handleSubmit}
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
