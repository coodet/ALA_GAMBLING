document.addEventListener("DOMContentLoaded", function () {
    
    function loadWallet() {
        return localStorage.getItem("wallet") ? parseInt(localStorage.getItem("wallet"), 10) : 100;
    }

    let walletAmount = loadWallet();
    const walletDisplay = document.getElementById("walletAmount");
    walletDisplay.textContent = walletAmount;

    
    function updateWallet(amount) {
        walletAmount += amount;
        localStorage.setItem("wallet", walletAmount);
        walletDisplay.textContent = walletAmount;
    }

    
    function purchasePack(button) {
        const price = parseInt(button.getAttribute("data-price"), 10);
        const packName = button.getAttribute("data-pack");

        if (walletAmount >= price) {
            updateWallet(-price);
            alert(`You purchased ${packName}!`);

            
            let purchasedDice = JSON.parse(localStorage.getItem("purchasedDice")) || [];
            purchasedDice.push({
                name: packName,
                price: price,
                purchaseDate: new Date().toISOString()
            });
            localStorage.setItem("purchasedDice", JSON.stringify(purchasedDice));

            
            const openButton = button.nextElementSibling;
            if (openButton) {
                openButton.classList.remove("hidden");
                
                openButton.setAttribute("data-price", price);
            }
            button.disabled = true;
        } else {
            alert("Not enough money!");
        }
    }

    
    function openPack(button) {
        
        const price = parseInt(button.getAttribute("data-price") || 
                              button.previousElementSibling.getAttribute("data-price"), 10);
        const packName = button.getAttribute("data-pack") || 
                         button.previousElementSibling.getAttribute("data-pack");

        if (!price || !packName) {
            console.error("Could not find price or pack name for opening");
            return;
        }

        const roll = Math.floor(Math.random() * 6) + 1;
        if (roll < 4) {
            
            alert(`You opened ${packName}, rolled a ${roll}, and lost your money!`);
        } else {
            
            updateWallet(price * 2);
            alert(`You opened ${packName}, rolled a ${roll}, and won double your money!`);
        }

        
        let purchasedDice = JSON.parse(localStorage.getItem("purchasedDice")) || [];
        const packIndex = purchasedDice.findIndex(item => item.name === packName);
        if (packIndex !== -1) {
            purchasedDice.splice(packIndex, 1);
            localStorage.setItem("purchasedDice", JSON.stringify(purchasedDice));
        }

        button.disabled = true;
    }

    
    function loadPurchasedItems() {
        const purchasedDice = JSON.parse(localStorage.getItem("purchasedDice")) || [];
        document.querySelectorAll(".buyButton").forEach(button => {
            const packName = button.getAttribute("data-pack");
            
            
            const purchasedPack = purchasedDice.find(item => item.name === packName);
            
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

    
    document.querySelectorAll(".buyButton").forEach(button => {
        button.addEventListener("click", () => purchasePack(button));
    });

    document.querySelectorAll(".openButton").forEach(button => {
        button.addEventListener("click", () => openPack(button));
    });

    
    loadPurchasedItems();
});


const dice = {
  
  roll: function(sides = 6) {
    return Math.floor(Math.random() * sides) + 1;
  },
  
  
  animateRoll: function(sides = 6, callback) {
    
    let diceElement = document.getElementById('dice');
    if (!diceElement) {
      diceElement = document.createElement('div');
      diceElement.id = 'dice';
      diceElement.className = 'dice';
      document.getElementById('diceSection').appendChild(diceElement);
    }
    
    // Start animation
    diceElement.classList.add('rolling');
    diceElement.textContent = '?';
    
    // Generate result
    const result = this.roll(sides);
    
    // Show result after animation
    setTimeout(() => {
      diceElement.classList.remove('rolling');
      diceElement.textContent = result;
      
      // Call callback with result
      if (typeof callback === 'function') {
        callback(result);
      }
    }, 1500);
    
    return result;
  },
  
  // Process rewards based on dice roll and pack type
  processReward: function(packType, diceResult) {
    let reward = 0;
    
    switch(packType) {
      case "Pack 1":
        // Basic pack: 50% chance to win $5-15
        if (Math.random() > 0.5) {
          reward = Math.floor(Math.random() * 11) + 5;
        }
        break;
      case "Pack 2":
        // Medium pack: 60% chance to win $10-30
        if (Math.random() > 0.4) {
          reward = Math.floor(Math.random() * 21) + 10;
        }
        break;
      case "Pack 3":
        // Premium pack: 75% chance to win $20-50
        if (Math.random() > 0.25) {
          reward = Math.floor(Math.random() * 31) + 20;
        }
        break;
    }
    
    return reward;
  }
};
