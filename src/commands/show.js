const { getProvider } = require('../utils');

const show = async (name, cmd) => {
    try {
        const provider = await getProvider(name);
        console.log(`Fetching menu data for [${name}]...`);
        const { result, renderer } = await provider();
        renderer.render(result);
    } catch (e) {
        console.error(`Something went wrong during getting menu data for ${name}! REASON: ${e}`);
    }
}

module.exports = show;