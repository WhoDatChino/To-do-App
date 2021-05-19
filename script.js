"strict";

// ///////// ELEMENTS
const noListMessage = document.querySelector(".no-lists");
const listPreviewsParent = document.querySelector(".list-previews");
const listViewExpanded = document.querySelector(".list-view-expanded");
const listTitleParent = document.querySelector(".list-title");
const listColour = document.querySelector(".colour-line");
const listOptionsContainer = document.querySelector(".list-options");
const overlay = document.querySelector(".overlay");
const formContainer = document.querySelector(".form-container");
const form = document.querySelector(".new-list-item-form");
const successMessage = document.querySelector(".success-message");
const listItemsParent = document.querySelector(".list-items");
const activeClass = document.querySelector(".list-element, .active");
const deleteListConfirmation = document.querySelector(".delete-list-message");

const newListBtn = document.querySelector(".new-list-btn");
const colourPickerBtn = document.querySelector(".list-colour-btn");
const cancelFormBtn = document.querySelector(".cancel-btn");
const cancelListDelBtn = document.querySelector(".cancel-delete");
const deleteListBtn = document.querySelector(".delete-btn");

// ////// CODE

// ///// CLASSES

class ListItem {
  id = +(Date.now() + "").slice(-10);

  constructor(title, dueDate, timeDue, description, priority) {
    this.itemTitle = title;
    this.dueDate = this._dateFormatter(dueDate);
    this.timeDue = timeDue;
    this.description = description;
    this.priority = priority;
    this.completed = false;
    this.sortingOrder = this._sortOrder(this.priority);
  }

  _dateFormatter(date) {
    if (date) {
      const dateObj = new Date(date);
      const day = dateObj.getDate();
      const month = dateObj.getMonth();
      const year = dateObj.getFullYear();

      const monthArr = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      return `${day} ${monthArr[month]} ${year}`;
    }
    return "";
  }

  _sortOrder(pri) {
    if (pri === "high_pri") return 1;
    if (pri === "medium_pri") return 2;
    if (pri === "low_pri") return 3;
    if (pri === "no_pri") return 4;
  }
}

class List {
  id = (Date.now() + "").slice(-10);
  listItems = new Array();

  // constructor function is what is responsible for creating the new object based on this class -> fired whenever you want to create a new list object
  constructor() {
    this.listTitle = "Untitled list";
    this.colour = "var(--grey-theme)";
  }
}

// the 'new' keyword
// - creates new empty object
// - sets value of 'this' to new empty object. Use 'this' to set new properties to the instances
// - calls the constructor method

class App {
  curList = 1;
  listInLC;
  listCollection = [];

  constructor() {
    this._getLocalStorage();

    // NEW LIST
    newListBtn.addEventListener("click", this._addNewList.bind(this));

    // EDIT TITLE
    listTitleParent.addEventListener(
      "click",
      this._editListTitleForm.bind(this)
    );

    // CLICK ON LIST PREVIEW
    listPreviewsParent.addEventListener(
      "click",
      this._changeCurList.bind(this)
    );

    // LIST INTERACTIONS
    listOptionsContainer.addEventListener(
      "click",
      this._listInteractions.bind(this)
    );

    // NEW LIST ITEM FORM SUBMISSION
    form.addEventListener("submit", this._createNewListItem.bind(this));

    // INTERACTION W/ LIST ITEMS
    listItemsParent.addEventListener(
      "click",
      this._itemInteractions.bind(this)
    );
  }

  // ////////METHODS

  // INTERACTION W/ LIST ITEMS
  _itemInteractions(e) {
    const target = e.target;
    const itemID = +target.closest(".full-list-item").dataset.id;
    const listItemWrapper = listItemsParent.querySelector(
      `[data-id = '${itemID}']`
    );
    let selectedListItemIndex = this.curList.listItems.findIndex(
      (item) => item.id === itemID
    );
    const extraInfoBtn = listItemWrapper.querySelector(".expand-item-btn");
    const extraInfoDiv = listItemWrapper.querySelector(".list-additional-info");
    const listItemCheck = listItemWrapper.querySelector(".check");
    const listItem = listItemWrapper.querySelector(".list-item");

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
      // Mutating the list object & restting it in the list collection
      this.curList.listItems = this.curList.listItems.filter(
        (item) => item.id !== itemID
      );
      this.listCollection[this._findObjectAlgo()] = this.curList;
      this._setLocalStorage();
      console.log(this.listCollection);

      // Removing item from dom w/ animation
      listItemWrapper.classList.add("deleting");
      listItemWrapper.addEventListener("transitionend", function () {
        listItemWrapper.remove();
        console.log(`hello`);
      });
    }

    // Completing an item - changes property on list item object and reflects that across listCollection
    // 1 - sets completed property to true/false
    // 2 - sets sorted curlist in listCollection
    // 3 - set local storage
    listItemCheck.checked
      ? (listItem.classList.add("completed"),
        (this.curList.listItems[selectedListItemIndex].completed = true),
        (this.listCollection[this._findObjectAlgo()] = this.curList),
        this._setLocalStorage())
      : (listItem.classList.remove("completed"),
        (this.curList.listItems[selectedListItemIndex].completed = false),
        (this.listCollection[this._findObjectAlgo()] = this.curList),
        this._setLocalStorage());
  }

  // CREATE NEW LIST ITEM
  _createNewListItem(e) {
    e.preventDefault();

    const itemName = itemNameInput.value;
    const dueDate = itemDueDateInput.value;
    const timeDue = itemTimeDueInput.value;
    const description = itemDescriptionInput.value;
    const priority = itemPriorityInput.value;

    // Creating new listItem Obj
    const listItem = new ListItem(
      itemName,
      dueDate,
      timeDue,
      description,
      priority
    );

    // Adding new list item to obj in listCollection
    this.listCollection[this._findObjectAlgo()].listItems.push(listItem);
    // Altering the curList
    this.curList = this.listCollection[this._findObjectAlgo()];

    this._insertionSort();
    this._setLocalStorage();

    // Clears input fields
    this._clearForm();

    // Reset listItemsParent and re-render sorted list items
    listItemsParent.innerHTML = "";
    this.curList.listItems.forEach((item) => this._renderListItem(item));

    // Shows and hides success message
    successMessage.classList.remove("hidden");
    setTimeout(function () {
      successMessage.classList.add("hidden");
    }, 750);
  }

  // LIST INTERACTIONS
  _listInteractions(e) {
    const button = e.target.closest("button");

    // Guard clause
    if (!button) return;

    //   List colour button
    if (button.classList.contains("list-colour-btn")) {
      this._changeListColourBTN();
    }

    if (button.classList.contains("colour-option")) {
      this._changeListColourOptions(button);
    }

    //   Add item button
    if (button.classList.contains("add-item-btn")) {
      this._showOverlayAndModal(formContainer);

      // Event listener to hide form when background/cancel btn clicked
      [overlay, cancelFormBtn].forEach((btn) =>
        btn.addEventListener("click", () => {
          this._hideOverlayAndModal(formContainer);
        })
      );
    }
    //   Delete List button
    if (button.classList.contains("delete-list-btn")) {
      this._showOverlayAndModal(deleteListConfirmation);

      [overlay, cancelListDelBtn, deleteListBtn].forEach((btn) =>
        btn.addEventListener("click", () => {
          this._hideOverlayAndModal(deleteListConfirmation);
        })
      );

      deleteListBtn.addEventListener("click", this._deleteList.bind(this));
    }
  }

  // DELETING A LIST
  _deleteList() {
    const listToBeDeleted = listPreviewsParent.querySelector(
      `[data-listID = '${this.curList.id}']`
    );

    // Guard clause
    if (this.listCollection.length === 0) return;

    // Add animation and transistion classes
    listToBeDeleted.classList.add("filling");
    listToBeDeleted.classList.add("removing");
    this._hideList();

    // Remove dom element after animation
    listToBeDeleted.addEventListener(
      "animationend",
      function () {
        // Removing DOM elements
        listToBeDeleted.remove();

        // Displaying no lists message if needed
        this._messageChecker();
      }.bind(this)
    );

    // Create new list collection w/o deleted list
    this.listCollection = this.listCollection.filter(
      (list) => list.id !== this.curList.id
    );

    this.curList = 1;
    this._setLocalStorage();
  }

  // CLEARS INPUT FIELDS IN LIST ITEM FORM
  _clearForm() {
    // Clears input fields
    itemNameInput.value =
      itemDueDateInput.value =
      itemTimeDueInput.value =
      itemDescriptionInput.value =
        "";
    // Makes sure default pri always "no priority"
    itemPriorityInput.value = "no_pri";
  }

  // SHOWS COLOUR PICKER
  _changeListColourBTN() {
    listColourContainer.classList.toggle("hidden");
  }

  // SETS CHOSEN COLOUR ON OBJECT + RENDERS
  _changeListColourOptions(btn) {
    // colour code obtained from button dataset
    const buttonColour = btn.dataset.colour;

    // Mutating object in LC & changing curList obj
    this.listCollection[this._findObjectAlgo()].colour = buttonColour;
    this.curList = this.listCollection[this._findObjectAlgo()];
    this._setLocalStorage();

    // Selecting corresponding list preview element's colour line & setting colour
    const curListPreview = listPreviewsParent.querySelector(
      `[data-listID = '${this.curList.id}']`
    );
    curListPreview.style.border = `${buttonColour} 2px solid`;
    curListPreview.firstElementChild.style.backgroundColor = buttonColour;

    // Re-render List view
    this._renderListColour();
  }

  _showOverlayAndModal(modal) {
    overlay.classList.remove("hidden");
    modal.classList.remove("hidden");
  }

  _hideOverlayAndModal(modal) {
    overlay.classList.add("hidden");
    modal.classList.add("hidden");
  }

  _changeCurList(e) {
    const targetID = e.target.dataset.listid;

    let prevSelectedEle;

    // Guard clause
    if (!targetID) return;

    // Keeping track of prev curList if there was one
    if (this.curList !== 1)
      prevSelectedEle = listPreviewsParent.querySelector(
        `[data-listID = '${this.curList.id}']`
      );

    // What happens when you click on a new list preview
    if (this.curList.id !== targetID) {
      // 1. Set curList to clicked element
      this.curList = this.listCollection.filter(
        (list) => list.id === targetID
      )[0];

      // Removes active styling from prev curList
      if (prevSelectedEle) {
        prevSelectedEle.style.border = "none";
        prevSelectedEle.classList.remove("active");
      }

      // Current list preview selected - adding active class and creating border colour
      const selectedEle = listPreviewsParent.querySelector(
        `[data-listID = '${this.curList.id}']`
      );
      selectedEle.classList.add("active");
      selectedEle.style.border = `${this.curList.colour} 2px solid`;

      // 2. Show the list
      this._showList();

      // Render list title contents
      this._renderListTitle();
      this._renderListColour();

      // Clering any prev list contents
      listItemsParent.innerHTML = "";

      //  Rendering curList list contents
      if (this.curList.listItems.length > 0) {
        this.curList.listItems.forEach((item) => this._renderListItem(item));
      }

      // Clicking preview if it is already the active list
      if (targetID === this.curList.id) {
        return;
      }
    }
  }

  // CREATING NEW LIST
  _addNewList(e) {
    let prevSelectedEle;

    // Removes active styling of prev preview
    if (this.curList !== 1) {
      prevSelectedEle = listPreviewsParent.querySelector(
        `[data-listID = '${this.curList.id}']`
      );
      prevSelectedEle.classList.remove("active");
      prevSelectedEle.style.border = "none";
    }

    this._showList();

    // Creating default list object & send to ListCollection
    let newList = new List();
    this.listCollection.push(newList);

    // Setting current List to created list
    this.curList = newList;

    this._setLocalStorage();

    // Removing message and rendering list preview
    this._messageChecker();
    this._renderListPreviewMarkup(newList);

    // Making newList the active list
    let selectedEle = listPreviewsParent.querySelector(
      `[data-listID = '${newList.id}']`
    );
    selectedEle.classList.add("active");

    // Render list title contents
    this._renderListTitle();

    // Render w/ correct styling
    this._renderListColour();

    // Removing anything in listItemsParent
    listItemsParent.innerHTML = "";
  }

  // EDIT LIST TITLE
  _editListTitleForm(e) {
    e.preventDefault();
    const target = e.target;
    const curListID = this.curList.id;
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

    this._setLocalStorage();

    // Re-render List title & part of preview
    this._renderListTitle();
    curListPreview.lastElementChild.innerHTML = this.curList.listTitle;
  }

  // INSERTION SORT ALGO FOR LIST ITEM PRIORITIES
  _insertionSort() {
    let arr = this.curList.listItems;

    for (let i = 1; i < arr.length; i++) {
      let tempObj = arr[i];
      let tempValue = arr[i].sortingOrder;
      let j = i - 1;

      while (j >= 0 && tempValue < arr[j].sortingOrder) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = tempObj;
    }

    // Set sorted listItems arr to curList & alter curList in listCollection
    this.curList.listItems = arr;
    this.listCollection[this._findObjectAlgo()] = this.curList;

    this._setLocalStorage();
  }

  // Local storage
  _setLocalStorage() {
    localStorage.setItem("listCollection", JSON.stringify(this.listCollection));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("listCollection"));

    if (!data) return;

    this.listCollection = data;

    this._renderStorage();
  }

  // Rendering lists stored in local storage on loadup
  _renderStorage() {
    this._messageChecker();
    this.listCollection.forEach((list) => this._renderListPreviewMarkup(list));
  }

  // Returns the index of the original object in the listCollection
  _findObjectAlgo() {
    const curListID = this.curList.id;

    return this.listCollection.findIndex((obj) => obj.id === curListID);
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

  // Determines if 'no-lists' message should be displayed or not
  _messageChecker() {
    this.listCollection.length > 0
      ? noListMessage.classList.add("hidden")
      : noListMessage.classList.remove("hidden");
    // console.log(`heelo`);
  }

  // /////RENDERS

  // Render list colour - colour line & colour picker button
  _renderListColour() {
    listColour.style.backgroundColor = this.curList.colour;
    colourPickerBtn.style.backgroundColor = this.curList.colour;
  }

  _renderListItem(listItem) {
    const html = this._generateListItemMarkup(listItem);

    listItemsParent.insertAdjacentHTML("beforeend", html);
  }

  // Rendering list preview
  _renderListPreviewMarkup(list) {
    const html = this._generateListPreviewMarkup(list);

    listPreviewsParent.insertAdjacentHTML("afterbegin", html);

    listPreviewsParent.querySelector(
      ".colour-line"
    ).style.backgroundColor = `${list.colour}`;
  }

  _renderListTitle() {
    // Render title
    listTitleParent.innerHTML = this._generateListTitleMarkup(this.curList);
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
    let html = `
      <div class="full-list-item" data-id=${data.id}>
  
        <div class="list-item ${data.priority} ${
      data.completed ? "completed" : ""
    }">
  
          <div class="item-info">
              <input type="checkbox" ${
                data.completed ? "checked" : ""
              } name="" class="check">
              <label for="checkbox" class="checkmark"></label>
              <h2>${data.itemTitle}</h2>
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
  
        <div class="list-additional-info ">`;

    if (data.description)
      html += `<p class="extra-info">
              <span>Description: </span>
                 ${data.description}
             </p>`;
    if (data.dueDate)
      html += `<p class="extra-info">
              <span>Due Date: </span>
                 ${data.dueDate}
             </p>`;
    if (data.timeDue)
      html += `<p class="extra-info">
              <span>Time Due: </span>
                 ${data.timeDue}
             </p>`;

    if (!data.description && !data.dueDate && !data.timeDue)
      html += `<p class="extra-info">
              <span>No additional information added </span>
             </p>`;

    html += `</div>

              </div>`;

    return html;
  }

  // Create list title markup
  _generateListTitleMarkup(data) {
    return `
    <div class="form hidden">
      <form class="change-list-title-form">
          <input class="input-list-title" required  type="text" maxlength="20" placeholder="(max 20 characters)" name="list-title" >
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
