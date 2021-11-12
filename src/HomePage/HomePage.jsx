
import React, { Component } from "react";
import { ReactSVG } from "react-svg";
import { connect } from 'react-redux';
import { userService } from '../_services/user.service';
import { userActions } from '../_actions';
import { Link } from 'react-router-dom';

import LoadingOverlay from 'react-loading-overlay';
import { Button, Spinner , Modal } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';



class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        customer: {customer_data : {} , campaing : {propertys : []}}
    };


}


render() {
  const interval = 500;
  window.onload = function () { 
    document.body.style.overflowY = "hidden";
    document.body.style.overflowX = "hidden";
}
  function generateLocks() {
    const lock = document.createElement('div'),
          position = generatePosition();
    lock.innerHTML = '<div class="top"></div><div class="bottom"></div>';
    lock.style.top = position[0];
    lock.style.left = position[1];
    lock.classList = 'lock'// generated';

    
    document.body.appendChild(lock);
    setTimeout(()=>{
      lock.style.opacity = '1';
      lock.classList.add('generated');
    },100);
    setTimeout(()=>{
      lock.parentElement.removeChild(lock);
    }, 2000);
  }
  function generatePosition() {
    const x = Math.round((Math.random() * 100) - 10) + '%';
    const y = Math.round(Math.random() * 100) + '%';
    return [x,y];
  }
  setInterval(generateLocks,interval);
  generateLocks();
  return (
<div className="errpg">
<div className="errorpage container">
  <h1>4<div className="lock"><div className="top"></div><div className="bottom"></div>
    </div>3</h1><p>Bu Sayfaya Erişim İzniniz Bulunmamaktadır.</p>
</div>
</div>
   
  );
}

}

function mapState(state) {
  const { homepage, users, authentication } = state;
  const { user } = authentication;
  return { user, users, homepage };
}

const actionCreators = {
  homepage: userActions.homepage
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };