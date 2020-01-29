import React, { useState, useEffect } from 'react'
// import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './style.css'
// import 'bootstrap/dist/js/bootstrap.min.css'

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
        setAgree(!agree)

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

        fetch("http://localhost:8551/userInsert", obj)
            .then(res => res.json())
            .then(json => console.log("result is ", json))
            .catch(err => console.log(err));
        console.dir(obj.body)

    }


    return (
        <div className="layout">
            <form>
                <h3>Sign Up</h3>
                <div style={{ display: 'flex' }}>
                    <div className="form-group">
                        <label>Your name</label>
                        <input type="name" className="form-control" placeholder="Enter name" onChange={handleSubmitName} />

                    </div>
 
                </div>

                <div style={{marginBottom: 15}} >
                    <label>Bank</label>
                    <select class="form-control" onChange={handleSelectBank} >
                        <option>신한은행</option>
                        <option>국민은행</option>
                        <option>하나은행</option>
                        <option>우리은행</option>
                    </select>
                </div>

<<<<<<< HEAD
        <div className="form-group">
            <label>Confirm password</label>
            <input type="password" className="form-control" placeholder="Enter password" required/>
        </div>
        <p className="forgot-password text-right">
            <a href="#"> 약관 확인</a>
        </p>
        <p className="forgot-password text-right">
            <input type="checkbox" className="custom-control-input" id="customCheck1" checked={agree} onChange={handleCheckBox}/>
            <label className="custom-control-label" htmlFor="customCheck1">약관 동의</label>
        </p>                
        <button type="submit" className="btn btn-primary btn-block" style={{backgroundColor: 'skyblue', borderColor: 'white'}}>계좌등록</button>
        <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmitForm}>Submit</button>

        </form>
    </div>
=======
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
                    <input type="checkbox" className="custom-control-input" id="customCheck1" checked={agree} onChange={handleCheckBox} />
                    <label className="custom-control-label" htmlFor="customCheck1">약관 동의</label>
                </p>

                <button type="submit" className="btn btn-primary btn-block" onClick={handleCheckBox}>Submit</button>


            </form>
        </div>
>>>>>>> b1dc2b43f1545074c965c397436cc60e24c5c81d
    );
}

export default SignUp;