
document.addEventListener("DOMContentLoaded", function() {

  wallet.initialize();
  
  
  const purchasedPacks = JSON.parse(localStorage.getItem("purchasedPacks")) || [];
  const storageList = document.getElementById("storageList");
  
  
  if (purchasedPacks.length === 0) {
    storageList.innerHTML = '<div class="empty-message">You haven\'t purchased any dice packs yet. Visit the shop to get started!</div>';
  } else {
    purchasedPacks.forEach((pack, index) => {
      const packElement = document.createElement("div");
      packElement.className = "dice-pack";
      
      
      packElement.innerHTML = `
        <h3>${pack.name}</h3>
        <p>Type: ${pack.type}</p>
        <p>Purchased: ${new Date(pack.purchaseDate).toLocaleDateString()}</p>
        <button class="use-button" data-index="${index}">Roll Dice</button>
      `;
      
      storageList.appendChild(packElement);
    });
    
    
    document.querySelectorAll(".use-button").forEach(button => {
      button.addEventListener("click", function() {
        const packIndex = parseInt(this.getAttribute("data-index"));
        const pack = purchasedPacks[packIndex];
        
        
        let reward = 0;


function useDicePack(packId, packType) {
    
    const storage = JSON.parse(localStorage.getItem('diceStorage')) || [];
    const packIndex = storage.findIndex(pack => pack.id === packId);
    
    if (packIndex !== -1) {
        storage.splice(packIndex, 1);
        localStorage.setItem('diceStorage', JSON.stringify(storage));
        
        
        openDicePack(packType, getDiceCountForPackType(packType));
        
        
        setTimeout(() => {
            displayDicePacks();
        }, 4000);
    }
}

function getDiceCountForPackType(packType) {
    if (packType.includes("Basic")) {
        return 3;
    } else if (packType.includes("Premium")) {
        return 5;
    } else if (packType.includes("Ultimate")) {
        return 7;
    }
    return 5; 
}

        let diceResult = Math.floor(Math.random() * 6) + 1;
        
        switch(pack.type) {
          case "Pack 1":
            
            if (Math.random() > 0.5) {
              reward = Math.floor(Math.random() * 11) + 5;
            }
            break;
          case "Pack 2":
            
            if (Math.random() > 0.4) {
              reward = Math.floor(Math.random() * 21) + 10;
            }
            break;
          case "Pack 3":
            
            if (Math.random() > 0.25) {
              reward = Math.floor(Math.random() * 31) + 20;
            }
            break;
        }
        
        
        if (reward > 0) {
          wallet.update(reward);
          showAlert(`You rolled a ${diceResult}! You won $${reward}!`, "success");
        } else {
          showAlert(`You rolled a ${diceResult}. Better luck next time!`, "info");
        }
        
        
        purchasedPacks.splice(packIndex, 1);
        localStorage.setItem("purchasedPacks", JSON.stringify(purchasedPacks));
        
        
        setTimeout(() => location.reload(), 2000);
      });
    });
  }
});
