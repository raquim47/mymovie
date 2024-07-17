import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  // color
  color: {
    black: {
      light: '#2F2F2F',
      middle: '#181818',
      dark: '#141517',
      normal: '#000',
    },
    white: {
      dark: '#d4d7db',
      normal: '#fff',
    },
    gray: '#303133',
    purple: {
      dark: '#462EB2',
      normal: '#BD69D4',
    },
  },

  // // fontSize
  // fontSizeVw: {
  //   xs: '0.8vw',
  //   s: '1.2vw',
  //   m: '1.6vw',
  //   l: '2vw',
  //   xl: '2.5vw',
  //   xxl: '3vw',
  //   '3xl': '4vw',
  //   '4xl': '6vw',
  // },
  // fontSizePx: {
  //   xxs: '10px',
  //   xs: '12px',
  //   s: '14px',
  //   m: '16px',
  //   l: '20px',
  //   xl: '24px',
  //   xxl: '28px',
  //   '3xl': '32px',
  //   '4xl': '36px',
  // },
  zIndex: {
    initialDetailBox: -1,
    topMenu: 10,
    rateStar: 1,
    popup: 100,
    dropdownMenu: 10,
  },
};
