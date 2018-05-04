const moment = require('moment');
const ImageRenderer = require('../renderers/image');

const URI = 'http://www.newyorkbistro.hu/files/images/webmenu/webmenu{STARTOFWEEK}.png';

const newyork = async () => {
    const uri = URI.replace('{STARTOFWEEK}', moment().startOf('isoweek').format('MMDD'));
    await ImageRenderer.render(uri);
}

module.exports = newyork;