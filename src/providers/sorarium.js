const moment = require('moment');
const ImageRenderer = require('../renderers/image');

const URI = 'http://sorarium.hu/wp-content/plugins/sorarium/heti-menu/menu_images/{WEEK}_heti_menu.png';

const sorarium = async () => {
    const uri = URI.replace('{WEEK}', moment().format('W'));
    await ImageRenderer.render(uri);
}

module.exports = sorarium;