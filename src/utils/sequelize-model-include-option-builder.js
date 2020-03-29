const fs = require('fs');
const HashMap = require('hashmap');
const Model = require('../models/model');
const lexemeUtils = require('./lexeme-utils');

const EXPORT_JSON_FILE = 'model.json';
const ROOT_MODEL = '$Root$';

class SequelizeModelIncludeOptionBuilder {

    constructor() {
        const rootModelKey = { depth: 0, model: ROOT_MODEL };
        this.stack = [rootModelKey];
        this.models = new HashMap(rootModelKey, new Model());
    }

    get depth() {
        return this.stack.length - 1;
    }

    get currentModelKey() {
        return this.stack[this.depth];
    }

    build(resources) {
        const lexemes = lexemeUtils.getLexemes(resources);

        for (let lexemeIndex = 0; lexemeIndex < lexemes.length; lexemeIndex++) {
            const lexeme = lexemes[lexemeIndex];

            if (lexemeUtils.isAttribute(lexeme)) {
                this._addAttribute(lexeme);
            } else if (lexemeUtils.isModel(lexeme)) {
                this._addInclude(lexeme);
                const nextLexeme = lexemes[lexemeIndex + 1];
                if (!nextLexeme || !lexemeUtils.isAttribute(nextLexeme)) {
                    this.stack.pop();
                }
            } else if (lexemeUtils.isClosedCurlyBracket(lexeme)) {
                this.stack.pop();
            } else {
                throw new Error (`Resources invalid syntax`);
            }
        }

        const modelKey = this.stack.pop();
        const model = this.models.get(modelKey);
        this._exportJSONFile(model);
    }

    _addAttribute(lexeme) {
        const currentModel = this.models.get(this.currentModelKey);
        currentModel.addAttribute(lexeme);
    }

    _addInclude(lexeme) {
        const model = new Model(lexeme);
        const modelKey = { depth: this.depth + 1, model: model.model };
        const currentModel = this.models.get(this.currentModelKey);

        currentModel.addInclude(model);
        this.models.set(modelKey, model);
        this.stack.push(modelKey);
    }

    _exportJSONFile(model) {
        fs.writeFileSync(EXPORT_JSON_FILE, JSON.stringify(model));
    }
}

module.exports = SequelizeModelIncludeOptionBuilder;
