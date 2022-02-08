import { createTheme } from '@mui/material';

export const theme = createTheme({
 
  palette: {
    background: {
      default: '#F9FAFC',
      paper: '#FFFFFF'
    },
    primary: {
      main: '#FA8080',
      light: '#FA8080',
      dark: '#F50100',
      contrastText: '#FFFFFF'
    },
    info: {
      main: '#E0E0E0',
      dark:'#E7E7E7',
      contrastText: '#555',
    },
   
    text: {
      primary: '#6B7276',
      secondary: '#65748B',
      disabled: 'rgba(55, 65, 81, 0.48)'
    },


  },
  shape: {
    borderRadius: 8
  },
  
  typography: {
    button: {
      fontWeight: 600,
      textTransform:"none"
    },
    fontFamily: '"Inter",SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    // input label
    caption: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 2,
    },
    // login headline
    h4: {
      fontWeight: 500,
      fontSize: '2rem',
      lineHeight: 1.375
    },
  }
});
//
