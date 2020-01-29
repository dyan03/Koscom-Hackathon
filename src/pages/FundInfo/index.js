import React, { useState, useEffect } from 'react';
import Popup from './popup'

function FundInfo() {
  const [name, setName] = useState('아무개');
  const [userType, setUserType] = useState('투자자');

  //로그인된 유저 id로 DB에서 보유펀드정보 불러옴
  const fundWait = {

  }
  const fundIng = {}
  const fundEnd = {}
  const fundCanceled = {}

const email="th@gmail.com";

useEffect(()=>{
  fetch("http://localhost:8551/myFund", {
    method: 'POST',
    body: JSON.stringify({
        'userEmail': email,
    }),
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},         
})
.then((res)=>(console.dir(res.json().then(data=>{
  console.dir(data.fundList);
}
))))
// .then(resJson => console.log(resJson.status));
})



  const clickhandler = () => {
    { console.log('popup!!!') }

    return (
      <Popup />
    )
  }

  return (

    <div>
      <div >
        <h4 style={{ textAlign: 'center', marginTop: 20 }}>
          {userType} {name}님의 펀드 목록입니다.
            </h4>
      </div>

      <div style={{ margin: 'auto', marginTop: 30, width: 700 }}>
        <div class="list-group" >
          <button type="button" class="list-group-item list-group-item-action active">
            대기중인 펀드<span class="badge badge-primary badge-pill" style={{ textAlign: 'right', backgroundColor: 'white', color: 'black' }}>6</span>
          </button>
          <div style={{ overflowY: 'scroll', height: 200 }}>
            <button type="button" class="list-group-item list-group-item-action" data-toggle="modal" data-target='#Popup'>펀드 1호 </button>
            <button type="button" class="list-group-item list-group-item-action">펀드 2호</button>
            <button type="button" class="list-group-item list-group-item-action">펀드 3호</button>
            <button type="button" class="list-group-item list-group-item-action">펀드 4호</button>
            <button type="button" class="list-group-item list-group-item-action">펀드 5호</button>
            <button type="button" class="list-group-item list-group-item-action">펀드 6호</button>
            <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">List group item heading</h5>
                <small class="text-muted">3 days ago</small>
              </div>
              <p class="mb-1">Donec id elit non mi porta gravida at eget metus.</p>
              <small class="text-muted">Donec id elit non mi porta.</small>
            </a>
          </div>

        </div>
        <div class="list-group">
          <button type="button" class="list-group-item list-group-item-action active">
            운용중인 펀드<span class="badge badge-primary badge-pill" style={{ textAlign: 'right', backgroundColor: 'white', color: 'black' }}>6</span>
          </button>
          <div style={{ overflowY: 'scroll', height: 200 }}>
            <button type="button" class="list-group-item list-group-item-action">펀드 1호</button>
            <button type="button" class="list-group-item list-group-item-action">펀드 2호</button>
            <button type="button" class="list-group-item list-group-item-action">펀드 3호</button>
            <button type="button" class="list-group-item list-group-item-action">펀드 4호</button>
            <button type="button" class="list-group-item list-group-item-action">펀드 4호</button>
            <button type="button" class="list-group-item list-group-item-action">펀드 4호</button>
          </div>

        </div>
        <div class="list-group">
          <button type="button" class="list-group-item list-group-item-action active">
            운용마감된 펀드<span class="badge badge-primary badge-pill" style={{ textAlign: 'right', backgroundColor: 'white', color: 'black' }}>1</span>
          </button>
          <button type="button" class="list-group-item list-group-item-action">펀드 1호</button>
        </div>
        <div class="list-group">
          <button type="button" class="list-group-item list-group-item-action active">
            취소된 펀드<span class="badge badge-primary badge-pill" style={{ textAlign: 'right', backgroundColor: 'white', color: 'black' }}>6</span>
          </button>
          <div style={{ overflowY: 'scroll', height: 200 }}>
            <button type="button" class="list-group-item list-group-item-action">펀드 1호</button>
            <button type="button" class="list-group-item list-group-item-action">펀드 2호</button>
            <button type="button" class="list-group-item list-group-item-action">펀드 3호</button>
            <button type="button" class="list-group-item list-group-item-action">펀드 4호</button>
          </div>
        </div>
      </div>
    </div>
  )
}



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