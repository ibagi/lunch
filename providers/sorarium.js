import cheerio  from 'cheerio';
import { fetchHtml } from '../utils/http'

const URI = 'https://sorarium.hu/heti-menu/';

export default class Sorarium {
    display = "Sörárium"

    async getData() {
        const html = await fetchHtml(URI, true);
        const $ = cheerio.load(html);
    
        const rows = $('tbody tr');
        const menu = [];
    
        rows.each(function (index, el) {
            if(index === 0 || index == rows.length - 1) {
                return;
            }
            
            const elements = $(this).find('td')
            const menuItem = {
                header: $(elements[0]).text(),
                actual: false,
                items: [
                    $(elements[1]).text(),
                    $(elements[2]).text(),
                    $(elements[3]).text()
                ]
            };
    
            menu.push(menuItem)
        });
    
        return {
            menu: menu.slice(0, 5)
        };
    }
}