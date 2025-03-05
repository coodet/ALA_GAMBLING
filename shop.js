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

    
    document.querySelectorAll('.product').forEach(product => {
        product.style.display = 'none';
    });

    
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
    }// Shop page functionality
document.addEventListener("DOMContentLoaded", function() {
  // Initialize wallet
  wallet.initialize();

  // Handle pack purchase
  document.querySelectorAll(".buyButton").forEach(button => {
    button.addEventListener("click", function() {
      const price = parseInt(this.getAttribute("data-price"), 10);
      const packName = this.getAttribute("data-pack");

      if (wallet.get() >= price) {
        wallet.update(-price);
        showAlert(`You purchased ${packName}!`, "success");

        // Store purchased items in localStorage with more details
        let purchasedPacks = JSON.parse(localStorage.getItem("purchasedPacks")) || [];
        purchasedPacks.push({
          name: packName,
          type: packName, // Using pack name as type
          price: price,
          purchaseDate: new Date().toISOString()
        });
        localStorage.setItem("purchasedPacks", JSON.stringify(purchasedPacks));

        // Enable "open" button and disable "buy" button
        const openButton = this.nextElementSibling;
        if (openButton) {
          openButton.classList.remove("hidden");
          openButton.setAttribute("data-price", price);
        }
        this.disabled = true;
      } else {
        showAlert("Not enough money!", "error");
      }
    });
  });

  // Handle pack opening
  document.querySelectorAll(".openButton").forEach(button => {
    button.addEventListener("click", function() {
      const price = parseInt(this.getAttribute("data-price"), 10);
      const packName = this.getAttribute("data-pack");

      const roll = Math.floor(Math.random() * 6) + 1;
      if (roll < 4) {
        // Lost - no money back
        showAlert(`You opened ${packName}, rolled a ${roll}, and lost your money!`, "info");
      } else {
        // Won - double money back
        wallet.update(price * 2);
        showAlert(`You opened ${packName}, rolled a ${roll}, and won double your money!`, "success");
      }

      // Update the purchased dice list to remove the opened pack
      let purchasedPacks = JSON.parse(localStorage.getItem("purchasedPacks")) || [];
      const packIndex = purchasedPacks.findIndex(item => item.name === packName);
      if (packIndex !== -1) {
        purchasedPacks.splice(packIndex, 1);
        localStorage.setItem("purchasedPacks", JSON.stringify(purchasedPacks));
      }

      this.disabled = true;
    });
  });

  // Load purchased items and enable "open" buttons if necessary
  function loadPurchasedItems() {
    const purchasedPacks = JSON.parse(localStorage.getItem("purchasedPacks")) || [];
    document.querySelectorAll(".buyButton").forEach(button => {
      const packName = button.getAttribute("data-pack");
      
      // Check if this pack is in the purchased list
      const purchasedPack = purchasedPacks.find(item => item.name === packName);
      
      if (purchasedPack) {
        button.disabled = true;
        const openButton = button.nextElementSibling;
        if (openButton) {
          openButton.classList.remove("hidden");
          openButton.setAttribute("data-price", purchasedPack.price);
          openButton.setAttribute("data-pack", packName);
        }
      }
    });
  }

  // Initialize the UI state
  loadPurchasedItems();
});


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
