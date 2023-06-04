// Create an array of action items
const actionItems = [
    { id: 1, text: 'Action item 1', completed: false },
    { id: 2, text: 'Action item 2', completed: false },
    { id: 3, text: 'Action item 3', completed: false }
  ];
  
  // Get the parent element where the list will be rendered
  const listContainer = document.getElementById('listContainer');
  
  // Function to create a list item
  function createListItem(item) {
    const listItem = document.createElement('li');
    listItem.className = 'display-item-wrapper';
  
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
    hideButton.innerText = 'Hide';
  
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(hideButton);
  
    return listItem;
  }
  
  // Render the list
  function renderList() {
    // Clear the existing list
    listContainer.innerHTML = '';
  
    // Create list items and append them to the list container
    actionItems.forEach(item => {
      const listItem = createListItem(item);
      listContainer.appendChild(listItem);
    });
  
    // Set up event listeners for the checkboxes and buttons
    const checkboxes = document.querySelectorAll('.item-checkbox');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', handleCheckboxChange);
    });
  
    const hideButtons = document.querySelectorAll('.item-hide-btn');
    hideButtons.forEach(button => {
      button.addEventListener('click', handleHideButtonClick);
    });
  }
  
  // Event handler for checkbox change event
  function handleCheckboxChange(event) {
    const checkbox = event.target;
    const itemId = parseInt(checkbox.id.split('_')[1]); // Extract the item ID from the checkbox ID
  
    // Update the corresponding action item's completed status in the data
    const item = actionItems.find(item => item.id === itemId);
    if (item) {
      item.completed = checkbox.checked;
      console.log(`Action item ${itemId} completed status updated: ${item.completed}`);
    }
  }
  
  // Event handler for hide button click event
  function handleHideButtonClick(event) {
    const button = event.target;
    const listItem = button.parentElement;
  
    // Remove the corresponding action item from the data
    const itemId = parseInt(listItem.querySelector('.item-checkbox').id.split('_')[1]); // Extract the item ID
    const itemIndex = actionItems.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      actionItems.splice(itemIndex, 1);
      console.log(`Action item ${itemId} removed from the list.`);
    }
  
    // Remove the list item from the DOM
    listItem.remove();
  }
  
  // Call the renderList function to initialize the list
  renderList();
  