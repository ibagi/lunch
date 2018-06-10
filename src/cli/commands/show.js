const lunch = require('lunch');
const TableRenderer  = require('../renderers/table');
const ImageRenderer  = require('../renderers/image');

const getRenderer = (result) => Array.isArray(result) 
    ? TableRenderer 
    : ImageRenderer;

const show = async (name, cmd) => {
    try {
        const provider = await lunch.getProvider(name);
        console.log(`Fetching menu data for [${name}]...`);
        const result = await provider();
        const renderer = getRenderer(result);
        renderer.render(result);
    } catch (e) {
        console.error(`Something went wrong during getting menu data for ${name}! REASON: ${e}`);
    }
}



module.exports = show;