import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './client/App';
import { store } from './client/redux/store'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';
import './client/styles/styles.scss';
import './client/styles/normalize.scss';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import Spinner from './client/components/common/Spinner/Spinner';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const persistor = persistStore(store)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);