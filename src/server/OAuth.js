const express = require('express');
const path = require('path');
const app = express();

const request = require('request');

//https://sandbox-apigw.koscom.co.kr/auth/oauth/v2/authorize?response_type=code&state=authCode&client_id=l7xx2d23dc68d7364f2ba84f6a159870faae&scope=account&redirect_uri=https://developers.koscom.co.kr/resources/oauthCallback.html

app.get('/test', function(req, res){

    res.redirect('https://sandbox-apigw.koscom.co.kr/auth/oauth/v2/authorize?response_type=code&state=authCode&client_id=l7xx2d23dc68d7364f2ba84f6a159870faae&scope=account&redirect_uri=http://localhost:8000/AuthCallback')
    //https://developers.koscom.co.kr/resources/oauthCallback.html
});


app.get('/AuthCallback', function(req,res){

    res.redirect('google.com');
});

app.get('/authRequest', function(req, res){
    //res.redirect('?=code&state=authCode&client_id=l7xx2d23dc68d7364f2ba84f6a159870faae&scope=&redirect_uri=https://developers.koscom.co.kr/resources/oauthCallback.html');

    option = {
        url : "https://sandbox-apigw.koscom.co.kr/auth/oauth/v2/authorize",
        method : "GET",
        headers : {
        },
        form : {
            response_type : "code",
            state : "authCode",
            client_id : "l7xx2d23dc68d7364f2ba84f6a159870faae",
            scope : "account",
            redirect_uri : "http://localhost:8000/AuthCallback" //"http://localhost:8000/authRequest",
        }
    }

    request(option, function (error, response, body) {
        console.log("[body] : ", body);
        //console.log("[response] : ", response);
        
        if(error){
            console.error("[Error] : ", error);
            throw error;
        }
        else {
            //var authorizationCodeObj = JSON.parse(body);
            //console.log("[authorizationCodeObj] : ", authorizationCodeObj);
            //res.render('resultChild', {data : accessTokenObj});
        }
    });
});

/*
    [2020-01-28] access token 얻기
*/
app.get('/authResult', function (req, res) {
    var authCode = '2904723e-efd3-4b73-a10b-4378c70d8c3b'; //"2ea40b0d-6e6f-4ef5-813b-a635213fe10a"; //req.query.code;
    var clientId = 'l7xx2d23dc68d7364f2ba84f6a159870faae';
    var clientSecret = 'a87d62c03b774962badd826acff4df61';

    console.log(authCode);

    option = {
        url : "https://sandbox-apigw.koscom.co.kr/auth/oauth/v2/token",
        method : "POST",
        headers : {
            "Content-Type" : "Application/x-www-form-urlencoded",
            "Authorization" : "Basic " + new Buffer(authCode + ':' + clientSecret).toString('base64'),
        },
        form : {
            code : authCode,
            client_id : clientId,
            client_secret : clientSecret,
            redirect_uri : "http://localhost:8000/authResult",
            grant_type : "authorization_code"
        }
    }

    request(option, function (error, response, body) {
        //console.log('response : ', response);
        console.log('body : ,', body);
        if(error){
            console.error('error : ', error);
            throw error;
        }
        else {
            var accessTokenObj = JSON.parse(body);
            console.log(accessTokenObj);
            //res.render('resultChild', {data : accessTokenObj});
        }
    });

});

/*
    [2020-01-28] access token을 사용하여 통장 잔고 얻기
*/
app.get('/balance', function(req, res){
    /*
        박환덕 Account 정보
    */
    // 1. 계좌조회
    var url = 'https://sandbox-apigw.koscom.co.kr/v1/diamond/account/balance/search';
    // 2. 고객 CI
    var ci = 'QciuDFKLcwalCKtWALuNWic9eGm7WNdauW+A+n+mpfhif24c3msHdzVjoZK0ntkXZ1+nA6LX47nyKmIq1JoHhg==';
    // 3. 고객 계좌번호
    var vtAccNo = '160635473367600099';
    // 4. Token
    var accessToken = '3a88d9ae-762b-4a8a-8c38-8dd0427d2841';

    /*
    고객 계좌잔고 정보 요청
​
    - ci : 고객 CI
    - vtAccNo : 고객 계좌번호
    - Authorization : OAuth 2.0 인증을 통해 받은 Access Token인데, 우선 고정값을 넣어둠
                      => 이부분을 실제 Web Client와 우리 서버 간 Req & Res으로 받는 걸 구현해야함
    */
    option = {
        url: url,
        body: '{  "partner": {    "comId": "F9999",    "srvId": "999"  },  "commonHeader": {  "ci": "'+ ci +'",    "reqIdConsumer": "reqid-0001"  },  "devInfo": {    "ipAddr": "192168010001",    "macAddr": "1866DA0D99D6"  },  "accInfo": {	"vtAccNo": "'+ vtAccNo +'"  },  "balanceRequestBody": {	"queryType": {      "assetType": "ALL",      "count": 0,      "page": "null"    }  }}',
        headers: { 'Content-Type':'application/json', 'Authorization':'Bearer ' + accessToken + '', 'Content-Type':'application/json'  },
        method: 'POST'
    }

    request(option, function (error, response, body) {
        console.log('Status', response.statusCode);
        console.log('Headers', JSON.stringify(response.headers));
        console.log('Reponse received', body);
    });
});


/*
app.post('/balance',auth, function(req, res){
    var finusenum = req.body.finNum;
    var selectUserSql = "SELECT * FROM fintech.user WHERE user_id = ?";
    connection.query(selectUserSql,[req.decoded.userId], function(err, result){
        var accessToken = result[0].accessToken;
        var qs = "?fintech_use_num="+finusenum+"&tran_dtime=20190919105400"
        option = {
            url : "https://testapi.open-platform.or.kr/v1.0/account/balance"+qs,
            method : "GET",
            headers : {
                "Authorization" : "Bearer " + accessToken
            },
        }
        request(option, function (error, response, body) {
            console.log(body);
            if(error){
                console.error(error);
                throw error;
            }
            else {
                console.log(body);
                var resultObj = JSON.parse(body);
                res.json(resultObj);
            }
        });
    })
})*/

/*
    HTTP REQ, RES 처리
*/
//static 파일 요청이면 아래에서 끝남
app.use(express.static(path.join(__dirname, '../build')));

//만약 그렇지않은 나머지의 경우는 index.html를 넘겨줌
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

//8000번 포트 사용
app.listen(8000);