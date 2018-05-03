const { getProvider } = require('../utils');
const MenuCollection = require('../models/menuCollection');

const show = async (name, cmd) => {
    try {
        const provider = await getProvider(name);
        console.log(`Fetching menu data for [${name}]...`);

        const menuItems = await provider();
        const menu = new MenuCollection(menuItems);
        menu.render();
        
    } catch (e) {
        console.error(`Something went wrong during getting menu data for ${name}! REASON: ${e}`);
    }
}

module.exports = show;