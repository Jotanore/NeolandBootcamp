const shoppingList = [];
let totalAmount = 0;


document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

function onDOMContentLoaded(){
    const newArticleButton = document.getElementById('newArticle');
    const resetListButton = document.getElementById('newList');

    newArticleButton.addEventListener('click', onNewItemSubmit);
    resetListButton.addEventListener('click', resetList);

}

function onNewItemSubmit(e){
    createShoppingListItem();
    cleanUpForm();
}

function createShoppingListItem(){
    const articleName = document.getElementById('article').value;
    const articleQty = document.getElementById('qty').value;
    const articlePrice = document.getElementById('price').value;
    const timestamp = new Date()

    const id = articleName + '_' + String(timestamp.getTime());

    let newArticleObject = {
        id: id,
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

    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    addRowElement(newArticleObject);
}

function deleteShoppingListItem(e){
    const itemIdToDelete = e.target.getAttribute('id-to-delete')
    const rowToDelete = e.target.closest('tr')
    const itemIndex = shoppingList.findIndex((shoppingListItem) => shoppingListItem.id === itemIdToDelete)
    shoppingList.splice(itemIndex, 1)
    rowToDelete.remove()
    getTotalAmount()
}

function cleanUpForm() {
    const articleNameElement = document.getElementById('article')
    const qtyElement = document.getElementById('qty')
    const priceElement = document.getElementById('price')

    articleNameElement.value = ''
    qtyElement.value = ''
    priceElement.value = ''
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

    getTotalAmount()
 
    nameCell.innerText = newArticleObject.name;
    qtyCell.innerText = newArticleObject.qty;
    priceCell.innerText = newArticleObject.price;
    subtotalCell.innerText = newArticleObject.price*newArticleObject.qty;
    
    rButton.className = "removeButton";
    rButton.textContent = "Remove" 
    rButton.setAttribute('id-to-delete',newArticleObject.id )
    rButton.addEventListener('click', deleteShoppingListItem);

    newTableRow.appendChild(nameCell);
    newTableRow.appendChild(qtyCell);
    newTableRow.appendChild(priceCell);
    newTableRow.appendChild(subtotalCell);
    newTableRow.appendChild(rButton);

    shoppingListTableBody.appendChild(newTableRow);
}

function getTotalAmount(){
    const shoppingListTableTotal = document.getElementById('shoppingListTableTotal')
    let totalAmount = 0
    for (let article of shoppingList) {
        let newArticleSubtotal = article.qty * article.price
        totalAmount += newArticleSubtotal
      }
    shoppingListTableTotal.innerText = totalAmount;
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