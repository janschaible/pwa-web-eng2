
import HomePage from '/pages/HomePage/HomePage.jsx';
import SettingsPage from '/pages/SettingsPage/SettingsPage.jsx'

var routes = [
  {
    path: '/',
    component: HomePage,
    options: {
      transition: 'f7-cover-v',
    },
  },
  {
    path: '/settings/',
    component: SettingsPage,
    options: {
      transition: 'f7-cover-v',
    },
  }
];

export default routes;
