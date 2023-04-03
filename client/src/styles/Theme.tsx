import {extendTheme, StyleFunctionProps} from "@chakra-ui/react";
import {mode} from "@chakra-ui/theme-tools";

const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      "html, body": {
        background: mode('white', 'black')(props),
        scrollBehavior: 'smooth',
      },

      "h1, h2, h3, h4, h5, h6, p, a": {
        color: mode('#1a1a1a', '#f2f2f2')(props),
      }
    }),
  },

  colors: {
    brand: {
      red: '#f04052',
    },
    background: {
      light: 'white',
      dark: 'black',
    },
    backgroundAccent: {
      light: '#F9F9F9',
      dark: '#050505',
    },
    backgroundHighlight: {
      light: '#ffffff',
      dark: '#0d0d0d',
    },
    text: {
      light: '#1a1a1a',
      dark: '#f2f2f2',
    },
    textMuted: {
      light: '#AAAAAA',
      dark: '#AAAAAA',
    },
    danger: {
      light: 'rgb(255, 59, 48)',
      dark: 'rgb(255, 69, 58)',
    },
    warning: {
      light: 'rgb(255, 149, 0)',
      dark: 'rgb(255, 159, 10)',
    },
    success: {
      light: 'rgb(52, 199, 89)',
      dark: 'rgb(48, 209, 88)',
    },
    info: {
      light: 'rgb(0, 122, 255)',
      dark: 'rgb(10, 132, 255)',
    },
    gray: {
      50: 'rgb(242, 242, 247)',
      100: 'rgb(229, 229, 234)',
      200: 'rgb(209, 209, 214)',
      300: 'rgb(199, 199, 204)',
      400: 'rgb(174, 174, 178)',
      500: 'rgb(142, 142, 147)',
      600: 'rgb(99, 99, 102)',
      700: 'rgb(72, 72, 74)',
      800: 'rgb(44, 44, 46)',
      900: 'rgb(28, 28, 30)',
    },
  }
});

export default theme;