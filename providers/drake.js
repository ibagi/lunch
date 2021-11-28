import Parser from 'rss-parser';

const parser = new Parser();
const URI = 'http://drakeetterem.hu/feed';

export default class Drake {
    display = "Drake étterem"

    async getData() {
        const data = await parser.parseURL(URI);
        const { items } = data;
        const dateRegExp = /(\d{4}\.\s){1}/;
        const itemRegExp = /[A,B,C]+:/;

        const menu = items
            .filter(i => dateRegExp.test(i.title))
            .reverse()
            .map(i => ({
                header: i.title,
                items: i.content.split(itemRegExp).map(j => j.replace(itemRegExp, "").trim())
            }));

        return {
            menu
        }
    }
}