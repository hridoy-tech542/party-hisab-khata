const express = require("express");
const router = express.Router();

const Supplier = require("../models/Supplier");
const Payment = require("../models/Payment");

// Payment form
router.get("/add/:supplierId", async (req, res) => {
  const supplier = await Supplier.findById(req.params.supplierId);
  res.render("addPayment", { supplier });
});

// Save payment
router.post("/add", async (req, res) => {
  const { supplierId, amount, note } = req.body;

  await Payment.create({
    supplier: supplierId,
    amount,
    note
  });

  res.redirect(`/ledger/${supplierId}`);
});

module.exports = router;
