const _ = require('underscore');

/** Think in a better solution */
const getLexemes = (resources) => _.without(resources.replace(/\s+/g, '').split(/(,|}|{)/), ',', '{', '');

const isAttribute = (lexeme) => /[a-z]/.test(lexeme[0]);

const isModel = (lexeme) => /[A-Z]/.test(lexeme[0]);

const isClosedCurlyBracket = (lexeme) => lexeme === '}';

module.exports = {
    getLexemes,
    isAttribute,
    isModel,
    isClosedCurlyBracket
};
