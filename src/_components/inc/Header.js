import React, { Component } from "react";
import { render } from "react-dom";
import { ReactSVG } from "react-svg";
import {withRouter,Link} from "react-router-dom";
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import { CommonLoading   } from 'react-loadingg';
import Mousewheel from 'jquery-mousewheel';
import 'dayjs/locale/tr';
import dayjs from 'dayjs';
import mCustomScrollbar from 'malihu-custom-scrollbar-plugin';
import $ from 'jquery';
import InputMask from 'react-input-mask';
import { userService } from '../../_services/user.service';

class Button extends React.Component {

  condition() {
    if (headsOrTails()) {
      alert ('Going Out!');
    } else {
      alert ('ChillZone');
    }
  }

  render() {
    return (
      <button className="button" onClick={this.condition}>
        WHAT SHOULD WE DO TONIGHT?
      </button>
    );
  }
}

class Header extends Component {


  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);

    this.state = {
      profile: {avatar : '' ,fullname :'' },
      title : props.title,
      lasttitle : props.lasttitle,
      icon : props.icon,
      provider : props.provider,
      search : '',
      searchType : 'name',
      promise :'', 
      ilid :  '', 
      citys : [],
      bolgesonuc : '',
      ilceler : []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeType = this.changeType.bind(this);
    this.setSearch = this.setSearch.bind(this);
    this.getilce = this.getilce.bind(this);
    this.getBolge = this.getBolge.bind(this);

    
    userService.profile().then(result =>
      {
          if(!result.success)
          {
            window.location.href = "/logout";
          }

      });

    userService.dynamicService("allCitys").then(result =>
      {
        this.setState({
          citys: result
  })
      }
     
    );

  }
 




  componentDidUpdate(prevProps) {

    if (prevProps.match.params !== this.props.match.params) {

      $(window).scrollTop(0);

    }
  }

  componentDidMount() {


    $(".h150-scroll").mCustomScrollbar({
      theme:"rounded-dots",
      scrollInertia:300,
      live:true,
      setHeight: 300,  
                scrollButtons:{enable:true},
    });

}

componentWillReceiveProps(nextProps) {
  const newName = nextProps.search;
  if (this.props.search !== newName) {
    setTimeout(() => {
    $(".h150-scroll").mCustomScrollbar({
      theme:"rounded-dots",
      scrollInertia:300,
      live:true,
      setHeight: 300,  
                scrollButtons:{enable:true},
    });
  
  }
    , 10);
    

   

  }
}

changeType(e) {

    const { name, value } = e.target;
    this.setState({ searchType : value  , search : ''});
  
}

setSearch(e) {

  console.log(e);
  this.setState({ search : e });

}


getilce(e) {
  const { name, value } = e.target;

  userService.dynamicService("ilceGet/"+value).then(result =>
    {
      this.setState({
        ilceler: result , 
        ilid : ""
  })
    }
   
  );

}

getBolge(e) {
  const { name, value } = e.target;
  this.setState({ 
    ilid : value
})
  userService.dynamicService("kargoKurye/"+value).then(result =>
    {
      this.setState({
        bolgesonuc: result })
    }
   
  );

}





  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
            search: value
    }),
    this.handleSubmit();
}


handleSubmit() {
    this.setState({ submitted: true });
    if (this.state.search) {
      
      if (this.state.promise) clearTimeout(this.state.promise);

      this.state.promise = setTimeout(() => this.props.search_customer(this.state.search , this.state.searchType), 300);

      
    }
}

sidebarChange() {

 
  if(localStorage.getItem('sidebar') === null)
  {
    localStorage.setItem("sidebar", false);
  }
 else 
 {
  localStorage.setItem("sidebar", localStorage.getItem("sidebar") == "true"  ? false : true );

 }

};


      handleLogout() {
        
        this.props.history.push('/login');
      }

    render() {

      $("#didyou").on("click" , function(){
        alert("deneme");
      });
      const { user , provider } = this.props;
        return ( <nav className="navbar navbar-default">
          <div className="mobile_header">
          <ReactSVG src="assets/img/logo.svg" className="heaader_logo" />

          <ul className="nav navbar-nav navbar-right">
             
         
              <li className="dropdown profileDropdown">
                <a
                  href="#"
                  className="dropdown-toggle"
                  href="#"
                  role="button"
                  id="profileMenu"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                 <img src={user.userdata.ava ? user.userdata.ava : './assets/img/avatar.svg' } className="avatar" />
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="profileMenu"
                >


<a className="dropdown-item profile-name" href="#">
                  
                   {user.userdata.fullname}
                  </a>
                  {user.user_type == 1 ? 
                  <Link className="dropdown-item" to="/members">
                    {" "}
                    <ReactSVG
                      src="./assets/img/svg/nokta.svg"
                      height="25px"
                    />{" "}
                   Kullanıcı İşlemleri
                  </Link>
                   : <></>}
                  <Link className="dropdown-item" to="/logout">
                    <ReactSVG
                      src="./assets/img/svg/nokta.svg"
                      height="25px"
                    />{" "}
                   Çıkış</Link>
                  
                </div>
              </li>
              
            </ul>
          </div>
        <div className="container-fluid">
          <div className="navbar-header">
            <ReactSVG
              src="./assets/img/svg/menu.svg"
              height="25px"
              className="menu_icon"
              onClick={this.sidebarChange}
              id="sidebarCollapse"
            />

            <ReactSVG src={this.state.icon} height="25px" />
            <ReactSVG src="./assets/img/svg/ayirac.svg" height="25px" />
            <div className="bread_title">{this.props.title}</div>
            {this.props.lasttitle ? <ReactSVG src="./assets/img/svg/ayirac.svg" height="25px" /> : '' }
            {this.props.lasttitle ?  <div className="bread_title">{this.props.lasttitle == 'undefined undefined' ?  '...' :  this.props.lasttitle  }</div> : '' }
          </div>
          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right">
              
            <li className="dropdown">
                <a href="#"     className="dropdown-toggle altyapi-sorgulama"
                  role="button"
                  id="search_div"
                  style={{height : "48px"}}
                  data-toggle="dropdown"
                  aria-haspopup="false"
                  aria-expanded="false">
                  {" "}
                
                            Kurye Bölge Sorgulama
                
                </a>
                <div
                  className="dropdown-menu search_div_menu"
                  aria-labelledby="search_div"
                  style={{zIndex : '999999999' , minHeight : '350px' }}
                >
             <div className="search_header" style={{alignItems : 'center'}}>
              
            <select className="form-control musteri_type" style={{height : '35px' , marginRight : '10px' }}   onChange={this.getilce}  >
            <option selected value="">İl Seçiniz</option>
                    {
                      this.state.citys.map((city, index) => {
                        return <option key={`city${index}`} value={city.id} >{city.name}</option>
                      })
                    }
            
            </select>

            <select className="form-control musteri_type" name="ilid"
            value={this.state.ilid || ''}
            style={{height : '35px'}} defaultValue={this.state.ilid}  
            onChange={this.getBolge}  >
                  <option selected value="">İlçe Seçiniz </option>
                    {
                      this.state.ilceler.map((city, index) => {
                        return <option key={`city${index}`} value={city.id} >{city.name}</option>
                      })
                    }
            
            </select>
             
             </div>
              
             {this.props.search.search_loading ?  <div className="overlay_load"> <CommonLoading color="#38d8ee" speed="1.2" /></div> : <></>  }
             {this.state.bolgesonuc.success ? 
              <div className="search_result">
                          <div  className={this.state.bolgesonuc.type == 'kargo' ? 'kargo_bolge' : 'kurye_bolge' }>
                          {this.state.bolgesonuc.type == 'kurye' ? 
                            <ReactSVG
                            className="kargo_icon"
                        src="./assets/img/svg/kurye.svg"
                        height="25px"
                      /> : 
                  <ReactSVG
                          className="kargo_icon"
                      src="./assets/img/svg/kargo.svg"
                      height="25px"
                    />
                        }
                        



                          <div>
                            Seçtiğiniz Bölge <b> {this.state.bolgesonuc.type == 'kurye' ? 'Kurye' : 'Kargo' }  </b> Bölgesidir
                            </div>
                            </div>
             

                </div> : <></>}  

                </div>
              </li>
              
              <li className="dropdown">
                <a
                  href="#"
                  className="altyapi-sorgulama dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {" "}
                  Altyapı Sorgulama
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
              
                  <Link to="/altyapi/turktelekom"  className={provider == 'turktelekom' ? 'dropdown-item active' : 'dropdown-item' } >
                    {" "}
                    <ReactSVG
                      src="./assets/img/svg/nokta.svg"
                      height="25px"
                    />{" "}
                    Türk Telekom Altyapı
                  </Link>

                  
                  <Link className="dropdown-item"  to="/altyapi/superonline" >
                    {" "}
                    <ReactSVG
                      src="./assets/img/svg/nokta.svg"
                      height="25px"
                    />{" "}
                    Superonline Altyapı
                  </Link>
                 
                </div>
              </li>
              <li className="dropdown">
                <a
                  href="#"
                  className="hizli-islemler dropdown-toggle"
                  href="#"
                  role="button"
                  id="hizliislemler"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {" "}
                  Karaliste Sorgulama
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="hizliislemler"
                >
                
                  <a className="dropdown-item" href="https://onlineislemler.turktelekom.com.tr/borc-alacak-sorgulama/mobil" target="_blank">
                    {" "}
                    <ReactSVG
                      src="./assets/img/svg/nokta.svg"
                      height="25px"
                    />{" "}
                    Türk Telekom Karaliste
                  </a>
               
                  <a className="dropdown-item" href="https://www.turkcell.com.tr/" target="_blank">
                    {" "}
                    <ReactSVG
                      src="./assets/img/svg/nokta.svg"
                      height="25px"
                    />{" "}
                    Turkcell Fatura 
                  </a>
                  <a className="dropdown-item" href="https://online.vodafone.com.tr/yanimda/#/giris" target="_blank">
                    {" "}
                    <ReactSVG
                      src="./assets/img/svg/nokta.svg"
                      height="25px"
                    />{" "}
                       Vodafone Fatura
                  </a>
               
                </div>
              </li>
              <li className="dropdown searchdropdown">
                <a href="#"     className="dropdown-toggle search-dropdown"
                  role="button"
                  id="search_div"
                  data-toggle="dropdown"
                  aria-haspopup="false"
                  aria-expanded="false">
                  {" "}
                  <ReactSVG src="./assets/img/svg/search.svg" height="25px" />
                </a>
                <div
                  className="dropdown-menu search_div_menu"
                  aria-labelledby="search_div"
                >
             <div className="search_header" style={{alignItems : 'center'}}>
               <div className="search_title" style={{height : '35px' , lineHeight : '35px'}}>Müşteri Arayın</div>
            <select className="form-control musteri_type" style={{height : '35px'}} defaultValue={this.state.searchType}  onChange={this.changeType}  >
              <option value="name">İsim Soyisim İle</option>
              <option value="tckimlik" >Tc Kimlik İle</option>
                <option  value="gecisno">Geçiş No İle</option>
                <option  value="basvuru_no">Başvuru No İle</option>
                
            
            </select>


             
             </div>
             <div className="search_input">
             {this.state.searchType == 'name'   && 
               <input className="form-control" type="text" placeholder="İsim Soyisim" name="search" defaultValue={this.state.search} onChange={this.handleChange} />
               }
                 {this.state.searchType == 'basvuru_no'   && 
               <input className="form-control" type="text" placeholder="Başvuru Numarası" name="search" defaultValue={this.state.search} onChange={this.handleChange} />
               }

{this.state.searchType == 'tckimlik'   && 
               <InputMask
               type="tel"
               onChange={this.handleChange}
               mask="99999999999" maskChar=" "
               defaultValue={this.state.search}
               className={'form-control'} placeholder="Tc Kimlik No" />
              
              }

{this.state.searchType == 'gecisno'   && 
               <InputMask
               type="tel"
               onChange={this.handleChange}
               mask="+\90\ 999 999 99 99" maskChar=" "
               defaultValue={this.state.search}
               className={'form-control'} placeholder="Geçiş Numarası" />
              
              }

               
             </div>
           
             {this.props.search.search_loading ?  <div className="overlay_load"> <CommonLoading color="#38d8ee" speed="1.2" /></div> : <></>  }
              <div className="search_result">
                          
                { this.props.search.data ?
                <div >
                       <div className={  this.props.search.count > 0  ? 'search_result_title' : 'hide'}>
                  Arama Sonuçları 
                </div>
                {this.props.search.count > 0  ? 
              <div className="search_result_list h150-scroll ">
                <ul className="s_list ">
                  
                    {this.props.search.data.map((r, index) => (                    
                      <li key={index}>
                      <Link to={'/detail/'+r.token}>
                        <div className="s_name">
                          <div>{r.fullname}</div>
                          <div className="s_brand">{r.brand}</div>
                          <span>{r.customer_data.gecisno}</span>
                          </div>
                          
                        <div className="s_date">
                          <span> {dayjs(r.created_date).locale('tr').format('DD.MM.YYYY')}</span>
                          {r.customer_data.mobilephone ? 
                          <span><div className="slb">İletişim Telefonu :</div><div>{r.customer_data.mobilephone}</div></span>
                            : <></>}
                          </div>
                        <div className="s_status">{r.status_name}</div>
                      </Link>
                    </li>


                       ))} 
                         
                </ul>
              </div>
     : this.props.search.did.success ?  
      (
     <div className="didyou hide">bunu mu demek istediniz?
      <button 
      key={"didyou"}
      id="didyou"
      onClick={() => { console.log("button clicked");}}   
      >{this.props.search.did.did}</button>
     </div>)
                            : <></>
    }
              {this.props.search.count === 0  ?  <div className="no_search_result"> Aramanızla Uyuşan Bir Kayıt Bulunamadı </div> : <></>}
              </div>
              :  <></>} 

                </div>   

                </div>
              </li>
            
              
              <li style={{display : 'none'}}>
                <a href="#">
                  {" "}
                  <ReactSVG src="./assets/img/svg/mail.svg" height="25px" />
                </a>
              </li>
              <li style={{display : 'none'}}>
                <a href="#">
                  {" "}
                  <ReactSVG 
                    src="./assets/img/svg/natification.svg"
                    height="25px"
                  />
                </a>
              </li>
              <li className="dropdown profileDropdown">
                <a
                  href="#"
                  className="dropdown-toggle"
                  href="#"
                  role="button"
                  id="profileMenu"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                 <img src={user.userdata.ava ? user.userdata.ava : './assets/img/avatar.svg' } className="avatar" />
                </a>
                <div 
                  className="dropdown-menu"
                  aria-labelledby="profileMenu"
                >


<a className="dropdown-item profile-name" href="#">
                  
                   {user.userdata.fullname}
                  </a>
                  {user.user_type == 1 ? 
                  <Link className="dropdown-item" to="/members">
                    {" "}
                    <ReactSVG
                      src="./assets/img/svg/nokta.svg"
                      height="25px"
                    />{" "}
                   Kullanıcı İşlemleri
                  </Link> : '' }
                  <Link className="dropdown-item" to="/logout">
                    <ReactSVG
                      src="./assets/img/svg/nokta.svg"
                      height="25px"
                    />{" "}
                   Çıkış</Link>
                  
                </div>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>  

      )
    }
}

function mapState(state) {
  console.log("state",state);
  const { search, authentication } = state;
  const { user } = authentication;
  return { user , search};
}


const actionCreators = {
  search_customer : userActions.search
}

const connectedHeader = connect(mapState, actionCreators)(Header);


export default withRouter(connectedHeader);

