import React, { useState, useEffect, Component } from 'react';

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
        'userEmail': "123@123",
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
        'userEmail': "123@123",
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
        'userEmail': "123@123",
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
    this.getInitialPersonalInfo('123@123');
    this.getInitialData();
    this.getInitialData_number();
  }

  render(){
    if(this.state.loading == true) return (<div/>)
    return(
      <div>
      <div style={{display: 'flex'}}>
        <h4 style={{ textAlign: 'center', margin:'auto', marginTop: 20 }}>
          {this.state.userType} {this.state.name}님이 투자한 펀드 목록입니다.
          <a href="http://localhost:3000/registerFund">
          <button type="button" class="btn btn-dark"  style={{height: 40,width: 130, marginLeft: 20}}>새 펀드 등록</button>

          </a>
        </h4>
      </div>
      <div style={{ margin: 'auto', marginTop: 30, width: 700 }}>
        
        <div class="list-group" >
          <div style={{display:'flex', height: 50}}>
          <button type="button" class="list-group-item list-group-item-action active" >
            모집중인 펀드
            <span class="badge badge-primary badge-pill" style={{ textAlign: 'right', backgroundColor: 'white', color: 'black' }}>{this.state.fundstagenumber[0]}</span>
          </button>
          </div>
          <div style={{ overflowY: 'scroll', height: 200 }}>
            {
              this.state.fundWaitList.filter(fund => fund.stage === 0).map(fund => {
                return(
                  <a class="list-group-item list-group-item-action flex-column align-items-start">
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
              this.state.fundWaitList.filter(fund => fund.stage === 1).map(fund => {
                return(
                  <a class="list-group-item list-group-item-action flex-column align-items-start">
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
              this.state.fundWaitList.filter(fund => fund.stage === 2).map(fund => {
                return(
                  <a class="list-group-item list-group-item-action flex-column align-items-start">
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
              this.state.fundWaitList.filter(fund => fund.stage === 3).map(fund => {
                return(
                  <a class="list-group-item list-group-item-action flex-column align-items-start">
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

export default FundInfo;