// --------- FORM VALIDATION ---------
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  let valid = true;

  // Clear previous errors
  nameError.textContent = '';
  emailError.textContent = '';
  messageError.textContent = '';

  // Validate name
  if (!nameInput.value.trim()) {
    nameError.textContent = 'Name is required.';
    valid = false;
  }

  // Validate email
  if (!emailInput.value.trim()) {
    emailError.textContent = 'Email is required.';
    valid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    emailError.textContent = 'Please enter a valid email address.';
    valid = false;
  }

  // Validate message
  if (!messageInput.value.trim()) {
    messageError.textContent = 'Message is required.';
    valid = false;
  }

  if (valid) {
    alert('Thank you for contacting us, ' + nameInput.value.trim() + '!');
    form.reset();
  }
});

function validateEmail(email) {
  // Simple regex for email validation
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

// --------- TODO LIST FUNCTIONALITY ---------
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');

addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    addTodo();
  }
});

function addTodo() {
  const task = todoInput.value.trim();
  if (task === '') return;

  // Create list item
  const li = document.createElement('li');
  li.textContent = task;

  // Create delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.setAttribute('aria-label', `Delete task: ${task}`);
  deleteBtn.addEventListener('click', () => {
    todoList.removeChild(li);
  });

  li.appendChild(deleteBtn);
  todoList.appendChild(li);

  todoInput.value = '';
  todoInput.focus();
}
