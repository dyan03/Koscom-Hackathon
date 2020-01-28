import React from 'react';
import './popup.css';

// class Popup extends React.Component {  
//     render() {  
//   return (  
//   <div className='popup'>  
//   <div className='popup\_inner'>  
//   <h1>{this.props.text}</h1>  
//   <button onClick={this.props.closePopup}>close me</button>  
//   </div>  
//   </div>  
//   );  
//   }  
//   }  
  

 function Popup(){  
  return (  
<div class="modal fade" id="Popup" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
  )  
  }  
  
  export default Popup;