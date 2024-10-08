const fortune = require('./fortune')

exports.home = (req, res) => res.render('home')
exports.about = (req, res) => res.render('about', {
    fortune: fortune.getFortune()
})
exports.notfound = (req, res) => res.render('404')
exports.serverError = (req, res) => res.render('500')