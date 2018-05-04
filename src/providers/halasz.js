const cheerio = require('cheerio');
const { fetchHtml } = require('../utils');
const TableRenderer = require('../renderers/table');

const URI = 'http://www.halaszcsardaszolnok.hu/index.php?lng=hun&page=3';
const DATE_REGEXP = /^(\d{2,4}\.\s){3}/;
const ITEM_REGEXP = /I{1,3}\. menü:/g;

const pushMenuItem = (menuItems, item) => {
    if (!item) {
        return;
    }

    if (item.match(ITEM_REGEXP)) {
        return;
    }

    if (item.match(DATE_REGEXP)) {
        const [ date, soup ] = item.split(':');
        menuItems.push({ header: date.trim(), items: [] });
        menuItems[menuItems.length - 1].items.push(soup.trim());
    } else {
        menuItems[menuItems.length - 1].items.push(item.trim());
    }
}

const halasz = async () => {
    const rawHtml = await fetchHtml(URI);
    const $ = cheerio.load(rawHtml);
    const menuItems = [];

    $('strong').each(function (_, el) {
        pushMenuItem(menuItems,  $(this).text().trim());
        pushMenuItem(menuItems, $(this.next).text().trim());
    });

    TableRenderer.render(menuItems);
}

module.exports = halasz;