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

                
                let purchasedDice = JSON.parse(localStorage.getItem("purchasedDice")) || [];
                purchasedDice.push(packName);
                localStorage.setItem("purchasedDice", JSON.stringify(purchasedDice));

                
                const openButton = this.nextElementSibling;
                openButton.classList.remove("hidden");
                this.disabled = true; 
            } else {
                alert("Not enough money!");
            }
        });
    });

    
    const openButtons = document.querySelectorAll(".openButton");
    openButtons.forEach(button => {
        button.addEventListener("click", function () {
            const price = parseInt(this.getAttribute("data-price"));
            const packName = this.getAttribute("data-pack");

            
            const roll = Math.floor(Math.random() * 6) + 1;

            if (roll < 4) {
                updateWallet(-price); 
                alert(`You opened ${packName}, rolled a ${roll}, and lost your money!`);
            } else {
                updateWallet(price); 
                alert(`You opened ${packName}, rolled a ${roll}, and won double your money!`);
            }

            
            this.disabled = true;
        });
    });
});
