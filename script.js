"strict";

// ///////// ELEMENTS
const noListMessage = document.querySelector(".no-lists");
const listPreviewsParent = document.querySelector(".list-previews");
const listItemsParent = document.querySelector(".list-items");

const successMessage = document.querySelector(".success-message");
const listColour = document.querySelector(".colour-line");
const listOptionsContainer = document.querySelector(".list-options");
const listColourContainer = document.querySelector(".list-colour-options");

const formContainer = document.querySelector(".form-container");
const overlay = document.querySelector(".overlay");
const deleteListConfirmation = document.querySelector(".delete-list-message");

const newListBtn = document.querySelector(".new-list-btn");
const colourPickerBtn = document.querySelector(".list-colour-btn");

const listItemData1 = {
  id: 1111,
  title: "Eat Apples",
  priority: "high_pri",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo nisi, sed quia neque esse maiores nam et id",
  dueDate: "14 Mar 2021",
  timeDue: "12.30pm",
  completed: false,
};

const listItemData2 = {
  id: 2222,
  title: "Eat Bread",
  priority: "medium_pri",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo nisi, sed quia neque esse maiores nam et id",
  dueDate: "14 Mar 2021",
  timeDue: "12.30pm",
  completed: false,
};

const listItemData3 = {
  id: 3333,
  title: "Eat Cake",
  priority: "low_pri",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo nisi, sed quia neque esse maiores nam et id",
  dueDate: "14 Mar 2021",
  timeDue: "12.30pm",
  completed: false,
};

const state = {
  id: "",
  listTitle: "",
  colour: "var(--grey-theme)",
  listItems: [],
};

// ///////// EVENTLISTENERS

// Event delegation - listener added to parent element
listOptionsContainer.addEventListener("click", function (e) {
  const button = e.target.closest("button");
  //   let buttonColour;
  console.log(button);

  if (!button) return;

  //   List colour button
  if (button.classList.contains("list-colour-btn"))
    listColourContainer.classList.toggle("hidden");

  if (button.classList.contains("colour-option")) {
    const buttonColour = listColourPicker(button);
    changeColour(buttonColour);
  }

  //   Add item button
  if (button.classList.contains("add-item-btn")) {
    // toggleModal(formContainer);
    generateListItemMarkup(listItemData1);
    generateListItemMarkup(listItemData2);
    generateListItemMarkup(listItemData3);
  }
  //   Delete List button
  if (button.classList.contains("delete-list-btn")) {
    toggleModal(deleteListConfirmation);
  }
});

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
  console.log(itemID);
  console.log(listItemWrapper);

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

// ///////// FUNCTIONS
let count = 0;
function addNewList() {
  if (listPreviewsParent.firstElementChild.classList.contains("no-lists"))
    noListMessage.classList.add("hidden");

  count++;
  const html = `<div class="list-element">
                <div class="colour-line"></div>
                <h2>Untitled List ${count} </h2>
                </div>`;
  listPreviewsParent.insertAdjacentHTML("afterbegin", html);
  //   listExpandedParent.insertAdjacentHTML()
  const locale = navigator;
  console.log(locale);
}

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

function changeColour(colCode) {
  listColour.style.backgroundColor = colCode;
  colourPickerBtn.style.backgroundColor = colCode;
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

// ADDING LIST ITEM
function generateListItemMarkup(data) {
  html = `
    <div class="full-list-item" data-id=${data.id}>

      <div class="list-item ${data.priority}">

        <div class="item-info">
            <input type="checkbox"  name="" class="check">
            <label for="checkbox" class="checkmark"></label>
            <h2>${data.title} ID: ${data.id}</h2>
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
  listItemsParent.insertAdjacentHTML("beforeend", html);
}
