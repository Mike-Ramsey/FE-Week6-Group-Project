// Templates and Containers


// Data
let listId = 0; //Erika


// Cassie Functions


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