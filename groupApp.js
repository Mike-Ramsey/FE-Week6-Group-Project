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

class User {
    constructor(name) {
        this.name = name;       //name of the user
        this.list;              //assumed to only have one shopping cart
        this.Recipes = [];      //all recipes that a user can have
    }

    createList(){
        this.list = new ShoppingList("Shopping List");  //assumed to only be one shopping list so just name it "shopping list"
    }
    
    emptyList(){
        this.list = NULL;         //make shopping list empty again
    }

    addRecipe(recipe) {
        this.Recipes.push(new Recipe(recipe))       //add the recipe by making a new one and pushing it onto the array
    }
    
    deleteRecipe(recipe){
        this.Recipes.splice(this.Recipes.indexOf(recipe), 1);   //find the index of the recipe that you want to delete
                                                                //then delete it with splice
    }
}

class ShoppingList {
    constructor (name) {
        this.name = name;
        this.ingredients = [];
    }

    //more functions
}



// Erika Functions


// Mike Functions