<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chaos Dice</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
        .button { background-color: red; color: white; padding: 10px; border: none; cursor: pointer; }
        .button:disabled { background-color: grey; }
    </style>
</head>
<body>
    <h1>Chaos Dice</h1>
    <input type="number" id="bet" placeholder="Enter your bet">
    <button id="rollButton" class="button">Roll the Dice</button>
    <p id="result"></p>
    
    <script>
        const outcomes = [
            { text: "Lose 10% of your bet", effect: (bet) => bet * -0.1 },
            { text: "Win 5x your bet", effect: (bet) => bet * 5 },
            { text: "Swap bets with another player", effect: () => "swap" },
            { text: "Force everyone to roll again", effect: () => "reroll" }
        ];

        document.getElementById("rollButton").addEventListener("click", function() {
            const bet = Number(document.getElementById("bet").value);
            if (isNaN(bet) || bet <= 0) {
                alert("Please enter a valid bet.");
                return;
            }
            
            const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
            document.getElementById("result").innerText = "Outcome: " + outcome.text;
        });
    </script>
</body>
</html>
