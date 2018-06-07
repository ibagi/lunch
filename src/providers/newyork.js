const cheerio = require('cheerio');
const { fetchHtml } = require('../utils');
const ImageRenderer = require('../renderers/image');

const URI = 'http://www.newyorkbistro.hu';

const NewYork = async () => {
    const rawHtml = await fetchHtml(URI);
    const $ = cheerio.load(rawHtml);
    const link = $('a').filter(function () {
        return $(this).text().toLocaleLowerCase().includes('heti')
    })[0];

    return {
        result: `${URI}\\${$(link).attr('href')}`,
        renderer: ImageRenderer
    };
}

NewYork.display = 'New York Caffé';
module.exports = NewYork;