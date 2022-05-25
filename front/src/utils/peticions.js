export default class peticion {
    constructor () {
        // this.host = 'http://localhost:3001/'
        this.host = 'http://apifuneraria.herokuapp.com' 
    }
    async get(rute) {
        let response = await fetch(this.host+rute,{
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "same-origin"
        })
        let data = await response.json()
        return data
    }
    async post(rute,body) {
        let response = await fetch(this.host+rute,
            {
                method: 'POST',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                  'Content-Type': 'application/json'
                },
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify( {cookie: localStorage.getItem('token'), body: body})
            })
        let data = await response.json()
        return data
    }
}
