import React, {useState, Component}from 'react'
// import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './style.css'
// import 'bootstrap/dist/js/bootstrap.min.css'

import { connect } from 'react-redux';
import { logIn, regEmail } from '../../store/loginState';

class SignIn extends Component
{
    constructor(props){
        super(props);
        this.state = {
            userEmail : "",
            password : "",
        }
    }

    handleSubmit = (e) => {
        if(this.state.userEmail === "" || this.state.password === "") return;
        fetch("http://localhost:8551/login", {
            method: 'POST',
            body: JSON.stringify({
                'userEmail':this.state.userEmail,
                'userPassword':this.state.password
            }),
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},         
        })
        .then(res => res.json())
        .then(resJson => {
            if(resJson.status === 'success'){
                // user type receive too ?
                this.props.logIn();
                this.props.regEmail(this.state.userEmail);

                // go to main page
                console.log('login', this.props.logedIn)
                console.log('email', this.props.upperUserEmail)
                //window.location='/'   
            }
            else{ // fail
                //<Popup>login fail!</Popup>
            }
        })
        e.preventDefault();
    }

    handleEmailEdit = (e) => {
        this.setState({userEmail : e.target.value})
    }

    handlePasswdEdit = (e) => {
        this.setState({password : e.target.value})
    }

    render(){
        return (
            <div className="layout">
            <form>
            <h3>Sign In</h3>
            
            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" onChange={this.handleEmailEdit} />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" onChange={this.handlePasswdEdit} />
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            {/* <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Submit</button> */}
            <button onClick={this.handleSubmit}> 로그인 </button>
                <a href="http://localhost:3000/signUp">
            <button style={{marginLeft:10}}> 회원가입 </button>
            </a>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
        </form>
        </div>
        );
    }
}

const mapStateToProps = state => ({  //2
    logedIn : state.loginState.logedIn,
    upperUserEmail : state.loginState.userEmail,
});

const mapDispatchToProps = dispatch => {
    return {
      logIn : () => dispatch(logIn()),
      regEmail : email => dispatch(regEmail(email)),
    }
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(SignIn);


// function SignIn(props) {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
  
//     function validateForm() {
//       return email.length > 0 && password.length > 0;
//     }
  
//     function handleSubmit(event) {
//         fetch("http://localhost:8551/login", {
//             method: 'POST',
//             body: JSON.stringify({
//                 'userEmail':email,
//                 'userPassword':password
//             }),
//             headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},         
//         })
//         .then(res => res.json())
//         .then(resJson => {
//             if(resJson.status === 'success'){
//                 // localStorage => login : true
//                 // => localStorage.email = email
//                 // go to main page
//             }
//             else{ // fail
//                 //<Popup>login fail!</Popup>
//             }
//         })
//         .then(resJson => console.log(resJson.status));
       
//       event.preventDefault();
//     }

//     function handleSubmitPwd(e) {
//         setPassword(e.target.value);
//         console.log(password)
//     }

//     function handleEmailEdit(e) {
//         setEmail(e.target.value);
//         console.log(email)
//     }

//     function handlePasswdEdit(e) {
//         setPassword(e.target.value);
//         console.log(password)
//     }
  
//     function handleSubmitEmail(e) {
//         setEmail(e.target.value);
//         console.log(email)
//     }    

//     return (
//         <div className="layout">
//         <form>
//         <h3>Sign In</h3>
        
//         <div className="form-group">
//             <label>Email address</label>
//             <input type="email" className="form-control" placeholder="Enter email" onChange={handleEmailEdit} />
//         </div>

//         <div className="form-group">
//             <label>Password</label>
//             <input type="password" className="form-control" placeholder="Enter password" onChange={handlePasswdEdit} />
//         </div>

//         <div className="form-group">
//             <div className="custom-control custom-checkbox">
//                 <input type="checkbox" className="custom-control-input" id="customCheck1" />
//                 <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
//             </div>
//         </div>

//         <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>Submit</button>
//         <p className="forgot-password text-right">
//             Forgot <a href="#">password?</a>
//         </p>
//     </form>
//     </div>
//     );
//   }

