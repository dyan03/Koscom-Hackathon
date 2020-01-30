import React, { useState, useEffect } from 'react'
import './style.css'

function SignUp(props) {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [password_, setPassword_] = useState();
    const [accountNumber, setAccountNumber] = useState();
    const [CI, setCI] = useState();
    const [bank, setBank] = useState(0);
    

    const [agree, setAgree] = useState(false);


    function validateForm() {
        //   return email.length > 0 && password.length > 0;
    }

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
        // setAgree(!agree)

        if (password != password_) {
            alert('패스워드를 확인하세요')
        }

        const body_ = {
            'userEmail': email,
            'userName': name,
            'userbalance': 0,
            'userType': 0,
            'userPassword': password,
            'userAccount': '01020',
            'userCi': 30012,
        }

        const obj = JSON.stringify({
            method: 'POST',
            body: body_,
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        })

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
        <div className="layout" style={{marginTop:30}}>
            <form>
                <h3>Sign Up</h3>
                <div style={{ display: 'flex' }}>
                    <div className="form-group">
                        <label>Your name</label>
                        <input type="name" className="form-control" placeholder="Enter name" onChange={handleSubmitName} />
                    </div>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={handleSubmitEmail} />             
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={handleSubmitPwd} />
                </div>

                <div className="form-group">
                    <label>Confirm password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={handleSubmitPwd_} />
                </div>

                <div style={{marginBottom: 15}} >
                    <label>증권사</label>
                    <select class="form-control" onChange={handleSelectBank} >
                        <option>다이아몬드 증권</option>
                        <option>사이버 증권</option>
                        <option>스타 증권</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Account number</label>
                    <input className="form-control" placeholder="Enter account number" onChange={handleSubmitAccountNumber} />
                </div>

                <div className="form-group">
                    <label>CI</label>
                    <input className="form-control" placeholder="Enter CI number" onChange={handleSubmitCI} />
                </div>

                <p className="forgot-password text-right">
                    <a href="#"> 약관 확인</a>
                </p>
                <p className="forgot-password text-right">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" checked={agree}/>
                    <label className="custom-control-label" htmlFor="customCheck1">약관 동의</label>
                </p>

                <button type="submit" className="btn btn-primary btn-block" onClick={handleCheckBox}>Submit</button>

            </form>
        </div>
    );
}

export default SignUp;