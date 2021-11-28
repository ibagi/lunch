import cheerio from 'cheerio';
import { fetchHtml } from '../utils/http'

const URI = 'http://www.tisztiklubetterem.hu/?menu=menu';

export default class Hemo {
    display = "Tiszti klub"

    async getData() {
        const rawHtml = await fetchHtml(URI);
        const $ = cheerio.load(rawHtml);
        const menu = [];
    
        $('tr').each(function (i, el) {
            if (i === 0) return;
    
            let head = $(this).children('th')[0];
            let header = `${$(head).text()} ${$(head).closest('span').text()}`;
            let items = [];
    
            $(this).children('td').each(function (_, child) {
                let item = $(this).text().replace('\n', ' ');
                if (item) {
                    items.push(item);
                }
            });
    
            menu.push({
                header: header,
                actual: false,
                items: items
            });
        });
    
        return {
            menu
        };
    }
}