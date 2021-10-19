class HomeController {
    index(req, res) {
        return res.status(200).json({ message: "It's working" })
    }
}

module.exports = new HomeController()