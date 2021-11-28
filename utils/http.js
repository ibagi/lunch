import http from 'http'
import https from 'https'

export const fetchHtml = (uri, useSsl = false) => {
    return new Promise((resolve, reject) => {
        const get = useSsl ? https.get : http.get
        get(uri, (response) => {
            let chunks = ''
            response.on('data', (chunk) => chunks += chunk)
            response.on('end', () => resolve(chunks))
            response.on('error', (err) => reject(err))
        })
    })
}