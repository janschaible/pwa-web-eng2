import { Provider } from 'react-redux';
import Store from '@/js/store'

import {
  App,
  View,
} from 'framework7-react';

import routes from '../js/routes';
import getLocation from '@/js/locating'

const AppComponent = () => {
  const f7params = {
    name: 'pwa-web-eng2', // App name
    theme: 'auto', // Automatic theme detection
    id: 'pwa-web-eng2',
    // App routes
    routes: routes,
  };

  return (
    <Provider store={Store}>
      <App { ...f7params } >
        <View main className='view-main' url="/" />
      </App>
    </Provider>
  );
}
export default AppComponent;
