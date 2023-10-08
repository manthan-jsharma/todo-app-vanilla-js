// Get references to HTML elements
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

// Initialize a placeholder text index
let placeholderIndex = 0;

const placeholderTexts = [
  "ya allah kuch likh de",
  "a-list-a day keeps procrastination away",
  "i was a doomer i started stacking it up, now im a retentionor",
  "yo mama has alzhiemer keep this medical supervisor",
];

function changePlaceholderText() {
  if (placeholderIndex < placeholderTexts.length) {
    taskInput.placeholder = placeholderTexts[placeholderIndex];
    placeholderIndex++;
  } else {
    placeholderIndex = 0; // Loop back to the first placeholder text
  }
}

function createUpdateButton(li) {
  const updateButton = document.createElement("button");
  updateButton.className = "update";
  updateButton.textContent = "Update";
  updateButton.addEventListener("click", function () {
    const updatedText = prompt("Enter the updated task:");
    if (updatedText !== null) {
      li.textContent = updatedText;
      li.appendChild(createUpdateButton(li)); // Re-add the update button
    }
  });
  return updateButton;
}
function deleteTask(li) {
  li.classList.remove("fade-in-horizontal");
  li.classList.add("fade-out-horizontal");
  setTimeout(() => {
    taskList.removeChild(li);
  }, 300);
}

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const li = document.createElement("li");
    li.innerHTML = `
      ${taskText}
      <button class="delete">Delete</button>
    `;
    const updateButton = createUpdateButton(li); // Create the update button
    li.appendChild(updateButton);

    li.classList.add("fade-in-horizontal");

    const deleteButton = li.querySelector(".delete");
    deleteButton.addEventListener("click", function () {
      deleteTask(li);
    });

    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = "";

    // Change the placeholder text
    changePlaceholderText();
  }
}

// Attach event listeners
addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("focus", changePlaceholderText);
taskInput.value = "";
taskInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
