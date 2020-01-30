import React, { useState, useEffect, Component } from 'react';
import Popup from './popup'

console.log("once")

const userTypeName = ['Investor', 'Trust', 'Fund Manager']

class FundInfo extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      userType : "",
      name : "",
      fundWaitList : [],
      fundstagenumber : [0,0,0,0], // 인덱스0 => 상태0의 숫자 그대로 매칭
      loading : true
    }
  }

  getInitialData = async () => {
    fetch("http://localhost:8551/myFund", {
      method: 'POST',
      body: JSON.stringify({
        'userEmail': "hgg2468@naver.com",
    }),
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    })
    .then(res => (res.json()))
    .then(resJ => {
      //console.log('resJ.fundList', resJ.fundList, typeof(resJ.fundList))
      resJ.fundList.map(ele => {
        //console.log('ele', typeof(ele), ele);
        this.setState({fundWaitList : this.state.fundWaitList.concat(ele)});
      })
    })
    .then(() => this.setState({loading : false}))
    .then(tmp => console.log('state check', this.state.fundWaitList, typeof(this.state.fundWaitList)))
  }

  getInitialData_number = async () => {
    console.log('number stage')
    fetch("http://localhost:8551/myFundStageNumber", {
      method: 'POST',
      body: JSON.stringify({
        'userEmail': "hgg2468@naver.com",
    }),
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(resJ => {
      console.log(resJ)
      const tmp = []
      resJ.data.map(x => {
        tmp.push(x.count)
      })
      this.setState({fundstagenumber : tmp})
    })
  }

  getInitialPersonalInfo = async (userId) => {
    fetch("http://localhost:8551/userInfo", {
      method: 'POST',
      body: JSON.stringify({
        'userEmail': "hgg2468@naver.com",
    }),
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(resJ => {
      console.log(resJ)
      this.setState({name : resJ.data[0].name, userType : userTypeName[resJ.data[0].user_type]})
    })
  }

  componentDidMount(){
    this.getInitialPersonalInfo('hgg2468@naver.com');
    this.getInitialData();
    this.getInitialData_number();
  }

  render(){
    if(this.state.loading == true) return (<div/>)
    return(
      <div>
      <div>
        <h4 style={{ textAlign: 'center', marginTop: 20 }}>
          {this.state.userType} {this.state.name}님이 투자한 펀드 목록입니다.
            </h4>
      </div>
      <div style={{ margin: 'auto', marginTop: 30, width: 700 }}>
        
        <div class="list-group" >
          <button type="button" class="list-group-item list-group-item-action active">
            모집중인 펀드<span class="badge badge-primary badge-pill" style={{ textAlign: 'right', backgroundColor: 'white', color: 'black' }}>{this.state.fundstagenumber[0]}</span>
          </button>
          <div style={{ overflowY: 'scroll', height: 200 }}>
            {
              this.state.fundWaitList.filter(fund => fund.stage === '0').map(fund => {
                return(
                  <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">{fund.fund_id}</h5>
                      <small class="text-muted">등록자 : {fund.register_email}</small>
                    </div>
                    <p class="mb-1">현재 펀딩된 금액 : {fund.current_amount}</p>
                    <small class="text-muted">총 모집금액 : {fund.total_amount}</small>
                    <button>withdraw</button>
                  </a>
                );
              })
            }
          </div>
        </div>

        <div class="list-group">
          <button type="button" class="list-group-item list-group-item-action active">
            운용중인 펀드<span class="badge badge-primary badge-pill" style={{ textAlign: 'right', backgroundColor: 'white', color: 'black' }}>{this.state.fundstagenumber[1]}</span>
          </button>
          <div style={{ overflowY: 'scroll', height: 200 }}>
          {
              this.state.fundWaitList.filter(fund => fund.stage === '1').map(fund => {
                return(
                  <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">{fund.fund_id}</h5>
                      <small class="text-muted">등록자 : {fund.register_email}</small>
                    </div>
                    <p class="mb-1">현재 펀딩된 금액 : {fund.current_amount}</p>
                    <small class="text-muted">총 모집금액 : {fund.total_amount}</small>
                  </a>
                );
              })
            }
          </div>
        </div>

        <div class="list-group">
          <button type="button" class="list-group-item list-group-item-action active">
            운용마감된 펀드<span class="badge badge-primary badge-pill" style={{ textAlign: 'right', backgroundColor: 'white', color: 'black' }}>{this.state.fundstagenumber[2]}</span>
          </button>
          {
              this.state.fundWaitList.filter(fund => fund.stage === '2').map(fund => {
                return(
                  <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">{fund.fund_id}</h5>
                      <small class="text-muted">등록자 : {fund.register_email}</small>
                    </div>
                    <p class="mb-1">현재 펀딩된 금액 : {fund.current_amount}</p>
                    <small class="text-muted">총 모집금액 : {fund.total_amount}</small>
                  </a>
                );
              })
            }
        </div>

        <div class="list-group">
          <button type="button" class="list-group-item list-group-item-action active">
            취소된 펀드<span class="badge badge-primary badge-pill" style={{ textAlign: 'right', backgroundColor: 'white', color: 'black' }}>{this.state.fundstagenumber[3]}</span>
          </button>
          <div style={{ overflowY: 'scroll', height: 200 }}>
          {
              this.state.fundWaitList.filter(fund => fund.stage === '3').map(fund => {
                return(
                  <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">{fund.fund_id}</h5>
                      <small class="text-muted">등록자 : {fund.register_email}</small>
                    </div>
                    <p class="mb-1">현재 펀딩된 금액 : {fund.current_amount}</p>
                    <small class="text-muted">총 모집금액 : {fund.total_amount}</small>
                  </a>
                );
              })
            }
          </div>
        </div>

      </div>

    </div>
    )
  }
}

// function FundInfo() {
//   const [name, setName] = useState('아무개');
//   const [userType, setUserType] = useState('투자자');

//   const [fundWaitData, setFundWait] = useState([]);
//   const [fundIngData, setFundIng] = useState([]);
//   const [fundEndData, setFundEnd] = useState([]);
//   const [fundCanceledData, setFundCanceled] = useState([]);

//   //로그인된 유저 id로 DB에서 보유펀드정보 불러옴
//   var fundWait = []
//   var fundIng = []
//   var fundEnd = []
//   var fundCanceled = []

//   const email = "hgg2468@naver.com";
//   const fundStage = [0, 1, 2, 3];
//   var fundListResult = [];

//   useEffect(() => {
//     fetch("http://localhost:8551/myFund", {
//       method: 'POST',
//       body: JSON.stringify({
//         'userEmail': email,
//         'fundStage': '1',
//     }),
//     headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
//     })
//     .then(res => res.json())
//     .then(resJson => setFundWait(resJson))
//   }, [])

//   // useEffect(() => {
//   //   fundStage.map(stage => {
//   //     fetch("http://localhost:8551/myFund", {
//   //       method: 'POST',
//   //       body: JSON.stringify({
//   //         'userEmail': email,
//   //         'fundStage': stage,
//   //       }),
//   //       headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
//   //       })
//   //       .then((res) => (console.dir(res.json().then(data => {
//   //         fundListResult.push(data.fundList)            
//   //       }))))
//   //   })
//   // }, [])

 

//   // useEffect(() => {
//   //   fetch("http://localhost:8551/myFund", {
//   //     method: 'POST',
//   //     body: JSON.stringify({
//   //       'userEmail': email,
//   //       'fundStage': '1',
//   //   }),
//   //   headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
//   //   })
//   //   .then(res => res.json())
//   //   .then(resJson => setFundIng(resJson))
//   // }, [])

//   // useEffect(() => {
//   //   fetch("http://localhost:8551/myFund", {
//   //     method: 'POST',
//   //     body: JSON.stringify({
//   //       'userEmail': email,
//   //       'fundStage': '2',
//   //   }),
//   //   headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
//   //   })
//   //   .then(res => res.json())
//   //   .then(resJson => setFundEnd(resJson))
//   // }, [])
  
//   // useEffect(() => {
//   //   fetch("http://localhost:8551/myFund", {
//   //     method: 'POST',
//   //     body: JSON.stringify({
//   //       'userEmail': email,
//   //       'fundStage': '3',
//   //   }),
//   //   headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
//   //   })
//   //   .then(res => res.json())
//   //   .then(resJson => setFundCanceled(resJson))
//   // }, [])

 

//   const clickhandler = () => {
//     { console.log('popup!!!') }
//     return (
//       <Popup />
//     )
//   }

//   console.log("fundWait result", fundWaitData)
//   console.log("fundIng result", fundIng)
//   console.log("fundEnd result", fundEnd)
//   console.log("fundCanceled result", fundCanceled)

//   return (

//     <div>
//       <div >
//         <h4 style={{ textAlign: 'center', marginTop: 20 }}>
//           {userType} {name}님의 펀드 목록입니다.
//             </h4>
//       </div>
//       <div style={{ margin: 'auto', marginTop: 30, width: 700 }}>
//         <div class="list-group" >
//           <button type="button" class="list-group-item list-group-item-action active">
//             대기중인 펀드<span class="badge badge-primary badge-pill" style={{ textAlign: 'right', backgroundColor: 'white', color: 'black' }}>6</span>
//           </button>
//           <div style={{ overflowY: 'scroll', height: 200 }}>
//             { 
//               console.log('fundWaitData', JSON.stringify(fundWaitData.fundList))
//             }
//             <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
//               <div class="d-flex w-100 justify-content-between">
//                 <h5 class="mb-1">List group item heading</h5>
//                 <small class="text-muted">3 days ago</small>
//               </div>
//               <p class="mb-1">Donec id elit non mi porta gravida at eget metus.</p>
//               <small class="text-muted">Donec id elit non mi porta.</small>
//             </a>
//           </div>

//         </div>
//         <div class="list-group">
//           <button type="button" class="list-group-item list-group-item-action active">
//             운용중인 펀드<span class="badge badge-primary badge-pill" style={{ textAlign: 'right', backgroundColor: 'white', color: 'black' }}>6</span>
//           </button>
//           <div style={{ overflowY: 'scroll', height: 200 }}>
//             <button type="button" class="list-group-item list-group-item-action">펀드 1호</button>
//             <button type="button" class="list-group-item list-group-item-action">펀드 2호</button>
//             <button type="button" class="list-group-item list-group-item-action">펀드 3호</button>
//             <button type="button" class="list-group-item list-group-item-action">펀드 4호</button>
//             <button type="button" class="list-group-item list-group-item-action">펀드 4호</button>
//             <button type="button" class="list-group-item list-group-item-action">펀드 4호</button>
//           </div>

//         </div>
//         <div class="list-group">
//           <button type="button" class="list-group-item list-group-item-action active">
//             운용마감된 펀드<span class="badge badge-primary badge-pill" style={{ textAlign: 'right', backgroundColor: 'white', color: 'black' }}>1</span>
//           </button>
//           <button type="button" class="list-group-item list-group-item-action">펀드 1호</button>
//         </div>
//         <div class="list-group">
//           <button type="button" class="list-group-item list-group-item-action active">
//             취소된 펀드<span class="badge badge-primary badge-pill" style={{ textAlign: 'right', backgroundColor: 'white', color: 'black' }}>6</span>
//           </button>
//           <div style={{ overflowY: 'scroll', height: 200 }}>
//             <button type="button" class="list-group-item list-group-item-action">펀드 1호</button>
//             <button type="button" class="list-group-item list-group-item-action">펀드 2호</button>
//             <button type="button" class="list-group-item list-group-item-action">펀드 3호</button>
//             <button type="button" class="list-group-item list-group-item-action">펀드 4호</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



{/* <div class="list-group">
  <a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">List group item heading</h5>
      <small>3 days ago</small>
    </div>
    <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
    <small>Donec id elit non mi porta.</small>
  </a>
  <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">List group item heading</h5>
      <small class="text-muted">3 days ago</small>
    </div>
    <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
    <small class="text-muted">Donec id elit non mi porta.</small>
  </a>
  <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">List group item heading</h5>
      <small class="text-muted">3 days ago</small>
    </div>
    <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
    <small class="text-muted">Donec id elit non mi porta.</small>
  </a>
</div> */}



export default FundInfo;