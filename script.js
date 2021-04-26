"strict";

// ///////// ELEMENTS
const noListMessage = document.querySelector(".no-lists");
const listPreviewsParent = document.querySelector(".list-previews");
const listExpandedParent = document.querySelector(".list-container");
const successMessage = document.querySelector(".success-message");
// const listItem = document.querySelector(".list-item");
// const listItemExtraInfo = document.querySelector(".list-additional-info");
// const newBtn = document.getElementById("btn");
// const listPreviewElement = document.querySelector(".list-element");
// const listPreviewElement = document.querySelector(".list-element");
// const listPreviewElement = document.querySelector(".list-element");
// const listPreviewElement = document.querySelector(".list-element");
// const listPreviewElement = document.querySelector(".list-element");
// const listPreviewElement = document.querySelector(".list-element");
const newListBtn = document.querySelector(".new-list-btn");
const listOptionsContainer = document.querySelector(".list-options");
const listColourContainer = document.querySelector(".list-colour-options");
// const l = document.getElementById(".edit-title-btn");
// const checkboxBtn = document.querySelector(".check");
// const expandListItemBtn = document.querySelector(".expand-item-btn");
// const deleteItemBtn = document.querySelector(".delete-item-btn");

// ///////// EVENTLISTENERS
newListBtn.addEventListener("click", addNewList);

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

// getting colour code of list colour options
// listColourContainer.addEventListener("click", function (e) {
//   console.log(e.target.dataset.colour);
// });

// Event delegation - listener added to parent element
listOptionsContainer.addEventListener("click", function (e) {
  const button = e.target.closest("button");
  let buttonColour;
  //   console.log(button);
  if (!button) return;
  if (button.classList.contains("list-colour-btn"))
    listColourContainer.classList.toggle("hidden");

  if (button.classList.contains("colour-option"))
    buttonColour = e.target.dataset.colour;

  console.log(buttonColour);
});
