var express = require('express')
var ejs = require('ejs');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');
mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"nodeproject"
})


var app = express();
 
app.use(express.static('public'));
app.set('view engine','ejs');

app.listen(8080);
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({secret:"secret"}))










app.get('/',function(req,res){
    var con= mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"nodeproject"
    })
    con.query("SELECT * FROM products",(err,result)=>{
        res.render('pages/index',{result:result});

    })
    
});



app.post('/add_to_cart', function(req,res){
    var id= req.body.id;
    var name= req.body.name;
    var price= req.body.price;
    var saleprice= req.body.saleprice;
    var quantity =req.body.quantity;
    var image= req.body.image;
    var product = {id:id,name:name,price:price,saleprice:saleprice,quantity:quantity,image:image};
    


    if(req.session.cart){
        var cart = req.session.cart;

        if (!isProductInCart()){
            cart.push(product);
        }
    }else{

        req.session.cart = [product];
        var cart = req.session.cart;
    }







});