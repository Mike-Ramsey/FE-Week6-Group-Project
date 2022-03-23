// Templates and Containers

class Recipe {
    constructor (name) {
        this.name = name;
        this.ingredients = [];
        this.steps = [];
    }

    addIngredient(name) {
        this.ingredients.push(new Ingredient(name));
    }

    addStep(name) {
        this.steps.push(new Step(name));
    }
}

class Ingredient {
    constructor (name) {
        this.name = name;
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
const getFetchOptions = (method, data) => ({ 
    method: method, 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
})

class RecipeBuilder {
    static url = 'https://crudcrud.com/api/3d8ac86949d141f5b68c72ae7857bc42/recipes';

    static async getAllRecipes() {
        const response = await fetch(this.url);
        return await response.json();
    }

    static async getRecipe(id) {
        const response = await fetch(this.url + `/${id}`);
        return await response.json();
    }

    static async createRecipe(recipe) {
        const response = await fetch(this.url, getFetchOptions("POST", recipe));
        return await response.json();
    }

    static async updateRecipe(recipe) {
        const recipeWithoutId = {
            name: recipe.name,
            ingredients: recipe.ingredients,
            steps: recipe.steps
        }
        const response = await fetch(this.url + `/${recipe._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(recipeWithoutId)
        });
        return response;
    }

    static async deleteRecipe(id) {
        const response = await fetch(this.url + `/${id}`, {method: "DELETE"});
        return response;
    }
}

class RecipeManager {
    static recipes;

    static getAllRecipes() {
        RecipeBuilder.getAllRecipes().then(recipes => this.render(recipes));
    }

    static deleteRecipe(id) {
        RecipeBuilder.deleteRecipe(id)
            .then(() => {
                return RecipeBuilder.getAllRecipes();
            })
            .then((recipes) => this.render(recipes));
    }

    static createRecipe(name) {
        RecipeBuilder.createRecipe(new Recipe(name))
            .then(() => {
                return RecipeBuilder.getAllRecipes();
            })
            .then((recipes) => this.render(recipes));
    }

    static addIngredient(id) {
        for (let recipe of this.recipes) {
            if (recipe._id == id) {
                recipe.ingredients.push(new Ingredient($(`#${recipe._id}-ingredient-name`).val()));
                RecipeBuilder.updateRecipe(recipe)
                .then(() => {
                    return RecipeBuilder.getAllRecipes();
                })
                .then((recipes) => this.render(recipes));
            }
        }
    }

    static addStep(id) {
        for (let recipe of this.recipes) {
            if (recipe._id == id) {
                recipe.steps.push(new Step($(`#${recipe._id}-step-name`).val()));
                RecipeBuilder.updateRecipe(recipe)
                .then(() => {
                    return RecipeBuilder.getAllRecipes();
                })
                .then((recipes) => this.render(recipes));
            }
        }
    }

    static deleteIngredient(recipeID, ingredientID) {
        for (let recipe of this.recipes) {
            if(recipe._id == recipeID) {
                for(let ingredient of recipe.ingredients) {
                    if(ingredient.name == ingredientID) {
                        recipe.ingredients.splice(recipe.ingredients.indexOf(ingredient), 1);                   
                        RecipeBuilder.updateRecipe(recipe)
                        .then(() => {
                            return RecipeBuilder.getAllRecipes();
                        })
                        .then((recipes) => this.render(recipes));
                    }
                }
            }
        }
    }

    static deleteStep(recipeID, stepID) {
        for (let recipe of this.recipes) {
            if(recipe._id == recipeID) {
                for(let step of recipe.steps) {
                    if(step.name == stepID) {
                    recipe.steps.splice(recipe.steps.indexOf(step), 1);
                    RecipeBuilder.updateRecipe(recipe)
                        .then(() => {
                            return RecipeBuilder.getAllRecipes();
                        })
                        .then((recipes) => this.render(recipes));
                    }
                }
            }
        }
    }

// simplified this section until I get bugs worked out

    static render(recipes) {
        this.recipes = recipes;
        $('#recipe-form').empty();
        for (let recipe of recipes) {
            $('#recipe-form').append(
                `
                <div id="${recipe._id}"><strong><h4>${recipe.name}</h4></strong></div>
                <div class="input-group mb-3">
                  <input type="text" class="form-control" id="${recipe._id}-ingredient-name" placeholder="Ingredient">
                  <div class="input-group-append">
                    <button class="btn btn-success form-control" type="button" onclick="RecipeManager.addIngredient('${recipe._id}')">Add</button>
                  </div>
                </div>
                <ul class="list-group mb-3" id="${recipe._id}-ingredient-list">
                </ul>                
                <div class="input-group mb-3">
                  <input type="text" class="form-control" id="${recipe._id}-step-name" placeholder="Step">
                  <div class="input-group-append">
                    <button class="btn btn-success form-control" type="button" onclick="RecipeManager.addStep('${recipe._id}')">Add</button>
                  </div>
                </div>  
                <ol class="list-group list-group-numbered mb-3" id="${recipe._id}-step-list">
                </ol>                
                <button class="btn btn-danger" onclick="RecipeManager.deleteRecipe('${recipe._id}')">Delete</button>
                <br><br>`
            );
            for (let ingredient of recipe.ingredients) {
                $(`#${recipe._id}-ingredient-list`).append(
                    `<li class='list-group-item d-flex justify-content-between align-items-center' id='name-${ingredient._id}'>${ingredient.name}
                    <span class="badge">
                      <button class="btn btn-danger btn-sm" type="button" onclick="RecipeManager.deleteIngredient('${recipe._id}', '${ingredient.name}')">X</button>
                    </span>
                    </li>
                    `
                )
            };
            for (let step of recipe.steps) {
                $(`#${recipe._id}-step-list`).append(
                    `<li class='list-group-item d-flex justify-content-between align-items-center' id='name-${step._id}'>${step.name}
                    <span class="badge">
                      <button class="btn btn-danger btn-sm" type="button" onclick="RecipeManager.deleteStep('${recipe._id}', '${step.name}')">X</button>
                    </span>
                    </li>
                    `
                )
            };
        }
    }
}

$('#create-new-recipe').click(() => {
    RecipeManager.createRecipe($('#new-recipe-name').val());
    $('#new-recipe-name').val('');
})

RecipeManager.getAllRecipes();