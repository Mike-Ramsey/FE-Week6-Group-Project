// Data


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


// Mike Functions