const express = require('express')
const path = require('path')
const app = express()
const port = 8551
var router = express.Router();
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');

const session = require('express-session');
const FileStore = require('session-file-store')(session)

app.use(express.static(path.join(__dirname, '../../build')))
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
})

app.use(cookieParser());
app.use(bodyParser.json())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1 * 60 * 1000// 쿠키 유효기간 min
  },
  store : new FileStore()
}));

/*
    DB Connection 처리
*/
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'db'
});

connection.connect(function (error) {
    if(error){
        console.error('error connection: ' + error.stack);
        return;
    }

    //console.log('connection: ', connection);
    console.log('[DB Connection Success] connected as id ' +   connection.threadId);
});

function isAuthenticated(req, res, next) {
    // do any checks you want to in here
  
    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    if (req.user.islogin)
        return next();
  
    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.json({status:"session_out"});
}

/*
    로그인 처리
*/
app.post("/login", async function(req,res,next){
    let body = req.body;
    console.log('body', body);
    if(!body) return;

    if(req.session.islogin===true){
        console.log("session alive");
        res.send("done");
        return;
    }
    else{
        const userEmail = body.userEmail;
        const inputPassword = body.userPassword;
        const passwdSql = "select pwd from user where email = (?)";
        
        connection.query(passwdSql, [userEmail], function(err, results, field){
            if(results[0].pwd === inputPassword){
                console.log("비밀번호 일치");
                // 세션 설정
                req.session.userEmail = body.userEmail;
                req.session.islogin = true;
                res.json({status:'success'});
            }
            else{
                console.log("비밀번호 불일치");
                res.json({status:'fail'});
            }
        });        
    }
});

/*
    회원가입시 사용자 정보 등록
*/
app.post('/userInsert', function(req, res){
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    var userName = req.body.userName;
    var userAccount = req.body.userAccount;
    var userType = req.body.userType;
    var userBalance = req.body.userBalance;
    var userCi = req.body.userCi;
    var userBank = req.body.userbank;

    //console.log(userEmail, userPassword, userName, userAccount, userType, userBalance, userCi, userbank);

    var sql = "INSERT INTO USER VALUES (?,?,?,?,?,?,?,?)";

    connection.query(sql,[
        userEmail,
        userName,
        userBalance,
        userType,
        userPassword,
        userAccount,
        userCi,
        userBank
        ], function(err, result){
        if(err){
            console.dir(result)
            console.error(err);
            throw err;
        }
        else {
            res.json(1);
        }
    })
});

/*
    my fund list
*/
app.post('/myFund', isAuthenticated, function(req, res){
    var userEmail = req.body.userEmail;
    const fundsSql = "select pwd from user where email = (?)";
})

/*
    회원가입시 email 중복 확인
*/

app.post('/userCheck', function(req, res){
    var userEmail = req.body.userEmail;
    var sql = "SELECT * FROM USER WHERE email = (?)";

    console.log('userEmail : ', userEmail);

    connection.query(sql,[userEmail], function(err, result){
        if(err){
            console.error(err);
            throw err;
        }
        else {
            console.log(result);
            res.json({
                data : result
            });
        }
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
