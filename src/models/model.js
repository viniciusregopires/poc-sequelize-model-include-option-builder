class Model {

    constructor(modelName = null) {
        if (modelName) {
            this.model = modelName;
        }
    }

    addAttribute(attribute) {
        if (this.attributes) {
            this.attributes.push(attribute);
        } else {
            this.attributes = [attribute];
        }
    }

    addInclude(model) {
        if (this.include) {
            this.include.push(model);
        } else {
            this.include = [model];
        }
    }
}

module.exports = Model;
