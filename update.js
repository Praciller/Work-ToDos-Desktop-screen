const addButton = document.getElementById('add');
const input = document.getElementById('userInput');
const ul = document.querySelector('ul');
const item = document.getElementsByTagName('li');
const ENTER_BUTTON_CODE = 13;

// ดึง list จาก local storage
function getStoredItems() {
  const storedItems = JSON.parse(localStorage.getItem('todoList'));
  if (storedItems) {
    for (let i = 0; i < storedItems.length; i++) {
      const newLiElement = document.createElement('li');
      newLiElement.appendChild(document.createTextNode(storedItems[i].value));
      ul.appendChild(newLiElement);
      if (storedItems[i].completed) {
        newLiElement.classList.add('done');
      }
      addListItemListeners(newLiElement);
    }
  }
}

// เซฟ list ไปยัง local storage
function saveToStorage() {
  const items = [];
  for (let i = 0; i < item.length; i++) {
    const listItem = item[i];
    const value = listItem.firstChild.textContent;
    const completed = listItem.classList.contains('done');
    items.push({ value, completed });
  }
  localStorage.setItem('todoList', JSON.stringify(items));
}

// สร้างเหตุการณ์ของ list 
function addListItemListeners(listItem) {
  function crossOut() {
    listItem.classList.toggle('done');
    saveToStorage();
  }

  function deleteListItem() {
    listItem.classList.add('delete');
    saveToStorage();
  }

  listItem.addEventListener('click', crossOut);

  const deleteBtn = document.createElement('button');
  deleteBtn.appendChild(document.createTextNode('X'));
  listItem.appendChild(deleteBtn);
  deleteBtn.addEventListener('click', deleteListItem);
}

function inputLength() {
  return input.value.length;
}

function listLength() {
  return item.length;
}

function createListElement() {
  const newLiElement = document.createElement('li');
  const inputValue = input.value;
  newLiElement.appendChild(document.createTextNode(inputValue));
  ul.appendChild(newLiElement);
  input.value = '';

  addListItemListeners(newLiElement);
  saveToStorage();
}

function addListAfterClick() {
  if (inputLength() > 0) {
    createListElement();
  }
}

function addListAfterKeypress(event) {
  if (inputLength() > 0 && event.which === ENTER_BUTTON_CODE) {
    createListElement();
  }
}

addButton.addEventListener('click', addListAfterClick);
input.addEventListener('keypress', addListAfterKeypress);

// เรียกใช้ function
getStoredItems();
