import React, { useState, useEffect, Component } from 'react'

class Funding extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleSubmit = (event) => {
        console.log("submit")
        var returnValue = window.confirm('펀드를 취소하시겠습니까?')
        if (returnValue) {
            fetch("http://localhost:8551/fundDelete", {
                method: 'POST',
                body: JSON.stringify({
                    'userId': this.props.userId,
                    'type': 1,
                }),
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(resJson => {
                    if (resJson.status === 'success') {
                        alert("펀드가 취소되었습니다.")
                    }
                    else { // fail
                    }
                })
                .then(resJson => console.log(resJson.status));
            event.preventDefault();
        }
    }

    render() {
        return (
            <div className="layout" style={{ width: 700, marginTop: 30 }}>
                <form>
                    <h3>펀딩</h3>
                    <div style={{ display: 'flex', marginTop: 20 }}>
                        <div className="form-group" style={{ width: 250 }}>
                            <label style={{ marginLeft: 20 }}>펀드 이름</label>
                            <li>
                                <div class="btn btn-outline-secondary" style={{ width: 250 }}>
                                    이름
                        </div>
                            </li>
                        </div>
                        <div className="form-group" style={{ marginLeft: 30, width: 150 }}>
                            <label style={{ marginLeft: 20 }}>신탁사</label>
                            <li>
                                <div class="btn btn-outline-secondary" style={{ width: 250 }}>
                                    이름
                        </div>
                            </li>
                        </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div className="form-group" style={{ width: 250 }}>
                            <label style={{ marginLeft: 20 }}>펀드 매니저</label>
                            <li>
                                <div class="btn btn-outline-secondary" style={{ width: 250 }}>
                                    이름
                        </div>
                            </li>

                        </div>
                        <div className="form-group" style={{ width: 180, marginLeft: 30 }}>
                            <label style={{ marginLeft: 20 }}>펀드 종류</label>
                            <li>
                                <div class="btn btn-outline-secondary" style={{ width: 250 }}>
                                    이름
                        </div>
                            </li>

                        </div>
                    </div>

                    <div style={{ display: 'flex' }}>
                        <div className="form-group" style={{ width: 250 }}>
                            <label style={{ marginLeft: 20 }}>시작일</label>
                            <li>
                                <div class="btn btn-outline-secondary" style={{ width: 250 }}>
                                    이름
                        </div>
                            </li>
                        </div>
                        <div className="form-group" style={{ width: 250, marginLeft: 30 }}>
                            <label style={{ marginLeft: 20 }}>마감일</label>
                            <li>
                                <div class="btn btn-outline-secondary" style={{ width: 250 }}>
                                    이름
                        </div>
                            </li>
                        </div>
                    </div>

                    <div style={{ display: 'flex' }}>
                        <div style={{ marginBottom: 15, width: 250 }} >
                            <label style={{ marginLeft: 20 }}>운용 금액</label>
                            <li>
                                <div class="btn btn-outline-secondary" style={{ width: 230 }}>
                                    이름
                        </div>
                            </li>
                        </div>
                        <div style={{ marginTop: 40, marginLeft: 5 }}>
                            원
                    </div>
                        <div className="form-group" style={{ width: 180, marginLeft: 10 }}>
                            <label style={{ marginLeft: 20 }}>투자자 잔고</label>
                            <li>
                                <div class="btn btn-outline-secondary" style={{ width: 230 }}>
                                    이름
                        </div>
                            </li>
                        </div>
                        <div style={{ marginTop: 40, marginLeft: 75 }}>
                            원
                    </div>

                    </div>

                    <div>
                        <label style={{ marginLeft: 40, color: 'red', fontWeight: 'bold' }}>투자 금액</label>
                        <div className="form-group" style={{ display: 'flex', width: 180, marginLeft: 30 }}>
                            <input style={{ borderColor: "red" }} style={{ width: 400 }} className="form-control" />
                            <div style={{ marginTop: 5 }}>
                                원
                        </div>
                        </div>

                    </div>
                    <p className="forgot-password text-right">
                        <a href="#"> 약관 확인</a>
                    </p>
                    <p className="forgot-password text-right">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" checked={true} />
                        <label className="custom-control-label" htmlFor="customCheck1">약관 동의</label>
                    </p>
                    <button type="submit" onClick={this.handleSubmit} className="btn btn-primary btn-block" >펀딩 하기</button>
                </form>
            </div>
        );
    }
}

export default Funding;