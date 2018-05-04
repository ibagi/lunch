const cheerio = require('cheerio');
const { fetchHtml } = require('../utils');
const TableRenderer = require('../renderers/table');

const URI = 'http://www.tisztiklubetterem.hu/?menu=menu';

const hemo = async () => {
    const rawHtml = await fetchHtml(URI);
    const $ = cheerio.load(rawHtml);
    const menuItems = [];
    
    $('tr').each(function (i, el) {
        if (i === 0) return;

        let head = $(this).children('th')[0];
        let header = `${$(head).text()} ${$(head).closest('span').text()}`;
        let items = [];

        $(this).children('td').each(function (_, child) {
            let item = $(this).text().replace('\n', '');
            if (item) {
                items.push(item);
            }
        });

        menuItems.push({
            header: header,
            items: items
        });
    });

    TableRenderer.render(menuItems);
};

module.exports = hemo;