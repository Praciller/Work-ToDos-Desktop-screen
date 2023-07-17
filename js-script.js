const addButton = document.getElementById('add');
const input = document.getElementById('userInput');
const ul = document.querySelector('ul');
const item = document.getElementsByTagName('li');

const ENTER_BUTTON_CODE = 13;

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

  input.value = ''; //Reset text input field

  function crossOut() {
    newLiElement.classList.toggle('done');
  }

  // Add Click Event Listener to itself
  newLiElement.addEventListener('click', crossOut);

  // START ADD DELETE BUTTON
  const deleteBtn = document.createElement('button');

  deleteBtn.appendChild(document.createTextNode('X'));
  newLiElement.appendChild(deleteBtn);

  function deleteListItem() {
    newLiElement.classList.add('delete');
  }

  // Add Click Event Listener to deleteBtn
  deleteBtn.addEventListener('click', deleteListItem);
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
