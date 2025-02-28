document.addEventListener("DOMContentLoaded", function () {
    
    function loadWallet() {
        return localStorage.getItem("wallet") ? parseInt(localStorage.getItem("wallet"), 10) : 100;
    }

    let walletAmount = loadWallet();
    const walletDisplay = document.getElementById("walletAmount");

    if (walletDisplay) {
        walletDisplay.textContent = walletAmount;
    }

    function updateWallet(amount) {
        walletAmount += amount;
        localStorage.setItem("wallet", walletAmount);
        if (walletDisplay) {
            walletDisplay.textContent = walletAmount;
        }
    }

    function purchasePack(button) {
        const price = parseInt(button.getAttribute("data-price"), 10);
        const packName = button.getAttribute("data-pack");

        if (walletAmount >= price) {
            updateWallet(-price);
            alert(`You purchased ${packName}!`);

            let purchasedDice = JSON.parse(localStorage.getItem("purchasedDice")) || [];
            purchasedDice.push(packName);
            localStorage.setItem("purchasedDice", JSON.stringify(purchasedDice));

            const openButton = button.nextElementSibling;
            if (openButton) openButton.classList.remove("hidden");
            button.disabled = true;
        } else {
            alert("Not enough money!");
        }
    }

    function openPack(button) {
        const price = parseInt(button.getAttribute("data-price"), 10);
        const packName = button.getAttribute("data-pack");

        const roll = Math.floor(Math.random() * 6) + 1;

        if (roll >= 4) {
            updateWallet(price * 2);
            alert(`You opened ${packName}, rolled a ${roll}, and won double your money!`);
        } else {
            alert(`You opened ${packName}, rolled a ${roll}, but lost!`);
        }

        button.disabled = true;
    }

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

    document.querySelectorAll(".buyButton").forEach(button => {
        button.addEventListener("click", function () {
            purchasePack(button);
        });
    });

    document.querySelectorAll(".openButton").forEach(button => {
        button.addEventListener("click", function () {
            openPack(button);
        });
    });

    loadPurchasedItems();
});
