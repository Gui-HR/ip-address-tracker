const ipAddressP = document.querySelector('[data-js="ip-address"]')
const locationP = document.querySelector('[data-js="location"]')
const timezoneP = document.querySelector('[data-js="timezone"]')
const ispP = document.querySelector('[data-js="isp"]')

const myIcon = L.icon({
    iconUrl: '../images/icon-location.svg',
    iconSize: [40, 50],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
});


const showMap = (lat, lng) => {
    const map = L.map('map', {
        center: [lat +.004, lng],
        zoom: 15,
        zoomControl: false
    })
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
    const marker = L.marker([lat, lng], {icon: myIcon}).addTo(map);
}

const showIPInfo = async endPoint => {
    const { ip, location, isp} = await getIpInfo(endPoint)
    const {region, city, lat, lng, timezone} = location
    ipAddressP.textContent = ip
    locationP.textContent = `${city}, ${region}`
    timezoneP.textContent = timezone
    ispP.textContent = isp

    showMap(lat, lng)
}

showIPInfo(endPoint)