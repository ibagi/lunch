const http = require('http');
const cheerio = require('cheerio');
const Table = require('../renderers/table');
const { fetchHtml } = require('../utils');

const URI = 'http://www.halaszcsardaszolnok.hu/index.php?lng=hun&page=3';

const halasz = async () => {
    const rawHtml = await fetchHtml(URI);
    const $ = cheerio.load(rawHtml);

    let items = [];
    const dateRegExp = /^(\d{2,4}\.\s){3}/;
    const itemRegExp = /I{1,3}\. menü:/g;

    $('strong').each(function (_, el) {
        let current = $(this).text().trim();
        let next = $(this.next).text().trim();
        if (current.match(dateRegExp)) {
            items.push(current.split(':')[0]);
            items.push(current.split(':')[1]);
        } else {
            items.push(current);
        }
        items.push(next);
    });

    items = items
        .filter(i => !!i && !i.match(itemRegExp))
        .map(i => i.trim());

    const menuItems = [];
    for (const item of items) {
        if (item.match(dateRegExp)) {
            menuItems.push({ header: item, items: [] });
        } else {
            menuItems[menuItems.length - 1].items.push(item);
        }
    }

    Table.render(menuItems);
}

module.exports = halasz;