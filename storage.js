document.addEventListener("DOMContentLoaded", function () {
    
    let walletAmount = localStorage.getItem("wallet");
    walletAmount = walletAmount ? parseInt(walletAmount, 10) : 100;

    const walletDisplay = document.getElementById("walletAmount");
    if (walletDisplay) {
        walletDisplay.textContent = walletAmount;
    }

    
    const purchasedDice = JSON.parse(localStorage.getItem("purchasedDice")) || [];
    const storageList = document.getElementById("storageList");

    if (storageList) {
        if (purchasedDice.length > 0) {
            purchasedDice.forEach(pack => {
                const packElement = document.createElement("div");
                packElement.classList.add("dice-pack");
                packElement.textContent = pack;
                storageList.appendChild(packElement);
            });
        } else {
            storageList.innerHTML = "<p>You haven't purchased any dice packs yet.</p>";
        }
    }
});
