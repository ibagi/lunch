const fs = require('fs');
const path = require('path');
const http = require('http');

const fetchHtml = (uri) => {
    return new Promise((resolve, reject) => {
        http.get(uri, (response) => {
            let chunks = '';
            response.on('data', (chunk) => chunks += chunk);
            response.on('end', () => resolve(chunks));
            response.on('error', (err) => reject(err));
        })
    });
}

const fetchFile = (uri, path) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(path);
        http.get(uri, (res) => {
            res.pipe(file);
            res.on('error', (err) => reject(err))
            res.on('end', () => resolve(file));
        });
    })
}

const getAllProviders = () => {
    const providerPath = path.join(__dirname, 'providers');
    files = fs.readdirSync(providerPath);
    return files.map(i => i.replace('.js', ''));
}

const getProviderPath = (name) => {
    return new Promise((resolve, reject) => {
        const filePath = `${name || ''}.js`;
        const providerPath = path.join(__dirname, 'providers', filePath);
        fs.exists(providerPath, (exists) => {
            if (exists) resolve(providerPath)
            else reject('File not found')
        });
    });
}

const getProvider = async (name) => {
    const providerPath = await getProviderPath(name);
    const provider = require(providerPath);
    return provider;
}

module.exports = {
    fetchHtml,
    fetchFile,
    getAllProviders,
    getProvider
}