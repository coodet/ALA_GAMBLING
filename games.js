document.addEventListener("DOMContentLoaded", () => {
    const rollButton = document.getElementById("roll-btn");
    const resultNumber = document.getElementById("result-number");
    const diceImage = document.getElementById("dice-image");
    const diceType = document.getElementById("dice-type");

    // Function to roll the dice based on number of sides
    function rollDice(sides) {
        return Math.floor(Math.random() * sides) + 1;
    }

    // Function to update the dice image based on the roll and dice type
    function updateDiceImage(roll, sides) {
        let imagePath = `images/dice${sides}-${roll}.png`; // Adjusted to handle dice type (6, 12, 20)
        diceImage.src = imagePath;
        diceImage.alt = `Rolled a ${roll} on a ${sides}-sided die`;
    }

    // Button click event to roll the dice and update the result
    rollButton.addEventListener("click", () => {
        const selectedSides = parseInt(diceType.value);
        const roll = rollDice(selectedSides);

        resultNumber.textContent = roll;
        updateDiceImage(roll, selectedSides);
    });
});
