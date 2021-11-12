import React, { Component } from "react";
import { render } from "react-dom";
import { ReactSVG } from "react-svg";
import {withRouter} from "react-router-dom";
import { Link } from "react-router-dom";
import $ from 'jquery';
import { connect } from 'react-redux';
import { isMobile } from "react-device-detect";


class Sidebar extends Component {

  constructor(props) {  
    super(props);
    isMobile ? 

    this.state = {
      sidebar : false ,
      destek : true 
    }
     :  this.state = {
      sidebar : localStorage.getItem("sidebar") ,
      destek : true 
    }
   
    this.sidebarChange = this.sidebarChange.bind(this);
    this.sidebarClose = this.sidebarClose.bind(this);
    this.CanliDestek = this.CanliDestek.bind(this);
    
    
 

  }


  sidebarChange() {
    console.log("buuu",localStorage.getItem("sidebar"));
    this.setState({
      sidebar: localStorage.getItem("sidebar") === "true"  ? "false" : "true" 
    });
   


    
}
CanliDestek() {

  InfosetChat('boot',{widget:{apiKey:'kZWyh9GLUXNlw7A5G3BshLGVvYMGwxbi3E917TtA'}});
  !this.state.destek ? InfosetChat('shutdown') : InfosetChat('hide')   ; InfosetChat('show')   ; 



  this.setState({
    destek: !this.state.destek ? true : false 
  });
  console.log(this.state.destek);


  
}
sidebarClose() {
  console.log("Kapat");
  this.setState({
    sidebar: "true"
  });
 
}

  componentDidMount(props) {
 
    const { sidebarChange } = this;
   
   

    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        sidebarChange();
        //  $('#sidebar').toggleClass('active');
      });
  
      $('body').on("click", ".dropdown-menu", function (e) {
        $(this).parent().is(".open") && e.stopPropagation();
    });
      
  });
  
  }
  componentDidUpdate(props)  {

    console.log(localStorage.getItem("sidebar"));
 
    const { sidebarChange } = this;
   
   

    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        sidebarChange();
        //  $('#sidebar').toggleClass('active');
      });
      $('body').on("click", ".dropdown-menu", function (e) {
        $(this).parent().is(".open") && e.stopPropagation();
    });
  });
  
  
  }


    render() {
      const { user , provider } = this.props;

    
        return (<nav id="sidebar" className={this.state.sidebar == 'false' ? 'active' : '' } >
        <div className="sidebar-header">
         
          <ReactSVG src="assets/img/logo.svg" className="desktop_logo" />
          <ReactSVG src="assets/img/svg/iconlogo.svg" className="mobile_logo" />
          <ReactSVG src="assets/img/closed.svg" className="closed_menu"  onClick={this.sidebarClose} />
        </div>
        <ul className="list-unstyled components">
          <li className={this.props.match.path == '/' ? 'active' : '' }   >
          <Link  to="/" >
         
              <ReactSVG src="./assets/img/svg/home.svg" />
              <span> Anasayfa</span>

            </Link>
          </li>
    
          <li className={this.props.match.path == '/newsale' || this.props.match.path ==  '/products/:product'  || this.props.match.path ==  '/form/:id'   ? 'active' : '' } >
            <Link to="/newsale">
              <ReactSVG src="./assets/img/svg/yeni-satis.svg" />
              <span> Yeni Satış</span>
            </Link>
          </li>
          <li  className={this.props.match.path == '/sigorta-islemleri' ? 'active' : '' } >
            <Link  to="/sigorta-islemleri">
            <ReactSVG className="sigorta_icon" src="./assets/img/icons/sigorta-islemleri.svg" />
              <span> Sigorta Satışı </span>
            </Link>
          </li>
     
          <li className={this.props.match.path == '/sales/:id' ? 'active' : '' }>
            <Link  to="/sales/0"  >
              <ReactSVG src="./assets/img/svg/satislarim.svg" />
              <span> Satışlarım </span>
            </Link>
          </li>

          <li className={this.props.match.path == '/reports' ? 'active' : '' }>
            <Link  to="/reports"  >
              <ReactSVG src="./assets/img/svg/satislarim.svg" />
              <span> Satış Raporları </span>
            </Link>
          </li>
      
          {user.user_type == 1 ? 
          <li className={this.props.match.path == '/members' ? 'active' : '' }>
            <Link  to="/members"  >
              <ReactSVG src="./assets/img/icons/personel.svg" />
              <span> Kullanıcılar </span>
            </Link>
          </li>
     : '' } 

{isMobile ? 
          <li className={this.props.match.path == '/members' ? 'active' : '' }>
            <Link  to="/altyapi/turktelekom"  >
              <ReactSVG src="./assets/img/icons/personel.svg" />
              <span>Altyapı Sorgulama</span>
            </Link>
          </li>
     : '' } 



    <li className={this.props.match.path == '/kurye-bolgeleri' ? 'active' : '' }>
            <Link  to="/kurye-bolgeleri"  >
              <ReactSVG src="./assets/img/svg/satislarim.svg" />
              <span> Kurye Bölgeleri </span>
            </Link>
          </li>

          
     
        
        </ul> 
        <button  onClick={this.CanliDestek} className="chatbutton">
        <ReactSVG  className="destek_icon"  src="assets/img/cs.svg" />
          <span>CANLI DESTEK</span></button>
      </nav> 
      )
    }
}

function mapState(state) {
  const { search, authentication } = state;
  const { user } = authentication;
  return { user , search};
}

const actionCreators = {}

const connectedSidebar = connect(mapState, actionCreators)(Sidebar);


export default withRouter(connectedSidebar);
