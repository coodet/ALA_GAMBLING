// Event listener for the "Buy Dice Pack" button
document.getElementById('buyButton').addEventListener('click', handlePurchase);

// Event listener for the "Roll the Dice" button (only available after purchase)
document.getElementById('rollButton').addEventListener('click', rollDice);

function handlePurchase() {
    // Hide the purchase section and show the dice section
    document.getElementById('purchaseSection').style.display = 'none';
    document.getElementById('diceSection').style.display = 'block';

    // Optional: Show a message that the user has purchased the dice
    alert("You've purchased your Chaos Dice Pack! Ready to roll!");
}

function rollDice() {
    const randomNumber = Math.floor(Math.random() * 6) + 1; // Generates a number between 1 and 6
    document.getElementById('result').textContent = `You rolled a ${randomNumber}`;
}
