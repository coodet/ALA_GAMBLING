let selectedPack = null;

document.querySelectorAll('.buyButton').forEach(button => {
    button.addEventListener('click', handlePurchase);
});

document.getElementById('rollButton').addEventListener('click', rollDice);

function handlePurchase(event) {
    selectedPack = event.target.getAttribute('data-pack');
    
    // Hide the shop products and show the dice roller
    document.querySelectorAll('.product').forEach(product => {
        product.style.display = 'none';
    });
    document.getElementById('diceSection').style.display = 'block';

    alert(`You've purchased Chaos Dice Pack ${selectedPack}! Ready to roll!`);
}

function rollDice() {
    let sides;
    if (selectedPack === '1') sides = 6;
    else if (selectedPack === '2') sides = 8;
    else if (selectedPack === '3') sides = 12;
    else if (selectedPack === '4') sides = 10;
    else if (selectedPack === '5') sides = 20;
    else if (selectedPack === '6') sides = 20; // For a holographic pack, let's assume a 20-sided die

    const randomNumber = Math.floor(Math.random() * sides) + 1;
    document.getElementById('result').textContent = `You rolled a ${randomNumber} on your Pack ${selectedPack} dice!`;
}
