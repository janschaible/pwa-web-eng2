import React from 'react';
import {
  Page,
  Navbar,
  NavTitle,
  NavTitleLarge
} from 'framework7-react';
import MapComponent from '/components/Map/MapComponent'

const HomePage = () => (
  <Page name="home">
    {/* Top Navbar */}
    <Navbar large>
      <NavTitle>pwa-web-eng2</NavTitle>
      <NavTitleLarge>pwa-web-eng2</NavTitleLarge>
    </Navbar>
    <MapComponent/>
  </Page>
);
export default HomePage;
