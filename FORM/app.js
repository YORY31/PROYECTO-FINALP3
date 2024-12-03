const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

const defaultUsers = [
  { username: "admin", password: "12345" },
  { username: "user1", password: "password" },
];


if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(defaultUsers));
}

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

document.querySelector(".sign-in-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = e.target.querySelector("input[type='text']").value;
  const password = e.target.querySelector("input[type='password']").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const validUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (validUser) {
    alert("Welcome back, " + username + "!");
    window.location.href = "/index.html"; // Ruta de tu página de inicio
  } else {
    alert("Invalid username or password!");
  }
});


document.querySelector(".sign-up-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = e.target.querySelector("input[type='text']").value;
  const email = e.target.querySelector("input[type='email']").value;
  const password = e.target.querySelector("input[type='password']").value;

  if (username && email && password) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.username === username);

    if (userExists) {
      alert("Username already exists. Please choose another one.");
    } else {
      users.push({ username, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Sign up successful! Welcome " + username + "!");
      window.location.href = "/index.html"; 
    }
  } else {
    alert("Please fill in all fields!");
  }
});
