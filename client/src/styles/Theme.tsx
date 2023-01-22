import {extendTheme, StyleFunctionProps} from "@chakra-ui/react";
import {mode} from "@chakra-ui/theme-tools";

const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      "html, body": {
        background: mode('white', 'black')(props),
      },

      "h1, h2, h3, h4, h5, h6, p": {
        color: mode('#f2f2f2', '#1a1a1a'),
      }
    }),
  },

  colors: {
    background: {
      light: 'white',
      dark: 'black',
    },

    backgroundAccent: {
      light: '#F9F9F9',
      dark: '#151515',
    },

    text: {
      light: '#1a1a1a',
      dark: '#f2f2f2',
    }
  }
});

export default theme;