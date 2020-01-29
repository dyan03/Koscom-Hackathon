const express = require('express')
const mysql = require('mysql')
const path = require('path')
const app = express()
const port = 8551
var router = express.Router();
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const session = require('express-session');
const FileStore = require('session-file-store')(session)

app.use(express.static(path.join(__dirname, '../build')))
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
})

app.use(cookieParser());
app.use(bodyParser.json())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 240 * 60 * 60 // 쿠키 유효기간 24/100 시간
  },
  store : new FileStore()
}));

var con = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '8551',
    database: 'new_schema'
})

// con.connect(function(err){
//     if(err){
//         console.error('error db connection', err.stack);
//         return;
//     }
//     console.log('[DB Connection success] connected as id', con.threadId);
// })

app.get('/', (req, res) => {
    console.log('get/')
    // var sql = 'SELECT * FROM funds'; //펀드리스트
    // con.query(sql, function(err, results, field){
    //     console.log('path : /')
    //     res.json(results)
    // });
})

app.get('/pages/myFundList/selectfund', (req, res)=>{
    var sql = 'SELECT * FROM funds'; //펀드리스트
    con.query(sql, function(err, results, field){
        console.log('path : /pages...', results)
        res.json(results)
    });
})

app.post("/login", async function(req,res,next){
    let body = req.body;
    console.log(body);
    if(!body) return;

    let dbPassword = "1234";
    let inputPassword = body.passwd;

    if(req.session.islogin===true){
        console.log("session alive");
        res.send("done");
        return;
    }
    else{
        if(dbPassword === inputPassword){
        console.log("비밀번호 일치");
        // 세션 설정
        req.session.email = body.email;
        console.log(body.email);
        req.session.islogin = true;
        
        res.send("you're logged In");
        }
        else{
        console.log("비밀번호 불일치");
        res.send("you're logged Out")
        }
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))