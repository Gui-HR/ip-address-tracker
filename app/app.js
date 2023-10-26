const form = document.querySelector('form')

const myIcon = L.icon({
    iconUrl: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='46' height='56'%3E%3Cpath fill-rule='evenodd' d='M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z' /%3E%3C/svg%3E%0A`,
    iconSize: [40, 50],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
})

const createDivMap = () => {
    const patternBackground = document.querySelector('.pattern-background')
    const divMap = document.createElement('div')
    divMap.setAttribute('id', 'map')
    patternBackground.insertAdjacentElement('afterend', divMap)

}

const showMap = (lat, lng) => {
    const map = L.map('map', {
        center: [lat +.004, lng],
        zoom: 15,
        zoomControl: false
    })
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)
    
    const marker = L.marker([lat, lng], {icon: myIcon}).addTo(map)
}

const showIpInfo = async endPoint => {
    createDivMap()

    const ipAddressP = document.querySelector('[data-js="ip-address"]')
    const locationP = document.querySelector('[data-js="location"]')
    const timezoneP = document.querySelector('[data-js="timezone"]')
    const ispP = document.querySelector('[data-js="isp"]')

    const { ip, location, isp} = await getIpInfo(endPoint)
    const {region, city, lat, lng, timezone} = location
    ipAddressP.textContent = ip
    locationP.textContent = `${city}, ${region}`
    timezoneP.textContent = timezone
    ispP.textContent = isp

    showMap(lat, lng)
}

form.addEventListener('submit', event => {
    event.preventDefault()

    const inputValue = event.target.ipSearch.value
    
    const divMap = document.querySelector('#map')
    divMap.remove()
    // showIpInfo(endPoint + `&ipAddress=${inputValue}`)
    showIpInfo(endPoint + `&domain=${inputValue}`)
    

    event.target.reset()
})

showIpInfo(endPoint)