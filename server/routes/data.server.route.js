const router = require("express").Router();

const dataController = require("../controllers/data.server.controller");

router.post("/data/read", dataController.read);

module.exports = router;
