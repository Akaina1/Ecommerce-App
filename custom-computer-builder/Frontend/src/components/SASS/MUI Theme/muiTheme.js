import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#A8D5E2',
      },
      secondary: {
        main: '#FFABAB',
      },
      error: {
        main: '#FFC3A0',
      },
      warning: {
        main: '#FFCC94',
      },
      info: {
        main: '#95E1D3',
      },
      success: {
        main: '#C4FCEF',
      },
    },
    typography: {
      fontFamily: 'Roboto',
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      h1: {
        fontSize: '2rem',
      },
      h2: {
        fontSize: '1.5rem',
      },
      // ...other typography settings
    },
    spacing: 4,
    overrides: {
      MuiButton: {
        root: {
          
        },
      },
    },
    custom: {
      sidebarWidth: 240,
    },        
  });

export default theme;