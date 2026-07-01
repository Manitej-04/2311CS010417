const express = require("express");
const router = express.Router();

const schedulerController = require("../controllers/schedulerController");

router.get("/depots", schedulerController.getDepots);
router.get("/vehicles", schedulerController.getVehicles);
router.get("/:depotId", schedulerController.schedule);

module.exports = router;