const router = require("express").Router();
const homeController = require("./app/controllers/HomeController")

router.get("/", homeController.index)

module.exports = router;