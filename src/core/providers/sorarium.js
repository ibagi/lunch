const cheerio = require('cheerio');
const { fetchHtml } = require('../lunch');

const URI = 'http://sorarium.hu/gasztronomia/';

const Sorarium = async () => {
    const rawHtml = await fetchHtml(URI);
    const $ = cheerio.load(rawHtml);
    const link = $('#heti-menu').find('a')[0];
    return $(link).attr('href').replace('https', 'http');
}

module.exports = {
    display: 'Sörárium',
    get: Sorarium
};