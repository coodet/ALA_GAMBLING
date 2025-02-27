document.addEventListener("DOMContentLoaded", function () {
    let walletAmount = localStorage.getItem("wallet") ? parseInt(localStorage.getItem("wallet")) : 100;
    const walletDisplay = document.getElementById("walletAmount");
    walletDisplay.textContent = walletAmount;

    
    const purchasedDice = JSON.parse(localStorage.getItem("purchasedDice")) || [];
    const storageList = document.getElementById("storageList");

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
});
