
import React, { Component } from "react";
import { ReactSVG } from "react-svg";
import { connect } from 'react-redux';
import { userService } from './_services/user.service';
import { userActions } from './_actions';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import { Button, Spinner , Modal } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Dropzone from "./_services/Dropzone";
import dayjs from 'dayjs';
import Moment from 'moment';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
class Detay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        customer: {customer_data : {} , campaing : {propertys : []}},
        citys : [],
        dist : [],
        bekle : true ,
        docTypes : [],
        show : false ,
        rows: 2,
        minRows: 5,
        maxRows: 10,
        form : {cargo_address : '' , teyit_il : '' ,  teyit_ilce : '' ,  teyit_not : '' , kvkk : 1 , teyit  : 1 }
    };
    this.devamEt = this.devamEt.bind(this);
    this.getDist = this.getDist.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  
    this.setInput = this.setInput.bind(this);
    this.setCheckbox = this.setCheckbox.bind(this);
    
    this.myRef = React.createRef();

    userService.docTypes().then(result =>
      this.setState({
        docTypes: result,
      })
    );

}

checkboxChange(checked) {
    if (checked == false) { checked = true } else { checked = false }
    this.setState({ show_ticket_form: checked });
  }

  setInput(event) {
   const formas = this.state.form ;
   formas[event.target.name] = event.target.value ;
    this.setState({ formas});
  }


  setCheckbox(event) {
   const formas = this.state.form ;
   formas[event.target.name] =  formas[event.target.name] ? 0 : 1  ;
    this.setState({ formas});
  }




devamEt() {

    const  {token} = this.props.match.params ;

  this.setState({ onayla: true });

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(this.state.form)
};

const uyari  = (type,message,title ) => { 
    store.addNotification({
        title: title,
        message: message,
        type: type,                         // 'default', 'success', 'info', 'warning'
        container: 'top-center',                // where to position the notifications
        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
        dismiss: {
          duration: 3000
        }
      });
    };


fetch('https://backend.abonesepeti.com/api/updateConfirm/'+token, requestOptions)
    .then(response => response.json())
    .then(data =>{
        if(!data.success)
        {
            uyari("warning",data.message,"Hata Oluştu");
        }
        else 
        {
            uyari("success",data.message,"İşlem Başarılı");

            const  {token} = this.props.match.params ;
            console.log(token);
            fetch('https://backend.abonesepeti.com/api/Csinfo/'+token)
                .then(response => response.json())
                .then(data => {
                    if(!data.success)
              {
               
                window.location.href = '/'; 
        
              }
              else 
              {
            
        
                  const formum = this.state.form ;
                  formum.cargo_address = data.cargo_address ;
                  formum.teyit_il = data.cityId ;
                  formum.teyit_ilce = data.districtId ;
        
        
                  this.setState({ formum});
                this.setState({ customer: data , bekle : false });
        
               
              }
                 
        
              
              });
        
                fetch('https://backend.abonesepeti.com/api/allCitys')
                .then(response => response.json())
                .then(data => this.setState({ citys: data }));
        


        }
          this.setState({ onayla: false });
    });




}

teyit = () => {
  confirmAlert({
    title: 'Aranma Onayı',
    message: 'Müşteri temsilcilerimiz  0212 809 00 00 numaralı telefondan arayarak teyit alınacaktır, devam etmek istediğinize emin misiniz?',
    buttons: [
    
      {
        label: 'Hayır',
        onClick: () => {console.log("Hayır");}
      },
      {
        label: 'Evet, Arasın',
        onClick: () => {console.log("Evet");}
      },
    ]
  });
};


handleClose() {
       this.setState({show : false});
}
handleOpen() {
  this.setState({show : true});
}

getDist(e) {
 
  const states = this.state.form ;
  states.teyit_il = e ;
  states.teyit_ilce = "" ;
       this.setState({states});


  fetch('https://backend.abonesepeti.com/api/CityNameDistrictsGet/'+this.state.form.teyit_il)
  .then(response => response.json())
  .then(data =>  this.setState({ dist: data }));
  
}


callback() {
  const  {token} = this.props.match.params ;
  fetch('https://backend.abonesepeti.com/api/Csinfo/'+token)
      .then(response => response.json())
      .then(data => {
          if(!data.success)
    {
     
      window.location.href = '/'; 

    }
    else 
    {
         const formum = this.state.form ;
        formum.cargo_address = data.cargo_address ;
        formum.teyit_il = data.cityId ;
        formum.teyit_ilce = data.districtId ;
        this.setState({ formum});
      this.setState({ customer: data , bekle : false });

      
    }
       

    
    });
}
componentDidMount() {
 
    const  {token} = this.props.match.params ;
    fetch('https://backend.abonesepeti.com/api/Csinfo/'+token)
        .then(response => response.json())
        .then(data => {
            if(!data.success)
      {
       
        window.location.href = '/'; 

      }
      else 
      {
           const formum = this.state.form ;
          formum.cargo_address = data.cargo_address ;
          formum.teyit_il = data.cityId ;
          formum.teyit_ilce = data.districtId ;
          this.setState({ formum});
        this.setState({ customer: data , bekle : false });

        
      }
         

      
      });

        fetch('https://backend.abonesepeti.com/api/allCitys')
        .then(response => response.json())
        .then(data => this.setState({ citys: data }));



}


render() {

  const {customer , form} = this.state ;
  let currentValue = form.teyit_il ;
  let distValue = form.teyit_ilce ;

  const  {token} = this.props.match.params ;


 

  return (
    <LoadingOverlay
      className="overlay"
      active={this.state.bekle}
      spinner
      text="Lütfen Bekleyiniz..."
    >
      {" "}
      {!this.state.bekle ? (
        customer.teyit != 1 ? (
          <Redirect to={"/teyit/"+token} />
        ) : (
          <div className="container pt-3">
            <div className="row">
             
            <div className="col-lg-2 gizle">
          <div className="steps">
            <div className="step">
              <div className="step_content">
                <div>
                  <img src="/assets/img/onay.svg" />
                </div>
                <div>
                  BAŞVURU ONAYI
            
                </div>
              </div>
              <div className="step_ok">
                <img src="/assets/img/ok_active.svg" />
              </div>
            </div>
          
          <div className="step ">
            <div className="step_content">
              <div>
              <ReactSVG src="/assets/img/document.svg?v=1" height="27px" className="active_icon" />
           
              </div>
              <div>
                EVRAK YÜKLEME
              </div>
            </div>
            <div className="step_ok">
                
              <img src="/assets/img/ok_active.svg" />
            </div>
          </div>
          <div className="step passive">
            <div className="step_content">
              <div>
                <img src="/assets/img/gift.svg" />
              </div>
              <div>
                AVANTAJLAR
                DÜNYASI
              </div>
            </div>
          </div> 
          </div>


        </div>



              <div className="col-lg-10">
                <div className="row">
                  <div className="col-lg-8">
      


                    <div className="customer_info">
                      <h3>
                        Sayın {customer.firstname + " " + customer.lastname};
                      </h3>
                      <p>
                     <b>{customer.productname}</b> kampanyası için <b> {dayjs(customer.teyit_tarihi).format('DD/MM/YYYY HH:mm')}</b> tarihinde  <b>{customer.ip_adress} </b> 
                     ip adresi ile başvuruya onay verdiniz.
                      </p>
                    </div>
  

                    <div className={customer.classname + '_step customer_info' }  style={{marginTop: '15px' , padding : '30px' , paddingBottom : '70px'}}>
     <ProgressBar
     
        percent={customer.step}
        filledBackground={!customer.classname ? "linear-gradient(to right, #7ea6c8, #003462)" : ''}
      >
        <Step transition="scale">
          {({ accomplished }) => (
              <div className={'step_musteri '+customer.classname  } >
                    <ReactSVG
                           
                          src="/assets/img/form.svg"
                          width="30"
                        />
                
           
            <div className="step_tit hide">Başvuru Yapıldı</div>
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
              <div className={customer.step > 49 ? 'step_musteri '+customer.classname : 'step_musteri passive'  }>
                  <ReactSVG
                         
                          src="/assets/img/document.svg"
                          width="30"
                        />
                        {customer.step == 50  ? 
              <div className="step_tit step_c">{customer.statusname}</div>
               : <></>}
              </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
             <div className={customer.step == 100 ? 'step_musteri '+customer.classname : 'step_musteri passive'  } >
               <ReactSVG
                           
                          src="/assets/img/onay.svg"
                          width="30"
                        />
                              {customer.step == 100  ? 
              <div className={"step_tit step_r " + customer.classname }>{customer.statusname}</div>
               : <></>}
             
             </div>
          )}
        </Step>
      </ProgressBar>
                    </div>

                    {customer.step != 100 ? 
                    <div className="row mt-3">
                 
                      <div className="col-lg-8 t15">
                        <div className="customer_info">
                        <div className="customer_info_placeholder evrakbaslik">
                             EVRAK YÜKLEME
                            </div>
                        <Dropzone
                            types={this.state.docTypes}
                            token={this.props.match.params.token}
                            callback={(data) => this.callback()}

                          />
                        </div>
                      </div>
                   
                    </div> : <></>}
              
                  </div>
                  <div className="col-lg-4">
                  {customer.gonderiler && customer.gonderiler.length > 0 ?     
                  <div className="customer_info" style={{marginBottom : '15px'}}>

                  {  customer.gonderiler.map((log, index) => {
          return <div className="islem kurye_log" key={`gonderi${index}`}>
           
              {log.kargo == 'surat' ?

              <div className="kargo_takip">
              <div className="k_takip">
              <ReactSVG

              src="/assets/img/suratlogo.svg"
              />
              <a className="kargo_button" target="_blank" href={"https://suratkargo.com.tr/KargoTakip/?kargotakipno="+log.takip_no}>TAKİP ET</a>
              </div>

              <div className="takipno">
                  <div className="takipno_baslik">
                      Kargo Takip Numarası
                  </div>
                  
                  <div className="takipno_numara">
                  {log.takip_no}
                  </div>
              </div>
              </div>


              : 
              <div className="kargo_takip">
              <div className="k_takip">
              <ReactSVG

              src="/assets/img/pttkargo.svg"
              />
              <a className="kargo_button"  target="_blank" href={"https://gonderitakip.ptt.gov.tr/Track/Verify?q="+log.takip_no}>TAKİP ET</a>
              </div>

              <div className="takipno">
                  <div className="takipno_baslik">
                      Kargo Takip Numarası
                  </div>
                  
                  <div className="takipno_numara">
                  {log.takip_no}
                  </div>
              </div>
              </div>
        }


            </div>

        })}

                       

                  </div>
                   : <></>}
                  


                    <div className="kampanya_bilgi">
                      <div className="marka_icon text-center mt-5 mb-3">
                        <img src={customer.makeImage} />
                      </div>
                      <div className="k_name">{customer.productname}</div>
                      <div className="brand_product_propertys">
                        {customer.campaing.propertys.map((property, index) => {
                          return (
                            <div
                              key={`brand_product_ozellik${property.icon}`}
                              className="brand_product_ozellik"
                            >
                              <i className={property.icon + " product_icon "} />
                              <span className="brand_unit">
                                {property.value} <span> {property.unit}</span>
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="brand_price_div">
                        <div className="product_price">
                          <div className="price_tam">
                            {customer.campaing.price_sale}.
                          </div>
                          <div className="price_ondalik">
                            <div className="ondalik">
                              {customer.campaing.price_ext}
                            </div>
                            <div className="tl_simge">TL</div>
                          </div>
                        </div>
                      </div>
                      <div className="detay" onClick={this.handleOpen}>
                        Kampanya Detayı
                      </div>
                    </div>
                  </div>
                
                 
                </div>
              </div>
            </div>
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header>
                <Modal.Title>Kampanya Detayları</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div
                  dangerouslySetInnerHTML={{
                    __html: customer.campaing.details,
                  }}
                ></div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Kapat
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )
      ) : (
        <></>
      )}
    </LoadingOverlay>
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

const connectedHomePage = connect(mapState, actionCreators)(Detay);
export { connectedHomePage as Detay };