const actionItems = [
  { id: 1, text: 'Action item placeholder one', completed: false, hidden: false },
  { id: 2, text: 'Action item placeholder two', completed: false, hidden: false },
  { id: 3, text: 'Action item placeholder three', completed: false, hidden: false },
  { id: 4, text: 'Action item placeholder four', completed: false, hidden: false }
];

// const hiddenItems = [];

const newItemInputNode = document.getElementById('newItemInput');
const newItemBtnNode = document.getElementById('newItemBtn');
const listContainerNode = document.getElementById('listContainer');

const trashSwitchNode = document.getElementById('trashSwitch');
const trashContainerNode = document.getElementById('trashContainer');

// Event listener for new item
newItemBtnNode.addEventListener('click', function() {
  const itemFromUser = getItemFromUser();
  if (!itemFromUser.text) {
    alert('Please enter the field');
    return;
  }

  // For TBS:
  console.log(itemFromUser);

  // add new item to items list
  addItem(itemFromUser);

  // For TBS:
  console.log(actionItems);
  
  // add new item to rendering list
  createListItem(itemFromUser);

  // Clear input field
  newItemInputNode.value = '';
  renderActiveList();
  // renderList();
});

trashSwitchNode.addEventListener('click', function() {
  renderTrashList();
});

// Get new item from user
function getItemFromUser() {
  const newItemFromCustomer = {
    id: generateUniqueId(actionItems),
    text: newItemInputNode.value,
    completed: false,
    hidden: false
  }
  return newItemFromCustomer;
}

function addItem(newActionItem) {
  actionItems.push(newActionItem);
}

// Generate unique id has not been used in array yet:
function generateUniqueId(arrayList) {
  let id = 1;
  while (arrayList.some(item => item.id === id)) {
    id++;
  }
  return id;
}

// Create list item template for rendering
function createListItem(item) {
  const listItem = document.createElement('li');
  if (item.completed) {
    listItem.className = 'display-item-wrapper completed';
  } else {
    listItem.className = 'display-item-wrapper';
  };

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = `checkbox_${item.id}`;
  checkbox.className = 'item-checkbox';
  checkbox.checked = item.completed;

  const label = document.createElement('label');
  label.htmlFor = `checkbox_${item.id}`;
  label.innerText = item.text;

  const hideButton = document.createElement('button');
  hideButton.className = 'item-hide-btn';
  hideButton.id = `btn_${item.id}`;
  hideButton.innerText = '';

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(hideButton);

  // for TBS:
  console.log(listItem);
  return listItem;
}

function createTrashItem(item) {
  const trashItem = document.createElement('li');
  if (item.completed) {
    trashItem.className = 'display-item-wrapper completed';
  } else {
    trashItem.className = 'display-item-wrapper';
  };

  const label = document.createElement('label');
  label.htmlFor = `checkbox_${item.id}`;
  label.innerText = item.text;

  const hideButton = document.createElement('button');
  hideButton.className = 'restore-btn';
  hideButton.id = `btn_${item.id}`;
  hideButton.innerText = '';

  trashItem.appendChild(label);
  trashItem.appendChild(hideButton);

  // for TBS:
  console.log(trashItem);
  return trashItem;
}

// for TBS:
createListItem(actionItems[1]);

// Render the list
function renderActiveList() {
  // Clear existing list
  listContainerNode.innerHTML = '';

  // Create list item and append list container
  actionItems.forEach(item => {
    if (!item.hidden) {
      const listItem = createListItem(item);
      listContainerNode.appendChild(listItem);
    }
  });

  // Set event listeners for checkboxes and btns
  const checkboxes = document.querySelectorAll('.item-checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', handleCheckboxChange);
  });
  
  const hideButtons = document.querySelectorAll('.item-hide-btn');
  hideButtons.forEach(button => {
    button.addEventListener('click', handleHideButtonClick);
  });
}

function renderTrashList() {
  // Clear existing list
  trashContainerNode.innerHTML = '';

  // Create list item and append list container
  actionItems.forEach(item => {
    if (item.hidden) {
      const trashItem = createTrashItem(item);
      trashContainerNode.appendChild(trashItem);
    }
  });

  const restoreButtons = document.querySelectorAll('.restore-btn');
  restoreButtons.forEach(button => {
    button.addEventListener('click', handleRestoreButtonClick);
  });
}

// Event handler for checkbox change event
function handleCheckboxChange(event) {
  const checkbox = event.target;
  // Get the item id from the checkbox id:
  const itemId = parseInt(checkbox.id.split('_')[1]);

  // Update checked status for item with relevant id:
  const item = actionItems.find(item => item.id === itemId);
  if (item) {
    item.completed = checkbox.checked;
    console.log(`Action item ${itemId} status updated: ${item.completed}`);
  }
  renderActiveList();
}

// Event handler for hide button click event
function handleHideButtonClick(event) {
  const button = event.target;
  const itemId = parseInt(button.id.split('_')[1]);
  
  // Update hidden status for item with relevant id:
  const item = actionItems.find(item => item.id === itemId);
  if (item) {
    item.hidden = true;
    console.log(`Action item ${itemId} hidden status updated: ${item.hidden}`);
  }
  renderActiveList();
}

function handleRestoreButtonClick(event) {
  const button = event.target;
  const itemId = parseInt(button.id.split('_')[1]);
  
  // Update hidden status for item with relevant id:
  const item = actionItems.find(item => item.id === itemId);
  if (item) {
    item.hidden = false;
    console.log(`Action item ${itemId} hidden status updated: ${item.hidden}`);
  }
  trashContainerNode.innerHTML = '';
  renderActiveList();
  renderTrashList();
}

// Render the list
renderActiveList();