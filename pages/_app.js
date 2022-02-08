import '../styles/globals.css'
import { ThemeProvider } from '@mui/material/styles';
import {theme} from '../utils/style'
import {StoreProvider} from '../utils/Store'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider>
       <Component {...pageProps} />
      </StoreProvider>
    </ThemeProvider>
  )
}

export default MyApp
