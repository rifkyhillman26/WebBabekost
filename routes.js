const router = require('express').Router()
const connection = require('./setapp/mysqlconnet')

router.get('/', (req, res) => {
    res.render('pages/home.ejs')
})


router.get('/signin' , (req,res) => {
    if(res.locals.kunci) {
        res.redirect('/')
    } else {
        res.render('pages/signin.ejs', {err : false})
    }
})

router.post('/proses-signin' , (req,res) => {
    console.log(req.body)
    connection.query('SELECT * FROM users WHERE username= ? AND password= ?',
        [ req.body.username, req.body.password ] ,
        function (error, rows, field) {
            if(error) {
                res.render('pages/signin.ejs', {err: 'lognin gagal'})
            } else{
                if(rows.length > 0) {
                    req.session.kunci = {
                        id: rows[0].id,
                        username: rows[0].username,
                        name: rows[0].name
                    }
                    res.redirect('/')
                } else{
                    res.render('pages/signin.ejs', {err: 'password atau username salah'})
                }
            }
        });
})

router.get('/register' , (req,res) => {
    if(res.locals.kunci) {
        res.redirect('/')
    } else {
        res.render('pages/register.ejs', {err: false})
    }
})

router.post('/proses-register' , (req,res) => {
    if(req.body.password === req.body.Repeatpsw) {
        connection.query('INSERT INTO users (name, username, password) values (?,?,?)',
        [ req.body.name, req.body.username, req.body.password ] ,
        function (error, rows, field) {
            if(error) {
                console.log(error)
            } else{
                res.redirect('/signin')
            }
        });
    } else {
        res.render('pages/register.ejs', { err: 'Password Tidak Sama'})
    }
    
})

router.get('/logout' , (req,res) => {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
          if(err) {
            return next(err);
          } else {
            return res.redirect('/');
          }
        });
      }
})

router.get('/profile', (req, res) => {
    if(res.locals.kunci) {
        res.render('pages/profile.ejs', {err: false})
    } else {
        res.redirect('/')
    }
})

router.get('/editprofile', (req, res) => {
    if(res.locals.kunci) {
        res.render('pages/editprofile.ejs', {err: false})
    } else {
        res.redirect('/')
    }
})

router.get('/Histori', (req, res) => {
    if(res.locals.kunci) {
        res.render('pages/Histori.ejs', {err: false})
    } else {
        res.redirect('/')
    }
})

router.get('/Chat', (req, res) => {
    if(res.locals.kunci) {
        res.render('pages/Chat.ejs', {err: false})
    } else {
        res.redirect('/')
    }
})


router.get('/Promosi', (req, res) => {
    res.render('pages/promosi.ejs')
})


module.exports = router