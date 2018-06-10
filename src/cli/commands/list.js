const lunch = require('lunch');

const list = async (cmd) => {
    try {
        const providers = lunch.getAllProviders();
        console.log(`Available menu providers:`);
        for(const provider of providers) {
            console.log(`- ${provider}`);
        }
    } catch(e) {
        console.error(`Something went wrong during listing! REASON: ${e}`)
    }
}

module.exports = list;