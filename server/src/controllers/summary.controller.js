const Summary = require("../models/summary.model");

exports.getMonthlySummary = async (req, res) => {
  try {
    const summary = await Summary.getMonthlySummary();
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
