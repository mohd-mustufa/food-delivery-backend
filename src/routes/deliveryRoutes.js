const { Router } = require("express");
const requestValidator = require("../middleware/requestValidator");
const calculateCost = require("../controllers/deliveryController");

const router = Router();

router.post("/", requestValidator, calculateCost);

module.exports = router;
