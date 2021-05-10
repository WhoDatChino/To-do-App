"strict";

// ///////// ELEMENTS
const noListMessage = document.querySelector(".no-lists");
const listPreviewsParent = document.querySelector(".list-previews");
const listViewExpanded = document.querySelector(".list-view-expanded");
const listTitleParent = document.querySelector(".list-title");

const newListBtn = document.querySelector(".new-list-btn");

// OLD

const listItemsParent = document.querySelector(".list-items");

const successMessage = document.querySelector(".success-message");
const listColour = document.querySelector(".colour-line");
const listOptionsContainer = document.querySelector(".list-options");
const listColourContainer = document.querySelector(".list-colour-options");

const formContainer = document.querySelector(".form-container");
const overlay = document.querySelector(".overlay");
const deleteListConfirmation = document.querySelector(".delete-list-message");

const colourPickerBtn = document.querySelector(".list-colour-btn");

const listHeading = document.querySelector(".unique-heading");

// Form values
const itemNameInput = document.querySelector(".item-name");
const itemDueDateInput = document.querySelector(".due-date");
const itemTimeDueInput = document.querySelector(".time-due");
const itemDescriptionInput = document.querySelector(".description");
const itemPriorityInput = document.querySelector(".priority");

const formCont = document.querySelector(".new-list-item-form");

// ////// CODE

const listItemData1 = {
  id: 1111,
  itemTitle: "Eat Apples",
  priority: "high_pri",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo nisi, sed quia neque esse maiores nam et id",
  dueDate: "14 Mar 2021",
  timeDue: "12.30pm",
  completed: false,
};

const listItemData2 = {
  id: 2222,
  itemTitle: "Eat Bread",
  priority: "medium_pri",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo nisi, sed quia neque esse maiores nam et id",
  dueDate: "14 Mar 2021",
  timeDue: "12.30pm",
  completed: false,
};

const listItemData3 = {
  id: 3333,
  itemTitle: "Eat Cake",
  priority: "low_pri",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo nisi, sed quia neque esse maiores nam et id",
  dueDate: "14 Mar 2021",
  timeDue: "12.30pm",
  completed: false,
};

const fullList1 = {
  id: "123456781",
  listTitle: "My first List",
  colour: "var(--bright-theme)",
  listItems: [listItemData1, listItemData2, listItemData3],
};

const fullList2 = {
  id: "123456782",
  listTitle: "My second List",
  colour: "var(--blue-theme)",
  listItems: [listItemData1, listItemData2, listItemData3],
};

const fullList3 = {
  id: "123456783",
  listTitle: "My third List",
  colour: "var(--purple-theme)",
  listItems: [listItemData1, listItemData2, listItemData3],
};

// const listCollection = {
//   lists: [fullList1, fullList2, fullList3],
// };

// ///////// EVENTLISTENERS

// LIST TITTLE
// listTitleParent.addEventListener("click", function (e) {
//   e.preventDefault();
//   const target = e.target;
//   console.log(target);
//   const noForm = document.querySelector(".no-form");
//   const form = document.querySelector(".form");
//   const newHeading = document.querySelector(".input-list-title");

//   if (
//     target.classList.contains("edit-title-btn") ||
//     target.classList.contains("input-list-title-btn")
//   ) {
//     noForm.classList.toggle("hidden");
//     form.classList.toggle("hidden");
//   }

//   fullList1.listTitle = `${newHeading.value}`;
//   // generateListItemMarkup(data)
//   console.log(fullList1);
//   listHeading.innerHTML = `${newHeading.value}`;

// });

// LIST ITEM EVENTS
listItemsParent.addEventListener("click", function (e) {
  // console.log(e.target);
  const target = e.target;
  const listItemWrapper = target.closest(".full-list-item");
  const itemID = target.closest(".full-list-item").dataset.id;
  const extraInfoBtn = listItemWrapper.querySelector(".expand-item-btn");
  const extraInfoDiv = listItemWrapper.querySelector(".list-additional-info");
  const listItemCheck = listItemWrapper.querySelector(".check");
  const listItem = listItemWrapper.querySelector(".list-item");
  // console.log(itemID);
  // console.log(listItemWrapper);

  // Expanding and contracting additional info div
  if (target.classList[0] === "expand-item-btn") {
    extraInfoDiv.classList[1] === "expanded"
      ? (extraInfoDiv.classList.remove("expanded"),
        (extraInfoBtn.style.transform = "rotate(0deg)"))
      : (extraInfoDiv.classList.add("expanded"),
        (extraInfoBtn.style.transform = "rotate(180deg)"));
  }

  // Deleting list item
  if (target.classList[0] === "delete-item-btn") {
    listItemWrapper.remove();
  }

  // Completing an item
  listItemCheck.checked
    ? listItem.classList.add("completed")
    : listItem.classList.remove("completed");
});

// LIST OPTIONS BUTTONS
listOptionsContainer.addEventListener("click", function (e) {
  const button = e.target.closest("button");
  //   let buttonColour;
  // console.log(button);

  if (!button) return;

  //   List colour button
  if (button.classList.contains("list-colour-btn"))
    listColourContainer.classList.toggle("hidden");

  if (button.classList.contains("colour-option")) {
    const buttonColour = listColourPicker(button);
    changeColour(buttonColour, fullList1);
  }

  //   Add item button
  if (button.classList.contains("add-item-btn")) {
    // toggleModal(formContainer);
    console.log(generateListItemMarkup(listItemData1));
    generateListItemMarkup(listItemData2);
    generateListItemMarkup(listItemData3);
  }
  //   Delete List button
  if (button.classList.contains("delete-list-btn")) {
    toggleModal(deleteListConfirmation);
  }
});

// ///////// FUNCTIONS

// GENERATE LIST PREVIEW
// function generateListPreview(list) {
//   if (listPreviewsParent.firstElementChild.classList.contains("no-lists"))
//     noListMessage.classList.add("hidden");

//   const html = `<div class="list-element">
//                 <div class="colour-line" data-colour=${list.colour}></div>
//                 <h2>${list.listTitle} </h2>
//                 </div>`;

//   listPreviewsParent.insertAdjacentHTML("afterbegin", html);
//   listPreviewsParent.querySelector(
//     ".colour-line"
//   ).style.backgroundColor = `${list.colour}`;
// }
// generateListPreview(fullList1);
// generateListPreview(fullList2);
// generateListPreview(fullList3);
// console.log(fullList1);

// Render info from list object
function renderList(listObj) {
  // console.log(`RenderList:`, listObj);
  // console.log(`list items:`, listObj.listItems);
  const listItems = listObj.listItems;
  listItems.forEach((item) => generateListItemMarkup(item));
  // listHeading.innerHTML = `${listObj.listTitle}`;
  // generateListItemMarkup(listObj);
}
// renderList(listCollection.lists[0]);

// Message un-hidden when form is submitted
const hideSuccessMessage = function () {
  setTimeout(() => successMessage.classList.add("hidden"), 700);
};

noListMessage.addEventListener("click", hideSuccessMessage);

// overlay.addEventListener("click", toggleModal);

// CHANGING LIST COLOUR
function listColourPicker(event) {
  return (buttonColour = event.dataset.colour);
}

function changeColour(colCode, curList) {
  listColour.style.backgroundColor = colCode;
  colourPickerBtn.style.backgroundColor = colCode;
  curList.colour = colCode;
  console.log(curList);
}

// OVERLAY & MODAL WINDOW
// open
function toggleModal(modal) {
  overlay.classList.toggle("hidden");
  modal.classList.toggle("hidden");
}
// // close
// function closeModal(modal) {
//   overlay.classList.add("hidden");
//   modal.classList.add("hidden");
// }

// ///// CLASSES

class List {
  id = (Date.now() + "").slice(-10);

  // constructor function is what is responsible for creating the new object based on this class -> fired whenever you want to create a new list object
  constructor() {
    this.listTitle = "Untitled list";
    this.colour = "var(--grey-theme)";
    this.listItems = [];

    this.addListItem();
    // this.removeListItem();
  }

  changeListTitle(newTitle) {
    this.listTitle = newTitle;
  }

  addListItem(itemObj) {
    // console.log(this);
    this.listItems.push(itemObj);
  }

  removeListItem(itemObj) {
    // item from array where who's id matches the id of itemObj must be deleted. Filter array if id doesnt match id of itemObj.
    const idToRemove = itemObj.id;
    this.listItems = this.listItems.filter((item) => item.id !== idToRemove);
    console.log(`remove`, this.listItems);
    console.log(this);
  }

  changeColour(colCode) {
    this.colour = colCode;
  }
}

const q = {
  id: 3333,
  itemTitle: "Eat Cake",
  priority: "low_pri",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo nisi, sed quia neque esse maiores nam et id",
  dueDate: "14 Mar 2021",
  timeDue: "12.30pm",
  completed: false,
};
// the 'new' keyword
// - creates new empty object
// - sets value of 'this' to new empty object. Use 'this' to set new properties to the instances
// - calls the constructor method

let list1 = new List();

const z = {
  id: "123456781",
  listTitle: "My first List",
  colour: "var(--bright-theme)",
  listItems: [listItemData1, listItemData2, listItemData3],
};
// 1620138352117

class ListItem {
  id = (Date.now() + "").slice(-10);

  constructor(title, dueDate, timeDue, description, priority) {
    this.itemtitle = itemNameInput.value;
    this.dueDate = itemDueDateInput.value;
    this.timeDue = itemTimeDueInput.value;
    this.description = itemDescriptionInput.value;
    this.priority = itemPriorityInput.value;
    this.completed = false;
  }

  convertPri(pri) {}
}

function clearForm() {
  // Clears input fields
  itemNameInput.value = itemDueDateInput.value = itemTimeDueInput.value = itemDescriptionInput.value =
    "";
  // Makes sure default pri always "no priority"
  itemPriorityInput.value = "no_pri";
}

formCont.addEventListener("submit", function (e) {
  e.preventDefault();
  const listItem = new ListItem();
  console.log(listItem);
  // formCont.reset();
  list1.addListItem(listItem);
  console.log(list1);
  clearForm();
});

// itemNameInput.value || "Untitled List"
// itemDueDateInput.value;
// itemTimeDueInput.value
// itemDescriptionInput.value
// itemPriorityInput.value

class App {
  curList = 1;
  listInLC;
  listCollection = [fullList1, fullList2];

  constructor() {
    this._renderStorage();
    // this._showList();

    // EventLis on new list button
    newListBtn.addEventListener("click", this._addNewList.bind(this));

    listTitleParent.addEventListener(
      "click",
      this._editListTitleForm.bind(this)
    );

    listPreviewsParent.addEventListener("click", this._changeCurList);
  }

  // //METHODS

  _changeCurList(e) {
    const targetID = e.target.dataset.listid;
    this.curList = this.listCollection.some((list) => list.id === targetID);
    console.log(this.curList);
  }

  // Creating new list
  _addNewList(e) {
    // 1. Create new List object
    // 2. Show Right screen if hidden
    //  2.1 Render title
    // 3. Render preview
    // 4. CurList = new List object created

    this._showList();
    // console.log(e.target);

    // Creating default list object & send to ListCollection
    let newList = new List();
    this.listCollection.push(newList);

    // Setting current List to created list
    this.curList = newList;

    // Removing message and rendering list preview
    this._messageChecker();
    this._renderListPreviewMarkup(newList);

    // Render list title contents
    this._renderListTitle(this.curList);

    console.log(`curList:`, newList);
    console.log(`LC`, this.listCollection);
  }

  // Hiding and showing title form
  _editListTitleForm(e) {
    e.preventDefault();
    const target = e.target;
    const curListID = this.curList.id;
    // console.log(target);
    const noForm = document.querySelector(".no-form");
    const form = document.querySelector(".form");
    const newHeadingInput = document.querySelector(".input-list-title");
    const curListPreview = listPreviewsParent.querySelector(
      `[data-listID = '${curListID}']`
    );

    // Hiding and showing edit list form
    if (
      target.classList.contains("edit-title-btn") ||
      target.classList.contains("input-list-title-btn")
    ) {
      noForm.classList.toggle("hidden");
      form.classList.toggle("hidden");
    }

    // guard clause
    if (newHeadingInput.value === "") return;

    // Mutating correct object in LC
    this.listCollection[this._findObjectAlgo()].listTitle =
      newHeadingInput.value;

    // Updating curList w/ newly edited object
    this.curList = this.listCollection[this._findObjectAlgo()];

    // Re-render List title & part of preview
    this._renderListTitle(this.curList);
    curListPreview.lastElementChild.innerHTML = this.curList.listTitle;
  }

  // Returns the index of the original object in the listCollection
  _findObjectAlgo() {
    const curListID = this.curList.id;

    return this.listCollection.findIndex((obj) => obj.id === curListID);

    // console.log(foundID);
  }

  // Hiding and showing right hand side list.
  _showList() {
    this.curList
      ? listViewExpanded.classList.remove("hidden")
      : this._hideList();
    console.log(this.curList);
  }

  _hideList() {
    listViewExpanded.classList.add("hidden");
  }

  // Determines if message should be displayed or not
  _messageChecker() {
    if (this.listCollection.length > 0) noListMessage.classList.add("hidden");
    // console.log(`heelo`);
  }

  // RENDERS
  // Rendering lists stored in local storage on loadup
  _renderStorage() {
    this._messageChecker();
    this.listCollection.forEach((list) => this._renderListPreviewMarkup(list));
  }

  // Rendering list preview
  _renderListPreviewMarkup(list) {
    const html = this._generateListPreviewMarkup(list);

    listPreviewsParent.insertAdjacentHTML("afterbegin", html);

    listPreviewsParent.querySelector(
      ".colour-line"
    ).style.backgroundColor = `${list.colour}`;
  }

  _renderListTitle(curList) {
    // Render title
    listTitleParent.innerHTML = this._generateListTitleMarkup(curList);
  }

  // MARKUPS
  // Create preview Markup
  _generateListPreviewMarkup(data) {
    return `<div class="list-element" data-listID="${data.id}">
    <div class="colour-line" ></div>
    <h2>${data.listTitle} </h2>
    </div>`;
  }

  // Create item markup
  _generateListItemMarkup(data) {
    return `
      <div class="full-list-item" data-id=${data.id}>
  
        <div class="list-item ${data.priority}">
  
          <div class="item-info">
              <input type="checkbox"  name="" class="check">
              <label for="checkbox" class="checkmark"></label>
              <h2>${data.itemTitle} ID: ${data.id}</h2>
          </div>
  
          <div class="item-interactions">
              <button class="expand-item-btn">
                <ion-icon class="expand-item" name="chevron-up-outline"></ion-icon>
              </button>
  
              <button class="delete-item-btn">
                <ion-icon class="delete-item" name="trash-outline"></ion-icon>
              </button>
          </div>
  
        </div>
  
        <div class="list-additional-info ">
          <p class="extra-info">
            <span>Description: </span>
              ${data.description}
          </p>
          <p class="extra-info">
            <span>Due date: </span>
              ${data.dueDate}
          </p>
          <p class="extra-info">
            <span>Time due: </span>
              ${data.timeDue}
          </p>
        </div>
  
      </div>
      `;
  }

  // Create list title markup
  _generateListTitleMarkup(data) {
    return `
    <div class="form hidden">
      <form class="change-list-title-form">
          <input class="input-list-title" required type="text" maxlength="20" placeholder="(max 20 characters)" name="list-title" >
          <input class="input-list-title-btn" type="submit" value="Done">
      </form>
    </div>
  
    <div class="no-form ">
      <h1 class="unique-heading">${data.listTitle}</h1>
        <button class="edit-title-btn">
            <ion-icon name="create-outline"></ion-icon>
        </button>
    </div>
    `;
  }
}

const a = new App();
// a._generateListPreviewMarkup();
