document.addEventListener("DOMContentLoaded", () => {
    console.log("ALA Gambling site loaded!");

    // Dynamic Greeting Based on Time of Day
    const header = document.querySelector("header h1");
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
        header.textContent = "Good Morning! Welcome to ALA Gambling";
    } else if (currentHour < 18) {
        header.textContent = "Good Afternoon! Welcome to ALA Gambling";
    } else {
        header.textContent = "Good Evening! Welcome to ALA Gambling";
    }

    // Toggle "About Us" Section Visibility
    const aboutSection = document.getElementById("about");
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle About Us";
    toggleButton.style.display = "block";
    toggleButton.style.margin = "10px auto";
    
    toggleButton.addEventListener("click", () => {
        if (aboutSection.style.display === "none") {
            aboutSection.style.display = "block";
            toggleButton.textContent = "Hide About Us";
        } else {
            aboutSection.style.display = "none";
            toggleButton.textContent = "Show About Us";
        }
    });

    document.body.insertBefore(toggleButton, aboutSection);

    // Dice Roll Animation
    function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    function animateRollDice() {
        const diceElement = document.getElementById('dice');
        diceElement.style.fontSize = "3rem"; // Make the dice text bigger during animation
        diceElement.style.transition = "transform 0.2s ease-in-out";
        diceElement.style.transform = "scale(1.3)";

        let interval = setInterval(() => {
            diceElement.textContent = rollDice();
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            diceElement.textContent = rollDice();
            diceElement.style.transform = "scale(1)"; // Reset the scale after roll
        }, 1000);
    }

    document.getElementById('rollButton').addEventListener('click', animateRollDice);

    // Display Last Roll
    const lastRollButton = document.createElement("button");
    lastRollButton.textContent = "View Last Roll";
    lastRollButton.style.display = "block";
    lastRollButton.style.margin = "10px auto";

    let lastRoll = null;

    lastRollButton.addEventListener("click", () => {
        if (lastRoll !== null) {
            alert(`Last Roll: ${lastRoll}`);
        } else {
            alert("You haven't rolled yet!");
        }
    });

    document.body.insertBefore(lastRollButton, aboutSection);

    // Store last roll result after every dice roll
    document.getElementById('rollButton').addEventListener('click', () => {
        lastRoll = rollDice();
    });

    // Real-time User Counter
    const userCountElement = document.getElementById('user-count');
    let userCount = 0;

    setInterval(() => {
        userCount += Math.floor(Math.random() * 5);  // Simulate random increase in users
        userCountElement.textContent = `Users Online: ${userCount}`;
    }, 5000);  // Update every 5 seconds

    // Show a special offer after 10 seconds
    setTimeout(() => {
        const specialOffer = document.createElement("div");
        specialOffer.textContent = "Limited Time Offer: 20% OFF Your First Dice Purchase!";
        specialOffer.style.backgroundColor = "#28a745";
        specialOffer.style.color = "#fff";
        specialOffer.style.padding = "15px";
        specialOffer.style.textAlign = "center";
        specialOffer.style.position = "fixed";
        specialOffer.style.bottom = "0";
        specialOffer.style.left = "0";
        specialOffer.style.width = "100%";
        specialOffer.style.fontSize = "1.2rem";
        specialOffer.style.transition = "opacity 1s ease-in-out";

        document.body.appendChild(specialOffer);

        setTimeout(() => {
            specialOffer.style.opacity = "0";
            setTimeout(() => {
                specialOffer.remove();
            }, 1000);
        }, 5000); // Remove the offer after 5 seconds
    }, 10000); // Display offer after 10 seconds
});
