import React, {useState}from 'react'
// import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './style.css'
// import 'bootstrap/dist/js/bootstrap.min.css'

function SignUp(props) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [agree, setAgree]=useState(false);


    function validateForm() {
    //   return email.length > 0 && password.length > 0;
    }
    function handleSubmitPwd(e){
        setPassword(e.target.value)
        console.log(password)
    }
    function handleSubmitEmail(e) {
        setEmail(e.target.value);
        console.log(email)
    }

    function handleSubmitPwd(e){
        setPassword(e.target.value)
        console.log(password)
    }

    function handleSubmitForm(event) {
        console.log("제출결과")
        console.log(email)
        console.log(password)
    }

    function handleCheckBox(e){
        setAgree(!agree)
        console.dir(agree)
    }


    return (
        <div className="layout">
        <form>
        <h3>Sign Up</h3>
        <div style={{display: 'flex'}}>
        <div className="form-group">
            <label>First name</label>
            <input type="name" className="form-control" placeholder="Enter name" onChange={handleCheckBox}/>
        </div>
        </div>

        <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" placeholder="Enter email" onChange={handleSubmitEmail}/>
        </div>

        <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password"onChange={handleSubmitPwd} />
        </div>

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
    );
  }

export default SignUp;