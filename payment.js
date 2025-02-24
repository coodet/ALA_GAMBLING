// Set up Stripe.js and Elements to handle the payment
const stripe = Stripe('your-publishable-key');  // Replace with your actual Stripe public key
const elements = stripe.elements();
const card = elements.create('card');
card.mount('#card-element');  // Make sure the container with id 'card-element' exists in your HTML

const form = document.getElementById('payment-form');
const submitButton = document.getElementById('submit');

form.addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevent the default form submission

    // Show loading state (e.g., disable submit button)
    submitButton.disabled = true;
    submitButton.textContent = 'Processing...';

    // Create a token using Stripe.js
    const {token, error} = await stripe.createToken(card);

    if (error) {
        // Display error message
        alert(error.message);
        submitButton.disabled = false;
        submitButton.textContent = 'Pay Now';
    } else {
        // Send token to backend for payment processing
        fetch('/charge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: token.id})
        })
        .then(response => response.json())
        .then(data => {
            // Handle payment response
            if (data.success) {
                alert('Payment successful!');
                window.location.href = "/success";  // Redirect to success page or take appropriate action
            } else {
                alert('Payment failed: ' + data.error || 'Unknown error');
            }
            submitButton.disabled = false;
            submitButton.textContent = 'Pay Now';
        })
        .catch(error => {
            // Handle unexpected errors
            alert('Payment failed: ' + error.message);
            submitButton.disabled = false;
            submitButton.textContent = 'Pay Now';
        });
    }
});
