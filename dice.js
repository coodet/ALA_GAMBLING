document.addEventListener("DOMContentLoaded", function () {
    // Load wallet amount from localStorage or set default to 100
    function loadWallet() {
        return localStorage.getItem("wallet") ? parseInt(localStorage.getItem("wallet"), 10) : 100;
    }

    let walletAmount = loadWallet();
    const walletDisplay = document.getElementById("walletAmount");
    walletDisplay.textContent = walletAmount;

    // Update wallet balance
    function updateWallet(amount) {
        walletAmount += amount;
        localStorage.setItem("wallet", walletAmount);
        walletDisplay.textContent = walletAmount;
    }

    // Handle pack purchase
    function purchasePack(button) {
        const price = parseInt(button.getAttribute("data-price"), 10);
        const packName = button.getAttribute("data-pack");

        if (walletAmount >= price) {
            updateWallet(-price);
            alert(`You purchased ${packName}!`);

            // Store purchased items in localStorage
            let purchasedDice = JSON.parse(localStorage.getItem("purchasedDice")) || [];
            purchasedDice.push(packName);
            localStorage.setItem("purchasedDice", JSON.stringify(purchasedDice));

            // Enable "open" button and disable "buy" button
            const openButton = button.nextElementSibling;
            if (openButton) openButton.classList.remove("hidden");
            button.disabled = true;
        } else {
            alert("Not enough money!");
        }
    }

    // Handle pack opening
    function openPack(button) {
        const price = parseInt(button.getAttribute("data-price"), 10);
        const packName = button.getAttribute("data-pack");

        const roll = Math.floor(Math.random() * 6) + 1;
        if (roll < 4) {
            updateWallet(-price);
            alert(`You opened ${packName}, rolled a ${roll}, and lost your money!`);
        } else {
            updateWallet(price);
            alert(`You opened ${packName}, rolled a ${roll}, and won double your money!`);
        }

        button.disabled = true;
    }

    // Load purchased items and enable "open" buttons if necessary
    function loadPurchasedItems() {
        const purchasedDice = JSON.parse(localStorage.getItem("purchasedDice")) || [];
        document.querySelectorAll(".buyButton").forEach(button => {
            const packName = button.getAttribute("data-pack");
            if (purchasedDice.includes(packName)) {
                button.disabled = true;
                const openButton = button.nextElementSibling;
                if (openButton) openButton.classList.remove("hidden");
            }
        });
    }

    // Attach event listeners to buttons
    document.querySelectorAll(".buyButton").forEach(button => {
        button.addEventListener("click", () => purchasePack(button));
    });

    document.querySelectorAll(".openButton").forEach(button => {
        button.addEventListener("click", () => openPack(button));
    });

    // Initialize the UI state
    loadPurchasedItems();
});
