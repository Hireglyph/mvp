export const theme = {
  breakpoints: ['640px', '1024px'],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    default: 'Times New Roman',
    body: 'Gotham-Book, sans-serif',
    heading: 'Open-Sans, sans-serif',
  },
  fontSizes: [10, 12, 14, 16, 20, 24, 32, 48],
  fontWeights: {
    body: 400,
    medium: 500,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.25,
    heading: 1.125,
  },
  colors: {
    text: '#000000',
    background: '#556B7B',
    darkBackground: '#374D5D',
    orange: '#EA9A28',
    darkOrange: '#CA8522',
    lightGrey: '#E3E3E3',
    mediumGrey: '#CACACA',
    easyGreen: '#27B12A',
    medOrange: '#DE710C',
    hardRed: '#DA1C1C',
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
    },
    h4: {
      variant: 'text.medium',
      fontSize: 4,
    },
  },
};

export default theme;
