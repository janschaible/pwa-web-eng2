
export async function getLocation(lat, lon){
    //let lat = 47.933611683229046;
    //let lon = 9.389765043981704;
    
    let locCountry = "";
    let locState = "";
    let locCity = "";
    let locStreet = "";
    let locHousenumber = "";

    let locationString = "";
    let locArray = [];
    
    const api_url = 'https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat='+lat+'&lon='+lon;

    const response = await fetch(api_url);
    const data = await response.json();
    //console.log(data);

    locCountry = data.features[0].properties.geocoding.country;
    locArray.push(locCountry);
    locState = data.features[0].properties.geocoding.state;
    locArray.push(locState);
    locCity = data.features[0].properties.geocoding.city;
    locArray.push(locCity);
    locStreet = data.features[0].properties.geocoding.street;
    locArray.push(locStreet);
    locHousenumber = data.features[0].properties.geocoding.housenumber;
    locArray.push(locHousenumber);

    //console.log(locArray[4]);
    const comp_string = "undefined";

    for(let i=0; i<=4; i++){
        if(comp_string != locArray[i]){
            locationString = locationString + locArray[i] + "\n";
        }
    }
    console.log(locationString);

    return locationString;
}