const cheerio = require('cheerio');
const { fetchHtml } = require('../lunch');

const URI = 'https://heavenbistro.webnode.hu/menu/';
const HEADERS = [
    'HÉTFŐ',
    'KEDD',
    'SZERDA',
    'CSÜTÖRTÖK',
    'PÉNTEK'
];

const setHeader = (menuItem, headerString) => {
    if(HEADERS.some(i => i === headerString)) {
        menuItem.header = headerString;
    } else {
        const header =  HEADERS.find(i => headerString.includes(i));
        menuItem.header = header;
        menuItem.items.push(headerString.split(header)[1])
    }
}

const normalizeString = (str) => {
    return str.replace(/(A:\s+|B:\s+|Ínyenc ajánlato?k?:)/, '').trim();
}

const Heaven = async () => {
    const html = await fetchHtml(URI, true);
    const $ = cheerio.load(html);

    const menuItems = [];
    const menuContents = $('.mt-pricing-02 .text-content');

    menuContents.each(function () {
        const headings = $(this).children('h3');
        const menu = {
            items: []
        };

        setHeader(menu, $(headings[0]).text());

        headings.each(function (i) {
            if (i === 0)
                return;
            const text = normalizeString($(this).text());
            if (text)
                menu.items.push(text);
        });

        if (menu.header)
            menuItems.push(menu);
    });

    return menuItems;
};

module.exports = {
    display: 'Heaven',
    get: Heaven
};

