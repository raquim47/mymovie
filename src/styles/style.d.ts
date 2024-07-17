import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      black: {
        light: string;
        middle: string;
        dark: string;
        normal: string;
      };
      white: {
        dark: string;
        normal: string;
      };
      gray: string;
      purple: {
        dark: string;
        normal: string;
      };
    };

    zIndex: {
      initialDetailBox: number;
      topMenu: number;
      rateStar: number;
      popup: number;
      dropdownMenu: number;
    };
  }
}
