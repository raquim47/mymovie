import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}

html::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
html::-webkit-scrollbar-thumb {
  background-color: #4e4e4e;
  border-radius: 100px;
}
html::-webkit-scrollbar-track {
  background-color: #4e4e4e;
  border-radius: 100px;
  background-clip: padding-box;
  border: 3px solid transparent;
}

body {
  background-color: black;
  font-weight: 400;
  font-family: 'Source Sans Pro', sans-serif;
  color:${(props) => props.theme.color.white.dark};
  line-height: 1.2;
  overflow-x: hidden;
  
  &.scrollHidden {
  overflow-y: hidden;
  }
}

menu, ol, ul {
  list-style: none;
}

button {
  font-family: 'Source Sans Pro', sans-serif;
  color:${(props) => props.theme.color.white.dark};
  border: none;
  cursor: pointer;
}

a {
  text-decoration:none;
  color:inherit;

  &.disabled {
    pointer-events: none;
  }
}
`;
