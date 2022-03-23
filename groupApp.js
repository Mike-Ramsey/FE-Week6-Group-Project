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
        const response = await fetch(this.url + `/${recipe._id}`, getFetchOptions("PUT", {text: recipe.text}));
        return response;
        // return $.ajax({
        //     url: this.url + `/#${recipe._id}`,
        //     type: 'PUT',
        //     dataType: 'json',
        //     data: JSON.stringify(recipe),
        //     contentType: 'application/json',
        // });
    }

    static deleteRecipe(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            method: 'DELETE'
        });
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
                recipe.ingredients.push(new Ingredient($(`${recipe._id}-ingredient-name`).val()));
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

    static deleteIngredient(recipeID) {
        for (let recipe of this.recipes) {
            if(recipe._id == recipeID) {
                for(let ingredient of recipe.ingredients) {
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

    static deleteStep(recipeID) {
        for (let recipe of this.recipes) {
            if(recipe._id == recipeID) {
                for(let step of recipe.steps) {
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

    static render(recipes) {
        this.recipes = recipes;
        $('#recipe-form').empty();
        for (let recipe of recipes) {
            $('#recipe-form').append(
                `<div id="${recipe._id}"><strong><h4>${recipe.name}</h4></strong>
                <div class="accordian" >
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Ingredients
                        </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <ul class="list-group" id="ingredient-list">
                                    <li class="input-group mb-3">
                                        <input type="text" id="${recipe._id}-ingredient-name" class="form-control" placeholder="Ingredient">
                                        <div class="input-group-append">
                                            <button class="btn btn-success form-control" type="button" onclick="RecipeManager.addIngredient('${recipe._id}')">Add</button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Steps
                            </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <ol class="list-group">
                                    <li class="input-group mb-3">
                                        <input type="text" id="${recipe._id}-step-name" class="form-control" placeholder="Step">
                                        <div class="input-group-append">
                                            <button id="${recipe._id}" class="btn btn-success" onclick="RecipeManager.addStep('${recipe._id}')" type="button">Add</button>
                                        </div>
                                    </li>
                                </ol>            
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn btn-danger" onclick="RecipeManager.deleteRecipe('${recipe._id}')">Delete</button>
                <br>            
            </div>
            <br>    
            `
            );
            for (let ingredient of recipe.ingredients) {
                $('#ingredient-list').append(
                    `<li>${ingredient.name}</li>`
                );
            }
        }
    }
}

$('#create-new-recipe').click(() => {
    RecipeManager.createRecipe($('#new-recipe-name').val());
    $('#new-recipe-name').val('');
})

RecipeManager.getAllRecipes();