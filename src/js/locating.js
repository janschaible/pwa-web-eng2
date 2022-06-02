const getLocation = ()=>{
    return new Promise((resolve, reject) => {
        window.navigator.geolocation.getCurrentPosition(
            position=>resolve(position),
            ()=>reject()    
        )
     })
}

export default getLocation;