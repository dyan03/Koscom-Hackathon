import React, { useState } from 'react';

function FundInfo() {
    const [name, setName]=useState('아무개');
    const [userType, setUserType]=useState('투자자');

    //로그인된 유저 id로 DB에서 보유펀드정보 불러옴
    const fundWait = {

    }
    const fundIng = {}
    const fundEnd = {}
    const fundCanceled = {}

    return (

        <div>
            <div >
            <h4 style={{textAlign: 'center', marginTop: 20}}>
            {userType} {name}님의 펀드 목록입니다.
            </h4>
            </div>
            
            <div style={{margin: 'auto', marginTop: 30, width: 700}}>
            <div class="list-group" >
                <button type="button" class="list-group-item list-group-item-action active">
                    대기중인 펀드
                </button>
                <button type="button" class="list-group-item list-group-item-action">펀드 1호</button>
                <button type="button" class="list-group-item list-group-item-action">펀드 2호</button>

            </div>
            <div class="list-group">
                <button type="button" class="list-group-item list-group-item-action active">
                    운용중인 펀드
                </button>
                <button type="button" class="list-group-item list-group-item-action">펀드 1호</button>
                <button type="button" class="list-group-item list-group-item-action">펀드 2호</button>

            </div>
            <div class="list-group">
                <button type="button" class="list-group-item list-group-item-action active">
                    운용마감된 펀드
                </button>
                <button type="button" class="list-group-item list-group-item-action">펀드 1호</button>
            </div>
            <div class="list-group">
                <button type="button" class="list-group-item list-group-item-action active">
                    취소된 펀드
                </button>
                <button type="button" class="list-group-item list-group-item-action">펀드 1호</button>
                <button type="button" class="list-group-item list-group-item-action">펀드 2호</button>

            </div>
        </div>
        </div>
    )
}

export default FundInfo;