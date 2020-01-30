const LOGIN = "loginState/LOGIN";
const LOGOUT = "loginState/LOGOUT";
const REGEEMAIL = "loginState/REGEMAIL";

// 액션 생성 함수 정의
export const logIn = () => ({ type: LOGIN }) ;
export const logOut = () => ({ type: LOGOUT }) ;
export const regEmail = userEmail => ({ type: REGEEMAIL, userEmail });

// 초기 상태 정의
const initialState = {
    logedIn: false,
    userEmail : "",
    userType : "",
};

// reducer
export default function loginState(state=initialState, action) {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                logedIn: true ,
            } ;
        case LOGOUT:
            return {
                ...state,
                logedIn: false ,
            } ;
        case REGEEMAIL :
            return {
                ...state,
                userEmail: action.userEmail ,
            } ;
        default:
            return state ;
    }
}