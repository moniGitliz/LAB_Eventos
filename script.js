document.addEventListener("DOMContentLoaded", () => {
    // ✅ Espera a que el DOM esté completamente cargado
  
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const successMsg = document.getElementById("successMsg");
    const errorMsg = document.getElementById("errorMsg"); //  Obtener errorMsg
    const editModal = new bootstrap.Modal(document.getElementById("editModal"));
    const editInput = document.getElementById("editInput");
    const saveEditBtn = document.getElementById("saveEditBtn");
  
    let currentEditSpan = null;
  
    // Función para mostrar un mensaje (éxito o error)
    function displayMessage(element, message, type = "success", duration = 1500) {
      element.textContent = message;
      element.classList.remove("alert-success", "alert-warning", "d-none"); // Removemos clases previas
      element.classList.add(`alert-${type}`); // Agregamos la clase de tipo
      setTimeout(() => element.classList.add("d-none"), duration);
    }
  
    //  Evento para agregar tarea (al hacer clic en el botón)
    addTaskBtn.addEventListener("click", (event) => {
      event.preventDefault(); // Evita que el formulario se envíe y recargue la página
      const taskText = taskInput.value.trim();
  
      if (taskText === "") {
        displayMessage(
          errorMsg,
          "⚠️ Escribe una tarea antes de agregarla.",
          "warning",
          2000
        ); // Usamos la función
        return;
        // Sale de la función (no se ejecuta el resto del código).
      }
  
      addTask(taskText);
      taskInput.value = "";
      taskInput.focus();
      displayMessage(
        successMsg,
        "✅ Tarea agregada con éxito.",
        "success",
        1500
      ); // Usamos la función
    });
  
    // Función para crear y agregar una tarea a la lista
    function addTask(text) {
      const li = document.createElement("li"); //  Usamos <li> para mejor semántica
      li.className =
        "list-group-item d-flex justify-content-between align-items-center"; // gregamos clases de Bootstrap
  
      // 1. Checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "form-check-input me-3";
      checkbox.style.marginTop = "0.2em";
      checkbox.addEventListener("change", () => {
        span.classList.toggle("completed", checkbox.checked);
      });
  
      // 2. Span (texto de la tarea)
      const span = document.createElement("span");
      span.textContent = text;
      span.style.flexGrow = "1";
  
      // Tachar tarea al hacer clic (fuera de los botones)
      li.addEventListener("click", (event) => {
        if (event.target !== editBtn && event.target !== deleteBtn) {
          // Evitar que se active al hacer clic en los botones
          span.classList.toggle("completed");
        }
      });
  
      // 3. Contenedor para los botones (editar y eliminar)
      const btnContainer = document.createElement("div");
  
      // 4. Botón editar
      const editBtn = document.createElement("button");
      editBtn.innerHTML = "✏️";
      editBtn.className = "icon-btn btn btn-sm btn-outline-secondary"; // Clases de Bootstrap para el botón
      editBtn.addEventListener("click", () => {
        currentEditSpan = span;
        editInput.value = span.textContent;
        editModal.show();
      });
  
      // 5. Botón eliminar
      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "🗑️";
      deleteBtn.className = "icon-btn btn btn-sm btn-outline-danger ms-2"; //Clases de Bootstrap para el botón
      deleteBtn.addEventListener("click", () => {
        li.remove();
      });
  
      // Ensamblaje
      btnContainer.appendChild(editBtn);
      btnContainer.appendChild(deleteBtn);
      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(btnContainer); // Agregamos el contenedor de botones
      taskList.appendChild(li);
    }
  
    // Evento para guardar la edición
    saveEditBtn.addEventListener("click", () => {
      if (currentEditSpan) {
        currentEditSpan.textContent = editInput.value;
        editModal.hide();
        currentEditSpan = null;
      }
    });
  });
  