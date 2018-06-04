const cheerio = require('cheerio');
const { fetchHtml } = require('../utils');
const ImageRenderer = require('../renderers/image');

const URI = 'http://sorarium.hu/gasztronomia/';

const sorarium = async () => {
    const rawHtml = await fetchHtml(URI);
    const $ = cheerio.load(rawHtml);
    const link = $('#heti-menu').find('a')[0];
    
    await ImageRenderer.render($(link).attr('href').replace('https', 'http'));
}

module.exports = sorarium;