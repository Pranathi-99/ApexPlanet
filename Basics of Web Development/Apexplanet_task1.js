function greetUser() {
  const name = document.getElementById('username').value.trim();
  if (name) {
    alert(`Hello, ${name}! Welcome to Web Development Basics!`);
  } else {
    alert("Please enter your name first ");
  }
}
