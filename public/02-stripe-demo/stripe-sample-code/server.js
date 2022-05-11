const express = require("express");
const app = express();
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51KlYXsErUrRnOLYSQblplklS0Gf7tVnPi8kbxqSrd9rONXnHb82OoOcQzRq3wlhct6N8oMKOp2Kow219UJfbwotS00IVRTbnUM');

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 11;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));