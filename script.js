document.addEventListener("DOMContentLoaded", function () {
    const buyButton = document.getElementById("buyButton");
    const rollButton = document.getElementById("rollButton");
    const purchaseSection = document.getElementById("purchaseSection");
    const diceSection = document.getElementById("diceSection");
    const resultDisplay = document.getElementById("result");

    // Attach event listeners only if elements exist
    buyButton?.addEventListener("click", handlePurchase);
    rollButton?.addEventListener("click", rollDice);

    /** Handles purchasing the Chaos Dice Pack */
    function handlePurchase() {
        if (!purchaseSection || !diceSection) return;

        purchaseSection.style.display = "none";
        diceSection.style.display = "block";

        showAlert("You've purchased your Chaos Dice Pack! Ready to roll!", "success");
    }

    /** Rolls a dice and displays the result */
    function rollDice() {
        if (!resultDisplay) return;

        const randomNumber = Math.floor(Math.random() * 6) + 1;
        resultDisplay.textContent = `🎲 You rolled a ${randomNumber}`;
        resultDisplay.style.animation = "fadeIn 0.5s ease-in-out"; // Adds smooth animation

        // Reset animation to allow repeated rolls
        setTimeout(() => {
            resultDisplay.style.animation = "";
        }, 500);
    }

    /** Displays an alert with a given message and type */
    function showAlert(message, type = "info") {
        const alertBox = document.createElement("div");
        alertBox.className = `alert alert-${type}`;
        alertBox.textContent = message;

        document.body.appendChild(alertBox);

        setTimeout(() => {
            alertBox.style.opacity = "0";
            setTimeout(() => alertBox.remove(), 500);
        }, 2000);
    }
});
