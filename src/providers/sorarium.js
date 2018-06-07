const cheerio = require('cheerio');
const { fetchHtml } = require('../utils');
const ImageRenderer = require('../renderers/image');

const URI = 'http://sorarium.hu/gasztronomia/';

const Sorarium = async () => {
    const rawHtml = await fetchHtml(URI);
    const $ = cheerio.load(rawHtml);
    const link = $('#heti-menu').find('a')[0];
    return {
        result: $(link).attr('href').replace('https', 'http'),
        renderer: ImageRenderer
    };
}

Sorarium.display = 'Sörárium';
module.exports = Sorarium;