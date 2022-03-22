// Templates and Containers

class Recipe {
    constructor (name) {
        this.name = name;
        this.ingredients = [];
        this.steps = [];
    }

    addIngredient(name, quantity) {
        this.ingredients.push(new Ingredient(name, quantity));
    }

    addStep(name) {
        this.steps.push(new Step(name));
    }
}

class Ingredient {
    constructor (name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }
}

class Step {
    constructor (name) {
        this.name = name;
    }
}


// Data


// Cassie Functions


// Erika Functions


// Mike Functions