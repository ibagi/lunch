const Parser = require('rss-parser');
const parser = new Parser();

const URI = 'http://drakeetterem.hu/feed';

const Drake = async () => {
    const data = await parser.parseURL(URI);
    const { items } = data;
    const dateRegExp = /(\d{2,}\.\s){3}/;
    const itemRegExp = /[A,B,C]+:/;

    const menuItems = items
        .filter(i => dateRegExp.test(i.title))
        .reverse()
        .map(i => ({
            header: i.title,
            items: i.content.split(itemRegExp).map(j => j.replace(itemRegExp, "").trim())
        }));

    return menuItems;
}

Drake.display = 'Drake étterem';
module.exports = Drake;