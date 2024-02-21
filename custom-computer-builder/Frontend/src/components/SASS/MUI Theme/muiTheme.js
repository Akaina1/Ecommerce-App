import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#659B5E',
      },
      secondary: {
        main: '#556F44',
      },
      error: {
        main: '#FFC3A0',
      },
      warning: {
        main: '#FFCC94',
      },
      button: {
        main: '#95E1D3',
      },
      success: {
        main: '#C4FCEF',
      },
      logout: {
        main: '#fa9999',
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