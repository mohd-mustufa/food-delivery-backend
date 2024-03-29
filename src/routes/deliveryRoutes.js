const { Router } = require("express");
const requestValidator = require("../middleware/requestValidator");
const calculateCost = require("../controllers/deliveryController");

const router = Router();

router.get("/", requestValidator, calculateCost);

module.exports = router;
