const express = require('express')
const app = express()
const session = require('express-session')

app.set('view engine', 'ejs')

app.use(session({
    secret: 'rahasia'
}))
app.use(function(req, res, next) {
    res.locals.kunci = req.session.kunci;
    next();
})

app.use(express.urlencoded({ extended: true })) 
app.use(express.json())
app.use(express.static('public'))
app.use('/', require('./routes') )


app.listen(4444, (req, res) => {
  console.log('Server is running with http://localhost:4444')
})


