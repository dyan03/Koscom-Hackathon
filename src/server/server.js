const express = require('express');
const path = require('path');
var mysql = require('mysql');
const app = express();

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

/*
    회원가입
*/
app.post('/signUp', function(req, res){
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    var userName = req.body.userName;
    var userAccount = req.body.userAccount;
    var userType = '0';
    var userbalance = '0';
    var userCi = '';

    console.log(userEmail, userPassword, userName, userAccount, userType);

    var sql = "INSERT INTO USER VALUES (?,?,?,?,?,?,?)";

    connection.query(sql,[userEmail,
        userEmail,
        userName,
        userbalance,
        userType,
        userPassword,
        userAccount,
        userCi,
        ], function(err, result){
        if(err){
            console.error(err);
            throw err;
        }
        else {
            res.json(1);
        }
    })
});

/*
    HTTP REQ, RES 처리
*/
//static 파일 요청이면 아래에서 끝남
app.use(express.static(path.join(__dirname, '../build')));

//만약 그렇지않은 나머지의 경우는 index.html를 넘겨줌
app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

//8000번 포트 사용
app.listen(8000);