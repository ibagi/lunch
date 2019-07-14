const cheerio = require('cheerio');
const { fetchHtml } = require('../lunch');

const URI = 'https://sorarium.hu/heti-menu/';

const Sorarium = async () => {
    const html = await fetchHtml(URI, true);
    const $ = cheerio.load(html);

    const rows = $('tbody tr');
    const result = [];

    rows.each(function (index, el) {
        if(index === 0 || index == rows.length - 1) {
            return;
        }
        
        const elements = $(this).find('td')
        const menu = {
            header: $(elements[0]).text(),
            items: [
                $(elements[1]).text(),
                $(elements[2]).text(),
                $(elements[3]).text()
            ]
        };

        result.push(menu)
    });

    return result;
}

module.exports = {
    display: 'Sörárium',
    get: Sorarium
};