import React from 'react'
import Grid from '@material-ui/core/Grid';

import MyCard from '../../templates/MyCard/index'

const Item = [
  {
    nameOfTrust: "SHINHAN",
    nameOfFund: "사모펀드1호",
    nameOfFM: "이준형",
    target: "30억원",
    current: "20억원"
  },
  {
    nameOfTrust: "HANA",
    nameOfFund: "사모펀드2호",
    nameOfFM: "홍성준",
    target: "30억원",
    current: "20억원"
  },
  {
    nameOfTrust: "WOORI",
    nameOfFund: "사모펀드3호",
    nameOfFM: "김도연",
    target: "30억원",
    current: "20억원"
  },
  {
    nameOfTrust: "KB",
    nameOfFund: "사모펀드4호",
    nameOfFM: "안대영",
    target: "30억원",
    current: "20억원"
  },
  {
    nameOfTrust: "KB",
    nameOfFund: "사모펀드4호",
    nameOfFM: "안대영",
    target: "30억원",
    current: "20억원"
  },{
    nameOfTrust: "KB",
    nameOfFund: "사모펀드4호",
    nameOfFM: "안대영",
    target: "30억원",
    current: "20억원"
  },{
    nameOfTrust: "KB",
    nameOfFund: "사모펀드4호",
    nameOfFM: "안대영",
    target: "30억원",
    current: "20억원"
  },

]

function Main(props){
    return(

        <div>
        <div style={{margin: '10px',}}>
        {Item.map(I => {
          return (
              <div style={{margin: '20px'}}>
                {<MyCard style={{alignItems:'center',margin: '10px'}} nameOfTrust={I.nameOfTrust} nameOfFund={I.nameOfFund} nameOfFM={I.nameOfFM} target={I.target} current={I.current}/>}
              </div>
          )
          })}
          
          </div>
        
      </div>
    )

}

export default Main