document.addEventListener("DOMContentLoaded", function () {
    const ageForm = document.getElementById("ageForm");

    ageForm.addEventListener("submit", function (event) {
        event.preventDefault(); 

        const ageInput = document.getElementById("age").value.trim();
        const age = parseInt(ageInput);

        // Validate that the input is a valid number and is positive
        if (isNaN(age) || age <= 0) {
            alert("Please enter a valid age.");
            return; 
        }

        // Check if the age is greater than or equal to 21
        if (age >= 21) {
            localStorage.setItem("verified", "true"); 
            window.location.href = "index.html"; 
        } else {
            alert("You must be at least 21 years old to enter.");
            setTimeout(function () {
                window.location.href = "https://www.fortismedia.com/en/articles/online-gambling-laws/"; 
            }, 2000); 
        }
    });
});
