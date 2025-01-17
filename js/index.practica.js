const shoppingList = [];
let totalAmount = 0;


document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

function onDOMContentLoaded(){
    const newArticleButton = document.getElementById('newArticle');
    const resetListButton = document.getElementById('newList');

    newArticleButton.addEventListener('click', createShoppingListItem);
    resetListButton.addEventListener('click', resetList);

}

function createShoppingListItem(){
    const articleName = document.getElementById('article').value;
    const articleQty = document.getElementById('qty').value;
    const articlePrice = document.getElementById('price').value;
    const timestamp = new Date()

    let newArticleObject = {
        name: articleName,
        qty: articleQty,
        price: articlePrice 
    };

    if (articleName === '' || articleName.includes(1,2,3,4,5,6,7,8,9,0)) {
        alert('Falta el nombre del articulo');
        return;
      }
    if (articleQty === '') {
        alert('Falta la cantidad del articulo');
        return;
    }
    if (articlePrice === '') {
        alert('Falta el precio del articulo');
        return;
    }

    shoppingList.push(newArticleObject);

    console.log(newArticleObject);
    addRowElement(newArticleObject);
}

function deleteShoppingListItem(e){
    const itemIdToDelete = e.target.getAttribute('id-to-delete')
    console.log(e);
    const item = shoppingList.find((shopp))
}



function addRowElement(newArticleObject){
    let shoppingListTableBody = document.getElementById('shoppingListTableBody');
    let shoppingListTableTotal = document.getElementById('shoppingListTableTotal');

    let newTableRow = document.createElement('tr');

    let nameCell = document.createElement('td');
    let qtyCell = document.createElement('td');
    let priceCell = document.createElement('td');
    let subtotalCell = document.createElement('td');
    const rButton = document.createElement('button');

    let newArticleSubtotal = newArticleObject.qty * newArticleObject.price;

    nameCell.innerText = newArticleObject.name;
    qtyCell.innerText = newArticleObject.qty;
    priceCell.innerText = newArticleObject.price;
    subtotalCell.innerText = newArticleSubtotal;
    
    rButton.className = "removeButton";
    rButton.textContent = "Remove" 
    rButton.setAttribute('id-to-delete', )
    rButton.addEventListener('click', deleteShoppingListItem);

    newTableRow.appendChild(nameCell);
    newTableRow.appendChild(qtyCell);
    newTableRow.appendChild(priceCell);
    newTableRow.appendChild(subtotalCell);
    newTableRow.appendChild(rButton);

    shoppingListTableBody.appendChild(newTableRow);

    totalAmount += newArticleSubtotal;
    shoppingListTableTotal.innerText = totalAmount;
    console.log(totalAmount);
}

function resetList(){
    if (shoppingList.length == 0){
        alert('Cesta vacia');
        return
    }

    while (shoppingList.length > 0) { 
           shoppingList.pop();}
    totalAmount = 0;      
    shoppingListTableBody.innerHTML = "";
    shoppingListTableTotal.innerText = "0";
}