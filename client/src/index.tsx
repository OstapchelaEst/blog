import Loding from 'components/UI/isLoadingOverlay';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { setupStore } from 'store/store';
import App from './App';
import './styles/gloabal-styles.scss';

const store = setupStore();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Loding />
    </BrowserRouter>
  </Provider>
);
