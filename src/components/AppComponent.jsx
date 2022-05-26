import React from 'react';

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
      <App { ...f7params } >
        <View main className="view-main" url="/" />
      </App>
    </PWAContextProvider>
  );
}
export default AppComponent;
