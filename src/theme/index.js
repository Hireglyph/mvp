export const theme = {
  breakpoints: ['350px', '640px', '1025px', '1400px', '1700px'],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    default: 'Times New Roman',
    body: 'Gotham-Book, sans-serif',
    heading: 'Open-Sans, sans-serif',
  },
  fontSizes: [10, 12, 14, 16, 20, 25, 32, 48],
  fontWeights: {
    body: 400,
    medium: 500,
    heading: 600,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    background: '#EFEFEF',
    darkBackground: '#2F4858',
    purple: '#5A3FFF',
    purple2: '#705bff',
    purple3: '#472bff',
    lightPurple: '#E0DBFE',
    lightPurpleGray: '#EBE9F3',
    orange: '#EA9A28',
    darkOrange: '#CA8522',
    lightGray: '#DFDEDE',
    mediumGray: '#464646',
    placeholderGray: 'rgba(0, 0, 0, 0.5)',
    easyGreen: '#27B12A',
    medOrange: '#EA9A28',
    hardRed: '#DA1C1C',
    brightRed: '#ff7a7a',
    blue: '#2589FE'
  },
  sizes: {
    withoutHeader: 'calc(100vh - 60px)',
  },
  text: {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
    },
    medium: {
      fontFamily: 'heading',
      lineHeight: 'body',
      fontWeight: 'medium',
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      overflowWrap: 'break-word',
      fontSize: 3,
      boxSizing: 'border-box',
      scrollBehavior: 'smooth',
    },
    h1: {
      variant: 'text.heading',
      fontSize: 7,
    },
    h2: {
      variant: 'text.heading',
      fontSize: 6,
    },
    h3: {
      variant: 'text.heading',
      fontSize: 5,
      fontWeight: 'bold',
    },
    h4: {
      variant: 'text.medium',
      fontSize: 4,
    },
    h5: {
      fontWeight: 'bold',
      fontsize: '18px',
    },
  },
 };
  
 export default theme;
