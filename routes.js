let router = require("express").Router();
let supplier = require("./suppliers.json");

router.get("/suppliers", async (req, res) => {
  let startTimePeriod = req.query.startTimePeriod;
  let endTimePeriod = req.query.endTimePeriod;
  let turnover = req.query.turnover;
  let suppliers = [];
  for await (let data of supplier) {
    if (
      data.turnover.value < turnover &&
      data.turnover.startTimePeriod == startTimePeriod &&
      data.turnover.endTimePeriod == endTimePeriod
    ) {
      suppliers.push(data);
    }
  }
  res.json(suppliers);
});

router.post("/orders", async (req, res) => {
  let id = req.body.supplierId;
  let order = req.body.order;
  for await (let data of supplier) {
    if (data.id == id) {
      data.orders.push(order);
    }
  }
  res.json("order created");
});

router.get("/suppliers/:id", (req, res) => {
  let id = req.params.id;
  let data = supplier.find((x) => x.id === `${id}`);
  res.json(data);
});

router.delete("/suppliers/:id", (req, res) => {
  let id = req.params.id;
  supplier.forEach((data, i) => {
    if (data.id == id) {
      supplier.splice(i, 1);
    }
  });
  res.json("Supplier deleted");
});

router.put("/suppliers/:id", async (req, res) => {
  let id = req.params.id;
  let phone = req.body.phone;
  for await (let data of supplier) {
    if (data.id == id) {
      data.phone = phone;
    }
  }
  res.json("phone number updated");
});

module.exports = router;
