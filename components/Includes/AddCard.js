import { STRIPE } from '../../root.js';


/**
 * Create the Stripe Checkout redirect html code for a given user
 * @param {String} userID
 * @returns {String}
 */
export function stripeCheckoutRedirectHTML() {
  // if (!userID) {
  //   throw new Error('Invalid userID');
  // }

  return `
  <html>
  <head>
  <script src="https://js.stripe.com/v3/"></script>
  </head>
    <body>
    <form action="/charge" method="post" id="payment-form">
    <div class="form-row">
      <label for="card-element">
        Credit or debit card
      </label>
      <div id="card-element">
        <!-- A Stripe Element will be inserted here. -->
      </div>
  
      <!-- Used to display Element errors. -->
      <div id="card-errors" role="alert"></div>
    </div>
  
    <button>Submit Payment</button>
  </form>
  <script>
  <script src="https://js.stripe.com/v3/"></script>
<script>
  var stripe = Stripe('${STRIPE.PUBLIC_KEY}');
  var elements = stripe.elements();

  // Create an instance of the card Element.
  var card = elements.create('card');


  card.mount('#card-element');

  // Handle real-time validation errors from the card Element.
  card.addEventListener('change', function(event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = '';
    }
  });

  // Handle form submission.
  var form = document.getElementById('payment-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    stripe.createToken(card).then(function(result) {
      if (result.error) {
        // Inform the user if there was an error.
        var errorElement = document.getElementById('card-errors');
    //    window.ReactNativeWebView.postMessage(result.error.message)
        errorElement.textContent = result.error.message;
      } else {
        // Send the token to your server.
   //     window.ReactNativeWebView.postMessage(JSON.stringify(result.token))
        stripeTokenHandler(result.token.id);
      }
    });
  });

  // Submit the form with the token ID.
  function stripeTokenHandler(token) {
    // Insert the token ID into the form so it gets submitted to the server
    var form = document.getElementById('payment-form');
    var hiddenInput = document.createElement('input');
    window.ReactNativeWebView.postMessage(token)
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', '_stripe_token');  // <-- important
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);
    // Submit the form
 //   form.submit();
  }    
</script>
  </script>
    </body>
  </html>
  `;
}