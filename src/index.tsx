import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/grobalStyle';
import { theme } from './styles/theme';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { QueryProvider } from 'config';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <QueryProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter basename="">
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryProvider>
  </Provider>
  // </React.StrictMode>
);
