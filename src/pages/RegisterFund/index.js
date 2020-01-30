import React, { useState, useEffect } from 'react'
import './style.css'

function RegisterFund(props) {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [password_, setPassword_] = useState();
    const [accountNumber, setAccountNumber] = useState();
    const [CI, setCI] = useState();
    const [bank, setBank] = useState(0);
    
    var fund_id; var company_id;
    var manager_id;
    var stage;
    var total_amount;
    var start_date; var end_date;
    var fund_style; var morningsta_type;

    const [agree, setAgree] = useState(false);

    function handleSubmitName(e) {
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmitEmail(e) {
        setEmail(e.target.value);
        console.log(email)
    }

    function handleSubmitPwd(e) {
        setPassword(e.target.value)
        console.log(password)
    }

    function handleSubmitPwd_(e) {
        setPassword_(e.target.value)
        console.log(password_)
    }

    function handleSubmitAccountNumber(e) {
        setAccountNumber(e.target.value)
        console.log(accountNumber)
    }

    function handleSubmitCI(e) {
        setCI(e.target.value)
        console.log(CI)
    }

    function handleSelectBank(e){
        setBank(e.target.value)
        console.log(bank)
    }

    function handleCheckBox(e) {

        if (password != password_) {
            alert('패스워드를 확인하세요')
        }

        const body_ = {
            userEmail: email,
            userName: name,
            userbalance: 0,
            userType: 0,
            userPassword: password,
            userAccount: '01020',
            userCi: 30012,
            userBank: bank,
        }

        const obj = {
            method: 'POST',
            body: body_,
        }

        const URL = 'http://localhost:8551/userInsert';

        fetch("http://localhost:8551/userInsert",{
            method: 'POST',
            body: JSON.stringify({
                'userEmail': email,
                'userName': name,
                'userbalance': 0,
                'userType': 0,
                'userPassword': password,
                'userAccount': '01020',
                'userCi': 30012,
                'userBank': bank,
            }),
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},         
            }).then(res => res.json())
          .then(resJson => console.log(resJson.status));
    }

    return (
        <div className="layout" style={{width:700, marginTop:30}}>
            <form>
                <h3>펀드 등록</h3>
                <div style={{ display: 'flex' }}>
                    <div className="form-group" style={{width:350}}>
                        <label>펀드 이름</label>
                        <input type="name" className="form-control" placeholder="펀드명을 입력해주세요" onChange={handleSubmitName} />
                    </div>
                    <div className="form-group" style={{marginLeft: 30, width: 150}}>
                        <label>신탁사</label>
                        <select class="form-control" onChange={handleSelectBank} >
                        <option>A신탁사</option>
                        <option>B신탁사</option>
                        <option>C신탁사</option>
                    </select>     
                    </div>
                </div>
                <div style={{display: 'flex'}}>
                    <div className="form-group" style={{width:300}}>
                        <label>펀드 매니저</label>
                        <input type="email" className="form-control" placeholder="계정 이메일을 입력해주세요" onChange={handleSubmitPwd} />
                        
                    </div>
                        <div className="form-group" style={{width:180, marginLeft:30}}>    
                        <label>운용 금액</label>
                        <input className="form-control" onChange={handleSubmitName}/>

                    </div>
                    <div style={{marginTop: 40, marginLeft: 10}}>
                        원
                    </div>
                </div>
                <div style={{display:'flex'}}>
                    <div style={{marginBottom: 15, width: 250}} >
                        <label>펀드 종류</label>
                        <select class="form-control" onChange={handleSelectBank} >
                            <option>대형가치펀드</option>
                            <option>대형혼합펀드</option>
                            <option>대형성장펀드</option>
                            <option>중형가치펀드</option>
                            <option>중형혼합펀드</option>
                            <option>중형성장펀드</option>
                            <option>소형가치펀드</option>
                            <option>소형혼합펀드</option>
                            <option>소형성장펀드</option>
                        </select>
                    </div>
                    <div style={{marginBottom: 15, width: 250, marginLeft: 30}} >
                        <label>모닝스타 타입</label>
                        <select class="form-control" onChange={handleSelectBank} >
                            <option>국내 대형주 주식형</option>
                            <option>국내 중소형주 주식형</option>
                            <option>글로벌 주식형</option>
                            <option>라틴아메리카 주식형</option>
                            <option>러시아 주식형</option>
                            <option>미국 주식형</option>
                            <option>브라질 주식형</option>
                            <option>브릭스 주식형</option>
                            <option>아세안 주식형</option>
                        </select>
                    </div>
                </div>
                <div style={{display:'flex'}}>
                    <div className="form-group" style={{width: 250}}>
                        <label>시작일</label>
                        <input type="text" className="form-control" onChange={handleSubmitPwd_} />
                    </div>
                    <div className="form-group" style={{width: 250, marginLeft: 30}}>
                        <label>마감일</label>
                        <input type="text" className="form-control" onChange={handleSubmitPwd_} />
                    </div>
                </div>


                <div className="form-group" >
                    <label>펀드 설명</label>
                    <input type="text" poi className="form-control" style={{width: 530, height: 200}} onChange={handleSubmitAccountNumber} />
                </div>

                <p className="forgot-password text-right">
                    <a href="#"> 약관 확인</a>
                </p>
                <p className="forgot-password text-right">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" checked={agree} />
                    <label className="custom-control-label" htmlFor="customCheck1">약관 동의</label>
                </p>

                <button type="submit" className="btn btn-primary btn-block" onClick={handleCheckBox}>펀드 등록하기</button>

            </form>
        </div>
    );
}

export default RegisterFund;