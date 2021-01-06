import { createTheme } from '@codedoc/core/transport';


export const theme = /*#__PURE__*/createTheme({
  light: {
    primary: '#fa26a0',
  },
  dark: {
    primary: '#a3f7bf',
    background: 'rgb(13, 17, 23)',
  },
  toc: {
    dark: {
      background: 'rgb(18, 23, 32)',
      border: 'rgb(18, 23, 32)'
    }
  },
  quote: {
    dark: {
      background: 'rgb(18, 23, 32)',
      border: '#162447',
    }
  },
  code: {
    wmbar: false,
    dark: {
      shadow: 'none',
      background: '#1B1B2F',
      lineHighlight: '#162447',
      lineHover: '#162447',
    },
    light: {
      shadow: 'none',
      background: '#1B1B2F',
      lineHighlight: '#162447',
      lineHover: '#162447',
    }
  }
});
