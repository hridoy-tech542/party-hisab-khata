const express = require("express");
const router = express.Router();
const Supplier = require("../models/Supplier");


// 🔹 Show all suppliers
router.get("/", async (req, res) => {
  const suppliers = await Supplier.find();
  res.render("suppliers", { suppliers });
});


// 🔹 Add supplier form (GET)
router.get("/add", (req, res) => {
  res.render("addSupplier");
});


// 🔹 Add supplier (POST)
router.post("/add", async (req, res) => {
  const { name, mobile, address, openingBalance } = req.body;

  await Supplier.create({
    name,
    mobile,
    address,
    openingBalance
  });

  res.redirect("/suppliers");
});


// 🔹 Edit supplier form (GET)
router.get("/edit/:id", async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  res.render("editSupplier", { supplier });
});


// 🔹 Update supplier (POST)
router.post("/edit/:id", async (req, res) => {
  const { name, mobile, address, openingBalance } = req.body;

  await Supplier.findByIdAndUpdate(req.params.id, {
    name,
    mobile,
    address,
    openingBalance
  });

  res.redirect("/suppliers");
});


// 🔹 Delete supplier
router.get("/delete/:id", async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);
  res.redirect("/suppliers");
});


module.exports = router;

