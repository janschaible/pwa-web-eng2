import { coords } from './wikiExchange';

export function findWikiEntries(lat, lon, mapZoom) {
  //const [lat, setLatitude] = React.useState('');
  //const [lon, setLongitude] = React.useState('');
  //const [set, setName] = React.useState('');
  coords();
  // const lat = coords.lat;
  // const lon = coords.lon;
  const collection = [];
  //setLatitude(coords.lat);
  //setLongitude(coords.lon);
  var gsradius;
  var maxfinds;
  if (mapZoom <= 10) {
    gsradius = 500;
  } else if (mapZoom >= 10 && mapZoom <= 18) {
    gsradius = 0;
    maxfinds = 3;
    for (let index = 0; index < mapZoom; index++) {
      gsradius = gsradius + 150;
      maxfinds = ( mapZoom / 2 );
      maxfinds = Math.ceil(maxfinds);
      console.log(maxfinds);
    }
  } else {
    console.log("oh mama error");
    gsradius = 1000;
    maxfinds = 4;
  }
  var url = "https://en.wikipedia.org/w/api.php";
  var params = {
    action: "query",
    list: "geosearch",
    gscoord: "" + lat + "|" + lon + "",
    //gscoord: "52.5208|13.4094",
    gsradius: gsradius,  //Radius, in Meter
    gslimit: maxfinds,
    format: "json"
  }
    ;
  url = url + "?origin=*";
  Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });
  fetch(url)
    .then(function (response) { return response.json(); })
    .then(function (response) {
      const pages = response.query.geosearch;
      for (var place in pages) {
        collection.push(pages[place]);
      }
    })
    .catch(function (error) { });
  return collection;
}