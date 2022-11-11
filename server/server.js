const express = require('express');
const cors = require('cors');
const mycon = require('mysql');
const bodyparser = require('body-parser');
const fileupload = require('express-fileupload');

const app = express();
app.use(cors());
app.use(fileupload());
app.use(bodyparser.json());
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));

const c = mycon.createConnection({
    host : "localhost",
    user : "root",
    password : "password",
    database : "login"
})

c.connect(function(err){
    if(err){console.log(err);}
    else{console.log('Database Connected');}
})

app.post('/Register',(req,res)=>{
    let name = req.body.name;
    let email =req.body.email;
    let password = req.body.password;

    let sql = 'insert into register(email,name,password)values(?,?,?)';

    c.query(sql,[email,name,password],(error,result)=>{
        if(error){
            let s = {"status":"error"};
            res.send(s);
        }
        else{
            let s = {"status":"Inserted"};
            res.send(s);
        }
    })

})

app.post('/Login',(request,response)=>{
    let username = request.body.username;
    let password = request.body.password;

    let sql = 'select * from register where email=?';

    c.query(sql,[username],(error,result)=>{
        if(error){
            let s = {"status":"query_not_inserted"};
            response.send(s);
        }
        else if(result.length > 0){
            let usernamee = result[0].email;
            let passwordd = result[0].password;
            let name1 = result[0].name;

            if(usernamee === username && passwordd === password){
                let s = {"status":"Success","name":name1};
                response.send(s);
            }
            else{
                let s = {"status":"Invalid_data"};
                response.send(s);
            }
        }
        else{
            let s = {"status":"error"};
            response.send(s);
        }
    })

})

app.listen(3008);