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

            // Store purchased items in localStorage with more details
            let purchasedDice = JSON.parse(localStorage.getItem("purchasedDice")) || [];
            purchasedDice.push({
                name: packName,
                price: price,
                purchaseDate: new Date().toISOString()
            });
            localStorage.setItem("purchasedDice", JSON.stringify(purchasedDice));

            // Enable "open" button and disable "buy" button
            const openButton = button.nextElementSibling;
            if (openButton) {
                openButton.classList.remove("hidden");
                // Pass the price to the open button
                openButton.setAttribute("data-price", price);
            }
            button.disabled = true;
        } else {
            alert("Not enough money!");
        }
    }

    // Handle pack opening
    function openPack(button) {
        // Get the price from the buy button (previous sibling) or from data attribute
        const price = parseInt(button.getAttribute("data-price") || 
                              button.previousElementSibling.getAttribute("data-price"), 10);
        const packName = button.getAttribute("data-pack") || 
                         button.previousElementSibling.getAttribute("data-pack");

        if (!price || !packName) {
            console.error("Could not find price or pack name for opening");
            return;
        }

        const roll = Math.floor(Math.random() * 6) + 1;
        if (roll < 4) {
            // Lost - no money back
            alert(`You opened ${packName}, rolled a ${roll}, and lost your money!`);
        } else {
            // Won - double money back
            updateWallet(price * 2);
            alert(`You opened ${packName}, rolled a ${roll}, and won double your money!`);
        }

        // Update the purchased dice list to remove the opened pack
        let purchasedDice = JSON.parse(localStorage.getItem("purchasedDice")) || [];
        const packIndex = purchasedDice.findIndex(item => item.name === packName);
        if (packIndex !== -1) {
            purchasedDice.splice(packIndex, 1);
            localStorage.setItem("purchasedDice", JSON.stringify(purchasedDice));
        }

        button.disabled = true;
    }

    // Load purchased items and enable "open" buttons if necessary
    function loadPurchasedItems() {
        const purchasedDice = JSON.parse(localStorage.getItem("purchasedDice")) || [];
        document.querySelectorAll(".buyButton").forEach(button => {
            const packName = button.getAttribute("data-pack");
            
            // Check if this pack is in the purchased list
            const purchasedPack = purchasedDice.find(item => item.name === packName);
            
            if (purchasedPack) {
                button.disabled = true;
                const openButton = button.nextElementSibling;
                if (openButton) {
                    openButton.classList.remove("hidden");
                    // Pass the price to the open button
                    openButton.setAttribute("data-price", purchasedPack.price);
                    openButton.setAttribute("data-pack", packName);
                }
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
