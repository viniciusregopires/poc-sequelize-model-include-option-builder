const yargs = require('yargs');
const SequelizeModelIncludeOptionBuilder = require('./utils/sequelize-model-include-option-builder');
const lexemeUtils = require('./utils/lexeme-utils');

/**
 * Example to run this application via command line:
 * $ node src/app.js build --resources="id,title,Activity{id,ActivityEvent{id,ActivityEventOp,ActivityEventOp2}}TaskEvent,TaskReport{id,description},description,TaskMaster"
 */

yargs.version('1.1.0');

yargs.command({
    command: 'build',
    description: `It builds a sequelize model's include option from a graphql based syntax's string`,
    builder: {
        resources: {
            describe: `It simulates a query param containing the resources requested by client (frontend). It value is a graphql based syntax's string`,
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        try {
            const sequelizeModelIncludeOptionBuilder = new SequelizeModelIncludeOptionBuilder();
            sequelizeModelIncludeOptionBuilder.build(argv.resources);
        } catch (error) {
            console.log(error);
        }
    }
});

yargs.parse();
