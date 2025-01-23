// @ts-nocheck

import USUAL_PRODUCTS from '../src/api/get.articles.json' with {type: 'json'};

const shoppingList = [];
let totalAmount = 0;
//const API_USUAL_PRODUCTS_URL = direccion api

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

function onDOMContentLoaded(){
    const newArticleButton = document.getElementById('newArticle');
    const resetListButton = document.getElementById('newList');

    newArticleButton.addEventListener('click', onNewItemSubmit);
    resetListButton.addEventListener('click', resetList);
    document.getElementById('article').addEventListener('input', autocompleteFields);
    getUsualProducts();
    getApiData();
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

function getUsualProducts() {
    const dataListElement = document.getElementById('productos');
    USUAL_PRODUCTS.forEach((product) => {
        const newOptionElement = document.createElement('option');
        newOptionElement.value = product.name;
        dataListElement.appendChild(newOptionElement);
    })
}

async function getApiData(){
    //const API_MERCADONA = 'https://tienda.mercadona.es/api/categories'
    const API_USUAL_PRODUCTS_URL = 'src/api/get.articles.json'
    const apiData = await fetch(API_USUAL_PRODUCTS_URL)
    .then((response) => {
        if(!response.ok){
            showError();
        }

        return response.json();
    })
console.log(apiData)
}

function showError(errorMessage){
    window.alert(errorMessage)
    console.error(errorMessage)
    throw new Error(`HTTP error! Status: ${errorMessage}`)
}

function autocompleteFields() {
    const articleInput = document.getElementById('article').value;
    const qtyInput = document.getElementById('qty');
    const priceInput = document.getElementById('price');

    const selectedProduct = USUAL_PRODUCTS.find(product => product.name === articleInput);

    if (selectedProduct) {
      qtyInput.value = selectedProduct.quantity;  
      priceInput.value = selectedProduct.price;  
    } else {
      qtyInput.value = ""; 
      priceInput.value = "";
    }
  }