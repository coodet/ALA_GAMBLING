document.addEventListener("DOMContentLoaded", function () {
    let walletAmount = localStorage.getItem("wallet") ? parseInt(localStorage.getItem("wallet")) : 100;
    const walletDisplay = document.getElementById("walletAmount");
    walletDisplay.textContent = walletAmount;

    function updateWallet(amount) {
        walletAmount += amount;
        localStorage.setItem("wallet", walletAmount);
        walletDisplay.textContent = walletAmount;
    }

    const buyButtons = document.querySelectorAll(".buyButton");
    buyButtons.forEach(button => {
        button.addEventListener("click", function () {
            const price = parseInt(this.getAttribute("data-price"));
            const packName = this.getAttribute("data-pack");

            if (walletAmount >= price) {
                updateWallet(-price);
                alert(`You purchased ${packName}!`);

                // Show the "Open Pack" button after purchase
                const openButton = this.nextElementSibling;
                openButton.classList.remove("hidden");
                this.disabled = true; // Disable the "Buy" button after purchase
            } else {
                alert("Not enough money!");
            }
        });
    });
});
