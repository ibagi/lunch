import cheerio from 'cheerio';
import { fetchHtml } from '../utils/http'

const URI = 'http://www.halaszcsardaszolnok.hu/index.php?lng=hun&page=3';
const DATE_REGEXP = /^(\d{2,4}\.\s){3}/;
const ITEM_REGEXP = /I{1,3}\. menü/g;

const pushMenuItem = (menu, item) => {
    if (!item)
        return;
    if (item.match(ITEM_REGEXP))
        return;

    if (item.match(DATE_REGEXP)) {
        const [date, soup] = item.split(':');
        menu.push({ 
            header: date.trim(), 
            actual: false,
            items: [] 
        });
        menu[menu.length - 1].items.push(soup.trim());
    } else {
        menu[menu.length - 1].items.push(item.trim());
    }
}

export default class Halasz {
    display = "Halászcsárda"

    async getData() {
        const rawHtml = await fetchHtml(URI);
        const $ = cheerio.load(rawHtml);
        const menu = [];
    
        $('strong').each(function (_, el) {
            pushMenuItem(menu, $(this).text().trim());
            pushMenuItem(menu, $(this.next).text().trim());
        });
    
        return {
            menu
        };
    }
}