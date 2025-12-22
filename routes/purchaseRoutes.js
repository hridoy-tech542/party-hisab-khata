const express = require("express");
const router = express.Router();

const Supplier = require("../models/Supplier");
const Purchase = require("../models/Purchase");


// 🔹 Show add purchase form
router.get("/add", async (req, res) => {
  const suppliers = await Supplier.find();
  res.render("addPurchase", { suppliers });
});


// 🔹 Save purchase (Memo No)
router.post("/add", async (req, res) => {
  const { supplier, memoNo, date, totalAmount, note } = req.body;

  await Purchase.create({
    supplier,
    memoNo,
    date,
    totalAmount,
    note
  });

  res.redirect("/purchases");
});


// 🔹 List all purchases
router.get("/", async (req, res) => {
  const purchases = await Purchase.find().populate("supplier");
  res.render("purchases", { purchases });
});


// 🔹 Edit purchase form
router.get("/edit/:id", async (req, res) => {
  const purchase = await Purchase.findById(req.params.id);
  const suppliers = await Supplier.find();

  res.render("editPurchase", {
    purchase,
    suppliers
  });
});


// 🔹 Update purchase
router.post("/edit/:id", async (req, res) => {
  const { supplier, memoNo, date, totalAmount, note } = req.body;

  await Purchase.findByIdAndUpdate(req.params.id, {
    supplier,
    memoNo,
    date,
    totalAmount,
    note
  });

  res.redirect("/purchases");
});


// 🔹 Delete purchase
router.get("/delete/:id", async (req, res) => {
  await Purchase.findByIdAndDelete(req.params.id);
  res.redirect("/purchases");
});


module.exports = router;


