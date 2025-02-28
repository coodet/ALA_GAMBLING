document.addEventListener("DOMContentLoaded", function () {
    const buyButton = document.getElementById("buyButton");
    const rollButton = document.getElementById("rollButton");
    const purchaseSection = document.getElementById("purchaseSection");
    const diceSection = document.getElementById("diceSection");
    const resultDisplay = document.getElementById("result");

    // Add event listeners if elements exist
    if (buyButton) buyButton.addEventListener("click", handlePurchase);
    if (rollButton) rollButton.addEventListener("click", rollDice);

    function handlePurchase() {
        if (!purchaseSection || !diceSection) return;

        purchaseSection.style.display = "none";
        diceSection.style.display = "block";

        showAlert("You've purchased your Chaos Dice Pack! Ready to roll!", "success");
    }

    function rollDice() {
        if (!resultDisplay) return;

        const randomNumber = Math.floor(Math.random() * 6) + 1;
        resultDisplay.textContent = `🎲 You rolled a ${randomNumber}`;

        // Reset animation
        resultDisplay.style.animation = "none";
        void resultDisplay.offsetWidth; // Trigger reflow to restart animation
        resultDisplay.style.animation = "fadeIn 0.5s ease-in-out"; 

        setTimeout(() => {
            resultDisplay.style.animation = "none";
        }, 500);
    }

    function showAlert(message, type = "info") {
        const alertBox = document.createElement("div");
        alertBox.className = `alert alert-${type}`;
        alertBox.textContent = message;

        alertBox.style.position = "fixed";
        alertBox.style.top = "10px";
        alertBox.style.left = "50%";
        alertBox.style.transform = "translateX(-50%)";
        alertBox.style.padding = "10px 20px";
        alertBox.style.backgroundColor = type === "success" ? "#4CAF50" : "#2196F3";
        alertBox.style.color = "#fff";
        alertBox.style.borderRadius = "5px";
        alertBox.style.opacity = "1";
        alertBox.style.transition = "opacity 0.5s ease-out";
        document.body.appendChild(alertBox);

        setTimeout(() => {
            alertBox.style.opacity = "0";
            setTimeout(() => alertBox.remove(), 500);
        }, 2000);
    }
});
