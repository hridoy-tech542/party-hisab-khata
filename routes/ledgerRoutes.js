const express = require("express");
const router = express.Router();

const Supplier = require("../models/Supplier");
const Purchase = require("../models/Purchase");
const Payment = require("../models/Payment");

router.get("/:supplierId", async (req, res) => {
  const supplierId = req.params.supplierId;

  const supplier = await Supplier.findById(supplierId);

  const purchases = await Purchase.find({ supplier: supplierId });
  const payments = await Payment.find({ supplier: supplierId });

  let ledger = [];

  purchases.forEach(p => {
    ledger.push({
      date: p.date,
      type: "purchase",
      memoNo: p.memoNo,
      amount: p.totalAmount
    });
  });

  payments.forEach(p => {
    ledger.push({
      date: p.date,
      type: "payment",
      amount: p.amount,
      note: p.note
    });
  });

  // Date wise sort
  ledger.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Running balance
  let balance = supplier.openingBalance || 0;

  ledger = ledger.map(l => {
    if (l.type === "purchase") balance += l.amount;
    if (l.type === "payment") balance -= l.amount;

    return { ...l, balance };
  });

  res.render("ledger", { supplier, ledger });
});

module.exports = router;

