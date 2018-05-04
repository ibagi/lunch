const Table = require('cli-table');

const TableRenderer = {
    render(menuItems) {
        const menu = new Table();
        for(const i of menuItems) {
             const rows = {};
             rows[i.header] = i.items;
             menu.push(rows);
        }
        
        console.log(menu.toString());
    }
}

module.exports = TableRenderer;