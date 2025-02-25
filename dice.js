document.addEventListener("DOMContentLoaded", function () {
    let walletAmount = localStorage.getItem("wallet") ? parseInt(localStorage.getItem("wallet")) : 100;
    const walletDisplay = document.getElementById("walletAmount");
    walletDisplay.textContent = walletAmount;

    function updateWallet(amount) {
        walletAmount += amount;
        localStorage.setItem("wallet", walletAmount);
        walletDisplay.textContent = walletAmount;
    }

    // Handle buying dice packs
    const buyButtons = document.querySelectorAll(".buyButton");
    buyButtons.forEach(button => {
        button.addEventListener("click", function () {
            const price = parseInt(this.getAttribute("data-price"));
            const packName = this.getAttribute("data-pack");

            if (walletAmount >= price) {
                updateWallet(-price);
                alert(`You purchased ${packName}!`);

                // Store the purchased pack in localStorage
                let purchasedDice = JSON.parse(localStorage.getItem("purchasedDice")) || [];
                purchasedDice.push(packName);
                localStorage.setItem("purchasedDice", JSON.stringify(purchasedDice));

                // Show the "Open Pack" button after purchase
                const openButton = this.nextElementSibling;
                openButton.classList.remove("hidden");
                this.disabled = true; // Disable the "Buy" button after purchase
            } else {
                alert("Not enough money!");
            }
        });
    });

    // Handle opening dice packs
    const openButtons = document.querySelectorAll(".openButton");
    openButtons.forEach(button => {
        button.addEventListener("click", function () {
            const price = parseInt(this.getAttribute("data-price"));
            const packName = this.getAttribute("data-pack");

            // Simulate a dice roll (1 to 6)
            const roll = Math.floor(Math.random() * 6) + 1;

            if (roll < 4) {
                updateWallet(-price); // Lose the money
                alert(`You opened ${packName}, rolled a ${roll}, and lost your money!`);
            } else {
                updateWallet(price); // Double the money spent
                alert(`You opened ${packName}, rolled a ${roll}, and won double your money!`);
            }

            // Disable the "Open Pack" button after opening
            this.disabled = true;
        });
    });
});
