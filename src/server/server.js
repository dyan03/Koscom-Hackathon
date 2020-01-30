const express = require('express')
const path = require('path')
const app = express()
const port = 8551
var router = express.Router();
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const url = require('url');
const request = require('request');

const session = require('express-session');
const FileStore = require('session-file-store')(session)

var myToken = '';
const myFundStageNumberRouter = require('./nodeRouter/myFundStageNumber')

app.use(express.static(path.join(__dirname, '../../build')))
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
})

app.use(cookieParser());
app.use(bodyParser.json())
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     maxAge: 15 * 60 * 1000// 쿠키 유효기간 min
//   },
//   store : new FileStore()
// }));

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

    const userEmail = body.userEmail;
    const inputPassword = body.userPassword;
    const passwdSql = "select pwd from user where email = (?)";
    
    connection.query(passwdSql, [userEmail], function(err, results, field){
        if(results[0].pwd === inputPassword){
            console.log("비밀번호 일치");
            // 세션 설정
            //req.session.userEmail = body.userEmail;
            //req.session.islogin = true;
            res.json({status:'success'});
        }
        else{
            console.log("비밀번호 불일치");
            res.json({status:'fail'});
        }
    });        
});

/*
    회원가입시 사용자 정보 등록
*/
app.post('/userInsert', function(req, res){
    console.log("server post user insert");
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    var userName = req.body.userName;
    var userAccount = req.body.userAccount;
    var userType = req.body.userType;
    var userBalance = req.body.userBalance;
    var userCi = req.body.userCi;
    var userBank = req.body.userbank;
    var userToken = req.body.token;

    //console.log(userEmail, userPassword, userName, userAccount, userType, userBalance, userCi, userbank);

    var sql = "INSERT INTO USER VALUES (?,?,?,?,?,?,?,?,?)";

    connection.query(sql,[
        userEmail,
        userName,
        userBalance,
        userType,
        userPassword,
        userAccount,
        userCi,
        userBank,
        userToken
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

/*
    내 펀드 리스트 가져오기
*/
app.post('/myFund', function(req, res){
    var userEmail = req.body.userEmail;
    // var fundStage = req.body.fundStage;
    console.log('userEmail : ', userEmail);
    // console.log('fundStage : ', fundStage);

    var sql = "SELECT * FROM funds WHERE fund_id in (SELECT fund_id FROM funds_ongoing WHERE invest_email = (?))";
    connection.query(sql, [userEmail],
        function(err, result){
        if(err){
            console.error(err);
            throw err;
        }
        else {
            console.log('result',result);
            res.json({
                fundList : result
            });
        }
    })
})

/*
    내 펀드 stage number 가져오기
*/
app.post('/myFundStageNumber', function(req, res){
    var userEmail = req.body.userEmail;
    console.log('userEmail : ', userEmail);

    var sql = "select stage,count(*) as count from funds_ongoing, funds where funds_ongoing.fund_id = funds.fund_id and invest_email = (?) group by stage;";
    connection.query(sql, [userEmail],
        function(err, result){
        if(err){
            console.error(err);
            throw err;
        }
        else {
            console.log('result',result);
            res.json({
                data : result
            });
        }
    })
})

/*
    user info 가져오기
*/
app.post('/userInfo', function(req, res){
    var userEmail = req.body.userEmail;
    console.log('userEmail : ', userEmail);

    var sql = "select * from user where email = (?);";
    connection.query(sql, [userEmail],
        function(err, result){
        if(err){
            console.error(err);
            throw err;
        }
        else {
            console.log('result',result);
            res.json({
                data : result
            });
        }
    })
})

/*
    Authorization Code Callback Listener
*/
app.get('/AuthCallback', function(req,res){
    //아래주소에서 접속해서 받음
    //https://sandbox-apigw.koscom.co.kr/auth/oauth/v2/authorize?response_type=code&state=authCode&client_id=l7xx2d23dc68d7364f2ba84f6a159870faae&scope=&redirect_uri=http://localhost:8551/AuthCallback
    console.log(req.query);

    res.redirect(302, url.format({
            pathname: "http://localhost:8551/authResult",
            query: {
                code : req.query.code,
                state : req.query.state,
                scope : req.query.scope
            }
        }));

});

/*
    Access Token 얻기
*/
app.get('/authResult', function (req, res) {
    console.log(req.query);

    var authCode = req.query.code;
    var clientId = 'l7xx2d23dc68d7364f2ba84f6a159870faae';
    var clientSecret = '6740431c44414a1b928fa78c86349f73';
    //console.log('authCode : ', req.query.code);

    option = {
        url : "https://sandbox-apigw.koscom.co.kr/auth/oauth/v2/token",
        method : "POST",
        headers : {
            "Content-Type" : "Application/x-www-form-urlencoded",
            "Authorization" : "Basic " + new Buffer(clientId + ':' + clientSecret).toString('base64'),
        },
        form : {
            code : authCode,
            grant_type : "authorization_code",
            redirect_uri : "http://localhost:8551/AuthCallback"
        }
    }

    request(option, function (error, response, body) {

        if(error){
            console.error('error : ', error);
            throw error;
        }
        else {
            var accessTokenObj = JSON.parse(body);
            console.log('accessTokenObj : ', accessTokenObj);
            res.send(accessTokenObj);
            myToken = accessTokenObj;
            console.log('myToken : ', myToken);

            // res.redirect(302, url.format({
            //     pathname: "http://localhost:3000/signUp",
            //     query: {
            //         data : accessTokenObj
            //     }
            // }
            
            // ));
            //res.render('SignUp', {data : accessTokenObj});
        }
    });

});

/*
    Access Token을 사용하여 통장 잔고 얻기
*/
app.post('/balance', function(req, res){

    /*1. 잔고조회 API URL
        1.다이아몬드증권 : https://sandbox-apigw.koscom.co.kr/v1/diamond/account/balance/search
        2.사이버증권 : https://sandbox-apigw.koscom.co.kr/v1/cyber/account/balance/search
        3.스타증권 : https://sandbox-apigw.koscom.co.kr/v1/star/account/balance/search

    */
    //var url = req.body.url;

    // 계좌은행 : 3개의 값만 가져와야함 {diamond, cyber, star}
    var bank = req.body.bank;
    // 2. 고객 CI
    var ci = req.body.ci;
    // 3. 고객 계좌번호
    var vtAccNo = req.body.vtAccNo;
    // 4. 고객 Token
    var accessToken = req.body.accessToken;
    
    //고객 계좌잔고 정보 요청
    option = {
        url: 'https://sandbox-apigw.koscom.co.kr/v1/' + bank + '/account/balance/search',
        body: '{"partner": {    "comId": "F9999",    "srvId": "999"  },  "commonHeader": {  "ci": "'+ ci +'",    "reqIdConsumer": "reqid-0001"  },  "devInfo": {    "ipAddr": "192168010001",    "macAddr": "1866DA0D99D6"  },  "accInfo": {	"vtAccNo": "'+ vtAccNo +'"  },  "balanceRequestBody": {	"queryType": {      "assetType": "ALL",      "count": 0,      "page": "null"    }  }}',
        headers: { 'Content-Type':'application/json', 'Authorization':'Bearer ' + accessToken + '', 'Content-Type':'application/json'  },
        method: 'POST'
    }

    request(option, function (error, response, body) {
        //console.log('Reponse received', body);

        if(error){
            console.log(err);
            throw new Error(error);
        }

        var cashBalance = '';
        try{
            cashBalance = JSON.parse(body).balanceList.balance.summary.cashBalance;
            console.log(JSON.parse(body));
            res.send('1');
        }catch(e){
            console.log(JSON.parse(body));
            res.send('0');
        }

    });
});

/*
    HTTP REQ, RES 처리
*/
//static 파일 요청이면 아래에서 끝남
app.use(express.static(path.join(__dirname, '../build')));

//만약 그렇지않은 나머지의 경우는 index.html를 넘겨줌
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
