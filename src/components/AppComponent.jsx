import React from 'react';

import { Provider } from 'react-redux';
import Store from '@/js/store'

import {
  App,
  View,
} from 'framework7-react';


import routes from '../js/routes';
import {PWAContextProvider} from "../js/PWAContext";

const AppComponent = () => {
  const f7params = {
    name: 'pwa-web-eng2', // App name
      theme: 'auto', // Automatic theme detection
      // App routes
      routes: routes,
  };

  return (
    <PWAContextProvider>
      <Provider store={Store}>
        <App { ...f7params } >
          <View main className="view-main" url="/" />
        </App>
      </Provider>
    </PWAContextProvider>
  );
}
export default AppComponent;
