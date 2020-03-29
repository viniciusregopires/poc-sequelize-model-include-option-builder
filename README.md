# POC: Sequelize model's include option builder
*Version 0.0.1*\
\
This script builds a sequelize model's include option from a graphql based syntax's string.
After the execution, a JSON file (`model.json`) is exported at the project's root directory.
## Specifications
Differently from original graphql, this POC expects that associations start with capital case and 
attributes with lower case. Also differently from original graphql, the associations' attributes
are not mandatory.
## Script execution
Using terminal from project's root folder, first run `npm install` to install the dependencies. 
###Command syntax
```bash
node src/app.js build --resources='graphql based syntax string'
```
###Command Example
The following command can be executed
```bash
node src/app.js build --resources='id,title,Activity{id,ActivityEvent{id,ActivityEventOp,ActivityEventOp2}}TaskEvent,TaskReport{id,description},description,TaskMaster'
```
As the command above is contained at `package.json` start script, it's possible to execute:
```bash
npm run start
```
## Result
After script execution, the sequelize model's include option object is generated and exported 
as JSON to project's root folder in `model.json` file.
