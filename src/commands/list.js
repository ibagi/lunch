const { getAllProviders } = require('../utils');

const list = async (cmd) => {
    try {
        const providers = await getAllProviders();
        console.log(`Available menu providers:`);
        for(const provider of providers) {
            console.log(`- ${provider}`);
        }
    } catch(e) {
        console.error(`Something went wrong during listing! REASON: ${e}`)
    }
}

module.exports = list;