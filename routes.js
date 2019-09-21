const router = require('express').Router()
const connection = require('./setapp/mysqlconnet')

router.get('/', (req, res) => {
    res.render('pages/Home.ejs')
})


router.get('/Signin' , (req,res) => {
    if(res.locals.kunci) {
        res.redirect('/')
    } else {
        res.render('pages/Signin.ejs', {err : false})
    }
})

router.post('/proses-Signin' , (req,res) => {
    console.log(req.body)
    connection.query('SELECT * FROM users WHERE username= ? AND password= ?',
        [ req.body.username, req.body.password ] ,
        function (error, rows, field) {
            if(error) {
                res.render('pages/Signin.ejs', {err: 'lognin gagal'})
            } else{
                if(rows.length > 0) {
                    req.session.kunci = {
                        id: rows[0].id,
                        username: rows[0].username,
                        name: rows[0].name
                    }
                    res.redirect('/')
                } else{
                    res.render('pages/Signin.ejs', {err: 'password atau username salah'})
                }
            }
        });
})

router.get('/Register' , (req,res) => {
    if(res.locals.kunci) {
        res.redirect('/')
    } else {
        res.render('pages/Register.ejs', {err: false})
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
                res.redirect('/Signin')
            }
        });
    } else {
        res.render('pages/Register.ejs', { err: 'Password Tidak Sama'})
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

router.get('/Profile', (req, res) => {
    if(res.locals.kunci) {
        res.render('pages/Profile.ejs', {err: false})
    } else {
        res.redirect('/')
    }
})

router.get('/Editprofile', (req, res) => {
    if(res.locals.kunci) {
        res.render('pages/Editprofile.ejs', {err: false})
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
    res.render('pages/Promosi.ejs')
})


router.get('/Bantuan', (req, res) => {
    res.render('pages/Bantuan.ejs')
})


module.exports = router