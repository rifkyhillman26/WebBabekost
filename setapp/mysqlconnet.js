const mysql = require('mysql')

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'babekost'
});

con.connect((err) => {
    if (err) throw err
})

module.exports = con