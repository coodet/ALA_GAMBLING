document.addEventListener("DOMContentLoaded", () => {
    const signupBtn = document.getElementById("signup-btn");
    const loginBtn = document.getElementById("login-btn");
    const authMessage = document.getElementById("auth-message");

    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn === "true") {
        window.location.href = "index.html"; // Redirect to homepage if already logged in
    }

    // Sign Up Functionality
    signupBtn.addEventListener("click", () => {
        const username = document.getElementById("signup-username").value;
        const password = document.getElementById("signup-password").value;

        if (username && password) {
            // Store user data (note: storing passwords in localStorage is not secure, consider using a real database for production)
            localStorage.setItem("user", JSON.stringify({ username, password }));
            authMessage.textContent = "Sign-up successful! You can now log in.";
            authMessage.style.color = "green";
        } else {
            authMessage.textContent = "Please enter a username and password.";
            authMessage.style.color = "red";
        }
    });

    // Login Functionality
    loginBtn.addEventListener("click", () => {
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedUser && storedUser.username === username && storedUser.password === password) {
            localStorage.setItem("loggedIn", "true");
            window.location.href = "index.html"; // Redirect to homepage
        } else {
            authMessage.textContent = "Invalid username or password.";
            authMessage.style.color = "red";
        }
    });
});
