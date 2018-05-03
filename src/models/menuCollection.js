const TableRenderer = require('../renderers/table');

class MenuCollection {
    constructor(menuItems) {
        this.menuItems = menuItems;
    }

    render(renderer = TableRenderer) {
        renderer.render(this.menuItems);
    }
}

module.exports = MenuCollection;