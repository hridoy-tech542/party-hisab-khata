const express = require("express");
const router = express.Router();

const Supplier = require("../models/Supplier");
const Purchase = require("../models/Purchase");
const Payment = require("../models/Payment");

router.get("/", async (req, res) => {

  const suppliers = await Supplier.find();

  let totalDue = 0;

  const supplierData = [];

  for (let s of suppliers) {

    const purchases = await Purchase.aggregate([
      { $match: { supplier: s._id } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    const payments = await Payment.aggregate([
      { $match: { supplier: s._id } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalPurchase = purchases[0]?.total || 0;
    const totalPayment = payments[0]?.total || 0;

    const due =
      (s.openingBalance || 0) +
      totalPurchase -
      totalPayment;

    totalDue += due;

    supplierData.push({
      ...s.toObject(),
      due
    });
  }

  res.render("dashboard", {
    suppliers: supplierData,
    totalDue
  });
});

module.exports = router;

