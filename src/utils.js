const fs = require('fs');
const path = require('path');
const http = require('http');
const { exec } = require('child_process');

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

const getCommandLine = () => {
    switch (process.platform) {
        case 'darwin':
            return 'open';
        case 'win32':
        case 'win64':
            return 'start';
        default:
            return 'xdg-open';
    }
}

const showImage = (uri, path = 'show.png') => {
    const file = fs.createWriteStream(path);
    http.get(uri, (res) => {
        res.pipe(file);
        res.on('end', () => {
            const process = exec(`${getCommandLine()} ${path}`);
            //process.on('close', () => fs.unlinkSync(path));
        });
    });
}

const getAllProviders = () => {
    return new Promise((resolve, reject) => {
        const providerPath = path.join(__dirname, 'providers');
        fs.readdir(providerPath, (err, files) => {
            if (err) reject(err);
            resolve(files.map(i => i.replace('.js', '')));
        });
    });
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
    showImage,
    getAllProviders,
    getProvider
}