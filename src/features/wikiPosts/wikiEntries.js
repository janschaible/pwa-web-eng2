export async function findWikiEntries(lat, lon, mapZoom) {
  const collection = [];
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
    }
  } else {
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

  url = url + "?origin=*";
  Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });
  try{
    const response = await fetch(url)
    const marsheledResponse = await response.json()
    const pages = marsheledResponse.query.geosearch;
    for (var place in pages) {
      collection.push(pages[place]);
    }
  }catch{
    console.log("failed to get wiki entries")
  }
  return collection;
}