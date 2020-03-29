const yargs = require('yargs');
const SequelizeModelIncludeOptionBuilder = require('./utils/sequelize-model-include-option-builder');

yargs.version('1.1.0');

yargs.command({
    command: 'build',
    description: `It builds a sequelize model's include option from a graphql based syntax's string`,
    builder: {
        resources: {
            describe: `This param simulates a query param containing the resources requested by client. It value is a graphql based syntax's string`,
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
