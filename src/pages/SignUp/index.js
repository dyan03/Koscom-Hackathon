import React, {useState, useEffect}from 'react'
// import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './style.css'
// import 'bootstrap/dist/js/bootstrap.min.css'

function SignUp(props) {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [password_, setPassword_] = useState();
    const [agree, setAgree]=useState(false);


    function validateForm() {
    //   return email.length > 0 && password.length > 0;
    }
    function handleSubmitName(e){
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmitEmail(e) {
        setEmail(e.target.value);
        console.log(email)
    }

    function handleSubmitPwd(e){
        setPassword(e.target.value)
        console.log(password)
    }

    function handleSubmitPwd_(e){
        setPassword_(e.target.value)
        console.log(password_)
    }

    function handleCheckBox(e){
        setAgree(!agree)

        if(password!=password_){
            alert('패스워드를 확인하세요')
        }


        const body_={
            userEmail: email,
            userName: name,
            userbalance: 0,
            userType: 0,
            userPassword: password,
            userAccount: '01020',
            userCi: 30012,
        }

        const obj = {
            headers: {},
            body: body_,
            method: 'POST'
          }

          const URL='http://localhost:8551/UserInsert';
          
          fetch(URL, obj)
          .then(res => res => res.json())
          .then(json => console.log(json))
          .catch(err => console.log(err));

        //   fetch('localhost:8551/UserInsert', {
        //     method: 'post',
        //     body: JSON.stringify(opts)
        //   }).then(function(response) {
        //     return response.json();
        //   }).then(function(data) {
        //     ChromeSamples.log('Created Gist:', data.html_url);
        //   });
        console.dir(obj.body)

    }  

    useEffect(()=>{
        console.log(email)
        console.log(name)
        console.log(password)
        console.log(password_)
    })


    return (
        <div className="layout">
        <form>
        <h3>Sign Up</h3>
        <div style={{display: 'flex'}}>
        <div className="form-group">
            <label>Your name</label>
            <input type="name" className="form-control" placeholder="Enter name" onChange={handleSubmitName}/>
        </div>
        </div>

        <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" placeholder="Enter email" onChange={handleSubmitEmail}/>
        </div>

        <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" onChange={handleSubmitPwd} />
        </div>

        <div className="form-group">
            <label>Confirm password</label>
            <input type="password" className="form-control" placeholder="Enter password" onChange={handleSubmitPwd_}/>
        </div>
        <p className="forgot-password text-right">
            <a href="#"> 약관 확인</a>
        </p>
        <p className="forgot-password text-right">
            <input type="checkbox" className="custom-control-input" id="customCheck1" checked={agree} onChange={handleCheckBox}/>
            <label className="custom-control-label" htmlFor="customCheck1">약관 동의</label>
        </p>                
        <button type="submit" className="btn btn-primary btn-block" onClick={useEffect} style={{backgroundColor: 'skyblue', borderColor: 'white'}}>계좌등록</button>

        <button type="submit" className="btn btn-primary btn-block" onClick={handleCheckBox}>Submit</button>


        </form>
    </div>
    );
  }

export default SignUp;