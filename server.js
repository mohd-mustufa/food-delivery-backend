const express = require("express");
const deliveryRoutes = require("./src/routes/deliveryRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/cost-estimate", deliveryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Listening on port " + PORT));

module.exports = app;
