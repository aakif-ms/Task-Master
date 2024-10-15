function navbarExpand() {
  document.querySelector(".sidebar").classList.toggle("left-[-300px]");
}

async function toggleTodo(id) {
  const response = await fetch(`/todo/${id}/toggle`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const updatedTodo = await response.json();
  console.log(updatedTodo);
  const todoElement = document.getElementById(`todo-${id}`);
  const pendingContainer = document.getElementById("pending");
  const completedContainer = document.getElementById("completed");

  if (updatedTodo.completed) {
    completedContainer.appendChild(todoElement);
  } else {
    pendingContainer.appendChild(todoElement);
  }
}
