const apiKey = 'at_A6xi0nYjZOO5AmJ0rRM7OrX0RLVZd'
const endPoint = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`

const getIpInfo = async endPoint => {
    try {
        const response = await fetch(endPoint)

        if(!response.ok) {
            throw new Error("Couldn't get your IP address")
        }

        return response.json()
    } catch(error) {
        alert(error)
    }
}