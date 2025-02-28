let selectedPack = null;

document.querySelectorAll('.buyButton').forEach(button => {
    button.addEventListener('click', handlePurchase);
});

const rollButton = document.getElementById('rollButton');
if (rollButton) {
    rollButton.addEventListener('click', rollDice);
}

function handlePurchase(event) {
    selectedPack = event.target.getAttribute('data-pack').match(/\d+/)[0]; // Extracts the pack number

    // Hide all products
    document.querySelectorAll('.product').forEach(product => {
        product.style.display = 'none';
    });

    // Show dice section
    const diceSection = document.getElementById('diceSection');
    if (diceSection) {
        diceSection.style.display = 'block';
    }

    alert(`You've purchased Chaos Dice Pack ${selectedPack}! Ready to roll!`);
}

function rollDice() {
    if (!selectedPack) {
        alert("Please purchase a pack first!");
        return;
    }

    let sides;
    switch (selectedPack) {
        case '1': sides = 6; break;
        case '2': sides = 8; break;
        case '3': sides = 12; break;
        case '4': sides = 10; break;
        case '5': sides = 20; break;
        case '6': sides = 50; break;
        default: sides = 6;
    }

    const randomNumber = Math.floor(Math.random() * sides) + 1;
    const resultDisplay = document.getElementById('result');

    if (resultDisplay) {
        resultDisplay.textContent = `You rolled a ${randomNumber} on your Pack ${selectedPack} dice!`;
    }
}
