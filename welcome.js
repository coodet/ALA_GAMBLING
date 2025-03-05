
// welcome.js - Handles welcome page functionality

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        const ageInput = document.getElementById("age").value.trim();
        const age = parseInt(ageInput);

        // Validate username
        if (!username) {
            alert("Please enter a valid username.");
            return;
        }

        // Validate age
        if (isNaN(age) || age <= 0) {
            alert("Please enter a valid age.");
            return;
        }

        // Check age requirement
        if (age >= 21) {
            // Store user data
            localStorage.setItem("verified", "true");
            localStorage.setItem("username", username);
            
            // Initialize wallet if it doesn't exist
            if (!localStorage.getItem("wallet")) {
                localStorage.setItem("wallet", "100");
            }
            
            // Redirect to main page
            window.location.href = "index.html";
        } else {
            alert("You must be at least 21 years old to enter.");
            setTimeout(function() {
                window.location.href = "https://www.fortismedia.com/en/articles/online-gambling-laws/";
            }, 2000);
        }
    });
});
