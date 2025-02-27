document.addEventListener("DOMContentLoaded", function () {
    const ageForm = document.getElementById("ageForm");

    ageForm.addEventListener("submit", function (event) {
        event.preventDefault(); 

        const age = parseInt(document.getElementById("age").value);

        if (age >= 21) {
            localStorage.setItem("verified", "true"); 
            window.location.href = "index.html"; 
        } else {
            alert("You must be at least 21 years old to enter.");
            window.location.href = "https://www.responsibility.org"; 
        }
    });
});
