const program = require('commander');
const show = require('./commands/show');
const list = require('./commands/list');

function run() {
    program
        .version('0.1.0')
        .command('show <name>')
        .description('renders weekly menu for the given restaurant')
        .action(show);

    program
        .command('list')
        .description('lists all implemented restaurant menu providers')
        .action(list);

    program.parse(process.argv);
}

module.exports = {
    run: run
}
