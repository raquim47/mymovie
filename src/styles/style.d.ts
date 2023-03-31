import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    red: string;
    black: {
      black: string;
      lighter: string;
      darker: string;
      middle: string;
      borderBlack: string;
    };
    white: {
      white: string;
      darker: string;
    };
    purple: string;
    purpleDark: string;
    gray: string;

    fontSizeVw: {
      [key: string]: string;
    };
    fontSizePx: {
      [key: string]: string;
    };
  }
}
