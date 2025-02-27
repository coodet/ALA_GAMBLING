document.addEventListener("DOMContentLoaded", function () {
    const buyButton = document.getElementById('buyButton');
    const rollButton = document.getElementById('rollButton');

    if (buyButton) {
        buyButton.addEventListener('click', handlePurchase);
    }

    if (rollButton) {
        rollButton.addEventListener('click', rollDice);
    }

    function handlePurchase() {
        const purchaseSection = document.getElementById('purchaseSection');
        const diceSection = document.getElementById('diceSection');

        if (purchaseSection) purchaseSection.style.display = 'none';
        if (diceSection) diceSection.style.display = 'block';

        alert("You've purchased your Chaos Dice Pack! Ready to roll!");
    }

    function rollDice() {
        const randomNumber = Math.floor(Math.random() * 6) + 1; 
        const resultDisplay = document.getElementById('result');
        
        if (resultDisplay) {
            resultDisplay.textContent = `You rolled a ${randomNumber}`;
        }
    }
});
