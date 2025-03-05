


function showAlert(message, type = "info") {
 
  const alertBox = document.createElement("div");
  alertBox.className = `alert alert-${type}`;
  alertBox.textContent = message;

  
  alertBox.style.position = "fixed";
  alertBox.style.top = "10px";
  alertBox.style.left = "50%";
  alertBox.style.transform = "translateX(-50%)";
  alertBox.style.padding = "10px 20px";
  alertBox.style.backgroundColor = 
    type === "success" ? "#4CAF50" : 
    type === "error" ? "#f44336" : "#2196F3";
  alertBox.style.color = "#fff";
  alertBox.style.borderRadius = "5px";
  alertBox.style.opacity = "1";
  alertBox.style.transition = "opacity 0.5s ease-out";
  alertBox.style.zIndex = "1000";
  alertBox.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.6)";
  
  
  document.body.appendChild(alertBox);

  
  setTimeout(() => {
    alertBox.style.opacity = "0";
    setTimeout(() => alertBox.remove(), 500);
  }, 2000);
}


document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        const ageInput = document.getElementById("age").value.trim();
        const age = parseInt(ageInput);

       
        if (!username) {
            if (typeof showAlert === 'function') {
                showAlert("Please enter a valid username.", "error");
            } else {
                alert("Please enter a valid username.");
            }
            return;
        }

        
        if (isNaN(age) || age <= 0) {
            if (typeof showAlert === 'function') {
                showAlert("Please enter a valid age.", "error");
            } else {
                alert("Please enter a valid age.");
            }
            return;
        }

        
        if (age >= 21) {
            
            localStorage.setItem("verified", "true");
            localStorage.setItem("username", username);
            
            
            if (!localStorage.getItem("wallet")) {
                localStorage.setItem("wallet", "100");
            }
            
            
            if (typeof showAlert === 'function') {
                showAlert("Welcome to Chaos Dice!", "success");
            }
            
            
            setTimeout(function() {
                window.location.href = "index.html";
            }, 1500);
        } else {
            if (typeof showAlert === 'function') {
                showAlert("You must be at least 21 years old to enter.", "error");
            } else {
                alert("You must be at least 21 years old to enter.");
            }
            
            
            setTimeout(function() {
                window.location.href = "https://www.fortismedia.com/en/articles/online-gambling-laws/";
            }, 2000);
        }
    });
});
