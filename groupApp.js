// Data
let listId = 0; //Erika


// Cassie Functions

class Info {
    constructor(name, difficulty) {
        this.name = name;
        this.difficulty = difficulty
    }
}

class Contributor {    
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.items = []; 
    }

    addItem(contributor) { 
        this.items.push(contributor);
    }

    deleteItem(contributor) {
        let index = this.items.indexOf(contributor);
        this.items.splice(index, 1); 
    }
}

let lists = []; 
let listId = 0; 

onClick('new-list', () => {
    lists.push(new Contributor(listId++, getValue('new-list-name')))
    drawDOM(); 
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let listDiv = document.getElementById('contributors'); 
    clearElement(listDiv);
    for(list of lists) { 
        let table = createListTable(list); 
        let title = document.createElement('h3');
        title.innerHTML = list.name;
        title.appendChild(createDeleteListButton(list)); 
        listDiv.appendChild(title);
        listDiv.appendChild(table);
        for (contributor of list.items) {  
            createItemRow(list, table, contributor);  
        }
    }
}

function createItemRow(list, table, contributor) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = contributor.name;
    row.insertCell(1).innerHTML = contributor.difficulty;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(list, contributor));
}

function createDeleteRowButton(list, contributor) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger btn-sm';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = list.items.indexOf(contributor);
        list.items.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createDeleteListButton(list) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger btn-sm';
    btn.innerHTML = 'Delete Contributor';
    btn.onclick = () => {
        let index = lists.indexOf(list);
        lists.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewItemButton(list) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-success btn-sm';
    btn.innerHTML = 'Add';
    btn.onclick = () => {
        list.items.push(new Info(getValue(`name-input-${list.id}`), getValue(`difficulty-input-${list.id}`)));
        drawDOM();
    };
    return btn;
}

function createListTable(list) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-light table-striped table-hover');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let quantityColumn = document.createElement('th');
    nameColumn.innerHTML = 'Recipes';
    quantityColumn.innerHTML = 'Difficulty (beginner, intermediate, expert)';
    row.appendChild(nameColumn);
    row.appendChild(quantityColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let quantityTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${list.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');

    let postitionInput = document.createElement('input');
    postitionInput.setAttribute('id', `difficulty-input-${list.id}`);
    postitionInput.setAttribute('type', 'text');
    postitionInput.setAttribute('class', 'form-control');

    let newItemButton = createNewItemButton(list);
    nameTh.appendChild(nameInput);
    quantityTh.appendChild(postitionInput);
    createTh.appendChild(newItemButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(quantityTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

// Erika Functions

document.getElementById('add-item-button').addEventListener('click', () => {
    if(document.getElementById('selected-category').value == 1) {
        const pantryItemsTable = document.createElement('table');
        pantryItemsTable.className = "table table-success table-striped"
        const pantryItemsList = document.getElementById('pantry-items-list');
        pantryItemsTable.id = 'pantry-items-table';
        pantryItemsList.appendChild(pantryItemsTable);
        const list = document.getElementById('pantry-items-table');
        const row = list.insertRow(0);
        row.setAttribute('id', `${listId}`);
        row.insertCell(0).innerHTML = document.getElementById('item-input').value;
        //create delete button and adds 1 to id
        let actions = row.insertCell(1);
        actions.appendChild( createItemDeleteButton(listId++) );
        //toggles open when an item is added
        $('.pantry-items-button').removeClass('collapsed').attr('aria-expanded', true);
        $('#collapseOne').addClass('show');

    } else if(document.getElementById('selected-category').value == 2) {
        const fruitsItemsTable = document.createElement('table');
        fruitsItemsTable.className = "table table-success table-striped"
        const fruitsItemsList = document.getElementById('fruits-items-list');
        fruitsItemsTable.id = 'fruits-items-table';
        fruitsItemsList.appendChild(fruitsItemsTable);
        const list = document.getElementById('fruits-items-table');
        const row = list.insertRow(0);
        row.setAttribute('id', `${listId}`);
        row.insertCell(0).innerHTML = document.getElementById('item-input').value;
        //create delete button and adds 1 to id
        let actions = row.insertCell(1);
        actions.appendChild( createItemDeleteButton(listId++) );
        //toggles open when an item is added
        $('.fruits-button').removeClass('collapsed').attr('aria-expanded', true);
        $('#collapseTwo').addClass('show');

    } else if(document.getElementById('selected-category').value == 3) {
        const meatsItemsTable = document.createElement('table');
        meatsItemsTable.className = "table table-success table-striped"
        const meatsItemsList = document.getElementById('meats-items-list');
        meatsItemsTable.id = 'meats-items-table';
        meatsItemsList.appendChild(meatsItemsTable);
        const list = document.getElementById('meats-items-table');
        const row = list.insertRow(0);
        row.setAttribute('id', `${listId}`);
        row.insertCell(0).innerHTML = document.getElementById('item-input').value;
        //create delete button and adds 1 to id
        let actions = row.insertCell(1);
        actions.appendChild( createItemDeleteButton(listId++) );
        //toggles open when an item is added
        $('.meats-button').removeClass('collapsed').attr('aria-expanded', true);
        $('#collapseThree').addClass('show');

    } else if(document.getElementById('selected-category').value == 4) {
        const frozenFoodsItemsTable = document.createElement('table');
        frozenFoodsItemsTable.className = "table table-success table-striped"
        const frozenFoodsItemsList = document.getElementById('frozen-foods-items-list');
        frozenFoodsItemsTable.id = 'frozen-foods-items-table';
        frozenFoodsItemsList.appendChild(frozenFoodsItemsTable);
        const list = document.getElementById('frozen-foods-items-table');
        const row = list.insertRow(0);
        row.setAttribute('id', `${listId}`);
        row.insertCell(0).innerHTML = document.getElementById('item-input').value;
        //create delete button and adds 1 to id
        let actions = row.insertCell(1);
        actions.appendChild( createItemDeleteButton(listId++) );
        //toggles open when an item is added
        $('.frozen-foods-button').removeClass('collapsed').attr('aria-expanded', true);
        $('#collapseFour').addClass('show');
    }  
         //clears out the values     
     document.getElementById('item-input').value = '';
     document.querySelector('#selected-category').value = '0';
})
    
function createItemDeleteButton(listId) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'btn btn-outline-danger btn-sm float-end';
    deleteButton.onclick = () => {
        let elementToDelete = document.getElementById(`${listId}`);
        elementToDelete.parentNode.removeChild(elementToDelete);
    }
    return deleteButton;
}

// Mike Functions
const getFetchOptions = (method, data) => ({ 
    method: method, 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
})

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
        };
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

    static deleteIngredient(recipeID, ingredientName) {
        for (let recipe of this.recipes) {
            if(recipe._id == recipeID) {
                for(let ingredient of recipe.ingredients) {
                    if(ingredient.name == ingredientName) {
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

    static deleteStep(recipeID, stepName) {
        for (let recipe of this.recipes) {
            if(recipe._id == recipeID) {
                for(let step of recipe.steps) {
                    if(step.name == stepName) {
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
   
    static render(recipes) {
        this.recipes = recipes;
        $('#recipe-form').empty();     
        for (let recipe of recipes) {
            $('#recipe-form').prepend(
            `
            <div class="container bg-light text-dark">
              <div class="row">            
              <div class="col-sm-12 d-flex mb-3 me-3 mt-3" id="${recipe._id}"><strong><h3>${recipe.name}</h3></strong>
              <button class="btn btn-danger ms-auto" onclick="RecipeManager.deleteRecipe('${recipe._id}')">Delete Recipe</button>
              </div>
              </div>             
              <div class="row">
              <div class="col-md-4">
                <div class="input-group mb-3 ms-3">
                  <input type="text" class="form-control" id="${recipe._id}-ingredient-name" placeholder="Add Ingredient">
                  <div class="input-group-append">
                    <button class="btn btn-success form-control" type="button" onclick="RecipeManager.addIngredient('${recipe._id}')">+</button>
                  </div>
                </div>
                <ul class="list-group ms-3 mb-3" id="${recipe._id}-ingredient-list">
                </ul>                 
              </div>
              <div class="col-md-8">
                <div class="input-group mb-3">
                  <input type="text" class="form-control" id="${recipe._id}-step-name" placeholder="Add Step">
                  <div class="input-group-append">
                    <button class="btn btn-success form-control" type="button" onclick="RecipeManager.addStep('${recipe._id}')">+</button>
                  </div>
                </div>
                <ol class="list-group list-group-numbered ms-3 mb-3" id="${recipe._id}-step-list">
                </ol>
                <br>
              </div>
              </div>
            </div>
            <br>                        
            </div>
            <br>
            `
             );

            for (let ingredient of recipe.ingredients) {
                $(`#${recipe._id}-ingredient-list`).append(
                    `<li class='list-group-item d-flex justify-content-between align-items-center' id='name-${ingredient.name}'>
                       <div class="text-decoration-none">${ingredient.name}</div>
                       <div class="btn btn-sm btn-danger" type="button" onclick="RecipeManager.deleteIngredient('${recipe._id}', '${ingredient.name}')">-</div>
                    </li>`                    
                )
            };

            for (let step of recipe.steps) {
                $(`#${recipe._id}-step-list`).append(
                    `<li class='list-group-item d-flex justify-content-between align-items-center' id='name-${step.name}'>
                       <div class="text-decoration-none">${step.name}</div>
                       <div class="btn btn-sm btn-danger" type="button" onclick="RecipeManager.deleteStep('${recipe._id}', '${step.name}')">-</div>
                    </li>`                    
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
