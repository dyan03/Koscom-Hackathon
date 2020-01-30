import React ,{useState} from 'react'
import styles from './styles.css'

function MyCard(props) {

    const [fundId,setFundId]=useState();
    const [companyId,setCompanyId]=useState();
    const [managerId,setManagerId]=useState();
    const [totalAmount,setTotalAmount]=useState();
    const [startDate,setStartDate]=useState();
    const [endDate,setEndDate]=useState();
    const [fundStyle,setFundStyle]=useState();
    const [morningstaType,setMorningstaType]=useState();
    
    var fundId_="신한"

    // setFundId("신한")

    return (
        <div class="card text" style={{width: 700, height: 200, float: 'left', margin :'10px'}}>
            <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs">
                  <h5 class="card-title">[{companyId}] {fundId_}</h5>

                </ul>
            </div>
            <div style={{display: 'flex'}}>
            <div class="card-body" >
                <p class={styles.cardList} >Fund Manager {props.nameOfFM}</p>
                <p class={styles.cardList} style={{color: 'red'}} > 목표 금액 {props.target}</p>
                <p class={styles.cardList} > 현재 금액 {props.current}</p>
            </div>
            <div  class="card-body" style={{textAlign: 'right'}} >
                    <a href="#" class="btn btn-primary"  >펀딩</a>
            </div>
            </div>
        </div>
    )
}

export default MyCard