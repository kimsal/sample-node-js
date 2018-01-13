var env = require('dotenv').config()
var express = require('express');
var app = express()
// Connect database
var mysql = require('mysql');
var con = mysql.createConnection({
  host: env.parsed.HOST,
  user: env.parsed.DATABASE_USER  ,
  password: env.parsed.DATABASE_PASSWORD,
  database: env.parsed.DATABASE_NAME
});

// Global variable
global.categories = null
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = 'select * from categories ';
  con.query(sql, function (err, result) {
    if (err) throw err;
    categories= result;
  });
});



app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// Routes
app.get('/', function (req, res) {
  res.render('index');
})

app.get('/category/:slug', function (req, res) {
  var slug = req.params.slug;
  var category =[];
  con.query("select * from categories where slug='"+slug+"'", function (err, result) {
    if (err) throw err;
    category = result;
     res.render('category', {category :category});
  });
 
})
app.post('/contact/add', function (req, res) {
  backURL=req.header('Referer') || '/';
  console.log('first_name',req.params.first_name);
  res.redirect(backURL);
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})