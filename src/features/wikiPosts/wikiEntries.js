export async function findWikiEntries(lat, lon, mapZoom) {
  const collection = [];
  var gsradius;
  var maxfinds;
  if (mapZoom <= 7) {
    //console.log(mapZoom);
  } else if (mapZoom >= 7 && mapZoom <= 18) {
    gsradius = mapZoom * (mapZoom * 40);
    maxfinds = mapZoom * (mapZoom * 1,5)
  } else {
    gsradius = 4500;
    maxfinds = mapZoom * 12;
  }
  var url = "https://en.wikipedia.org/w/api.php";
  var params = {
    action: "query",
    list: "geosearch",
    gscoord: "" + lat + "|" + lon + "",
    //gscoord: "52.5208|13.4094",    Example Data
    gsradius: gsradius,
    gslimit: maxfinds,
    format: "json"
  }

  url = url + "?origin=*";
  Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });
  try {
    const response = await fetch(url)
    const marsheledResponse = await response.json()
    const pages = marsheledResponse.query.geosearch;
    for (var place in pages) {
      collection.push(pages[place]);
    }
  } catch {
    console.log("failed to find wiki entries");
  }
  return collection;
}

export async function findWikiEntriesByTitle(title) {
  const collection = [];
  var url = "https://en.wikipedia.org/w/api.php";
  var params = {
    action: "query",
    prop: "coordinates",
    titles: title,
    format: "json"
  }

  url = url + "?origin=*";
  Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });
  //console.log(url)
  try {
    const response = await fetch(url)
    const marsheledResponse = await response.json()
    const pages = marsheledResponse.query;
    //console.groupCollapsed(pages)           Logs the entire response of SearchBar entrie
    for (var place in pages) {
      collection.push(pages[place]);
    }
  } catch {
    console.log("failed to find wiki entries");
  }
  return collection;
}

export async function findWikiPageId(title) {
  const collection = [];
  var url = "https://en.wikipedia.org/w/api.php";
  var params = {
    action: "query",
    prop: "coordinates",
    titles: title,
    format: "json"
  }

  url = url + "?origin=*";
  Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });
  //console.log(url)
  try {
    const response = await fetch(url)
    const marsheledResponse = await response.json()
    const pages = marsheledResponse.query;
    for (var place in pages) {
      collection.push(pages[place]);
    }
  } catch {
    console.log("failed to find wiki entries");
  }
  return collection;
}