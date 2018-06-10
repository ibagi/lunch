const os = require('os');
const path = require('path');
const { exec } = require('child_process');

const { fetchFile } = require('lunch');

const _getStartCommand = () => {
    switch (process.platform) {
        case 'darwin':
            return 'open';
        case 'win32':
        case 'win64':
            return 'start';
        default:
            return 'xdg-open';
    }
};

const ImageRenderer = {
    async render(uri) {
        const filePath = path.join(os.tmpdir(), 'lunchapp.tmp.png');
        await fetchFile(uri, filePath);

        const command = `${_getStartCommand()} ${filePath}`;
        const process = exec(command);
    }
};

module.exports = ImageRenderer;