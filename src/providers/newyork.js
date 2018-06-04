const cheerio = require('cheerio');
const { fetchHtml } = require('../utils');
const ImageRenderer = require('../renderers/image');

const URI = 'http://www.newyorkbistro.hu';

const newyork = async () => {
    const rawHtml = await fetchHtml(URI);
    const $ = cheerio.load(rawHtml);
    const link = $('a').filter(function() {
       return $(this).text().toLocaleLowerCase().includes('heti')
    })[0];
    
    await ImageRenderer.render(`${URI}\\${$(link).attr('href')}`);
}

module.exports = newyork;