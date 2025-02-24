document.addEventListener("DOMContentLoaded", () => {
    console.log("ALA Gambling site loaded!");

    // Check if the user is logged in
    let username = localStorage.getItem("username");

    // Redirect to login page if not logged in
    if (!username || username.trim() === "") {
        window.location.href = "auth.html";
        return; // Stop script execution to prevent further actions
    }

    // Display Username in Top Left of the Page
    const usernameDisplay = document.createElement("div");
    usernameDisplay.id = "username-display";
    usernameDisplay.textContent = `👤 ${username}`;
    usernameDisplay.style.position = "absolute";
    usernameDisplay.style.top = "10px";
    usernameDisplay.style.left = "10px";
    usernameDisplay.style.fontSize = "18px";
    usernameDisplay.style.fontWeight = "bold";
    document.body.prepend(usernameDisplay); // Add to top of page

    // Dynamic Greeting Based on Time of Day
    const header = document.querySelector("header h1");
    if (header) {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            header.textContent = `Good Morning, ${username}! Welcome to ALA Gambling`;
        } else if (currentHour < 18) {
            header.textContent = `Good Afternoon, ${username}! Welcome to ALA Gambling`;
        } else {
            header.textContent = `Good Evening, ${username}! Welcome to ALA Gambling`;
        }
    }

    // Dice Rolling Animation (Simple simulation)
    function rollDiceAnimation(diceElement) {
        let interval = setInterval(() => {
            diceElement.textContent = Math.floor(Math.random() * 6) + 1; // Random number between 1-6
        }, 100);  // Update every 100ms

        setTimeout(() => {
            clearInterval(interval); // Stop the animation after 1 second
            diceElement.textContent = Math.floor(Math.random() * 6) + 1; // Final roll
        }, 1000); // After 1000ms (1 second)
    }

    // Dice Roll Event Listener (if on games.html)
    const rollButton = document.getElementById('roll-btn');
    if (rollButton) {
        rollButton.addEventListener("click", () => {
            const diceResult = document.getElementById("result-number");
            rollDiceAnimation(diceResult);
        });
    }

    // Buy Dice Button - Redirect to Signup if Not Logged In
    const buyButtons = document.querySelectorAll(".buy-btn");
    buyButtons.forEach(button => {
        button.addEventListener("click", () => {
            alert("Please create an account to buy dice!");
            window.location.href = "signup.html"; // Redirect to signup if not logged in
        });
    });

    // Logout Button
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("username"); // Remove username from localStorage
            window.location.href = "auth.html"; // Redirect to authentication page
        });
    }
});
