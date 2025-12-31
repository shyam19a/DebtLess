const router = require("express").Router();
const { getMonthlySummary } = require("../controllers/summary.controller");

router.get("/summary", getMonthlySummary);

module.exports = router;
