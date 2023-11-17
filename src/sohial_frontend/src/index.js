import { sohial_backend } from "../../declarations/sohial_backend";

const textarea = document.querySelector(".textarea");
const appointForm = document.querySelector(".inputcol");

appointForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const obj = {
    textarea: textarea.value,
  };

  try {
    const getId = await sohial_backend.addTodo(obj.textarea);
    showUserOnScreen({ id: getId, textarea: obj.textarea });
    textarea.value = ""; 
  } catch (error) {
    console.error("Error adding todo:", error);
  }
});

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const getAll = await sohial_backend.getAllTodo();
    getAll.forEach((todo) => showUserOnScreen(todo));
  } catch (error) {
    console.error("Error fetching todo list:", error);
  }
});

function showUserOnScreen(user) {
  const parentNode = document.getElementById("todolist");

  const newListItem = document.createElement("li");
  newListItem.className = "item";
  newListItem.id = Number(user.id);
  newListItem.textContent = user.textarea;

  const deleteButton = document.createElement("button");
  deleteButton.className = "trash-button";
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.onclick = () => deleteTodo(user.id);

  newListItem.appendChild(deleteButton);
  parentNode.appendChild(newListItem);
}

async function deleteTodo(userId) {
  try {
    console.log("userId in del =>", userId);
    await sohial_backend.deleteTodo(userId);
    removeUserFromScreen(userId);
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
}

function removeUserFromScreen(userId) {
  const childNodeToBeDeleted = document.getElementById(userId);
  if (childNodeToBeDeleted) {
    childNodeToBeDeleted.parentNode.removeChild(childNodeToBeDeleted);
  }
}
