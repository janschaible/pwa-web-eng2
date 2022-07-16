
import HomePage from '/pages/HomePage/HomePage.jsx';
import SettingsPage from '/pages/Settings/SettingsPage/SettingsPage.jsx'
import RecentDestinations from '/pages/Settings/RecentDestinations/RecentDestinations.jsx'
import FavoritePage from '/pages/Settings/FavoritePage/FavoritePage.jsx'

var routes = [
  {
    path: '/',
    component: HomePage,
    options: {
      transition: 'f7-cover-v',
    },
  },
  {
    path: '/settings',
    component: SettingsPage,
    options: {
      transition: 'f7-cover-v',
    },
  },
  {
    path: '/settings/recent-destinations',
    component: RecentDestinations,
    options: {
      transition: 'f7-cover-v',
    },
  },
  {
    path: '/settings/favorites',
    component: FavoritePage,
    options: {
      transition: 'f7-cover-v',
    },
  }
];

export default routes;
