import React, {useState}from 'react'
// import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './style.css'
// import 'bootstrap/dist/js/bootstrap.min.css'
function SignIn(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    function validateForm() {
      return email.length > 0 && password.length > 0;
    }
  
    function handleSubmitPwd(e) {
      setPassword(e.target.value);
      console.log(password)
    }
  
    function handleSubmitEmail(e) {
        setEmail(e.target.value);
        console.log(email)
    }    

    return (
        <div className="layout">
        <form>
        <h3>Sign In</h3>
        
        <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" placeholder="Enter email" onChange={handleSubmitEmail}/>
        </div>

        <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" onChange={handleSubmitPwd}/>
        </div>

        <div className="form-group">
            <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
            </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block">Submit</button>
        <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
        </p>
    </form>
    </div>
    );
  }

export default SignIn;