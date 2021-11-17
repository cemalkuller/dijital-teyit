
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
class Teyit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        customer: {customer_data : {} , campaing : {propertys : []}},
        citys : [],
        dist : [],
        bekle : true ,
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
    this.handleChangeTextarea = this.handleChangeTextarea.bind(this);
    this.handleChangeTextareaM = this.handleChangeTextareaM.bind(this);
    this.setInput = this.setInput.bind(this);
    this.setCheckbox = this.setCheckbox.bind(this);
    
    this.myRef = React.createRef();



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





handleChangeTextareaM = (event ) => {


  const textareaLineHeight = 24;
  const { minRows, maxRows } = this.state;
 
  const previousRows = event.current.rows;
  event.current.rows = minRows; // reset number of rows in textarea 
  
  const currentRows = ~~(event.current.scrollHeight / textareaLineHeight);
  
  if (currentRows === previousRows) {
    event.current.rows = currentRows;
  }
  
  if (currentRows >= maxRows) {
    event.current.rows = maxRows;
    event.current.scrollTop = event.current.scrollHeight;
  }
  const textaream = this.state.form ; 
  textaream.cargo_address = event.current.value ;
  this.setState({textaream});
  this.setState({
    rows: currentRows < maxRows ? currentRows : maxRows,
  });


};


handleChangeTextarea = (event ) => {

    const textareaLineHeight = 24;
    const { minRows, maxRows } = this.state;
   
    const previousRows = event.target.rows;
    event.target.rows = minRows; // reset number of rows in textarea 
    
    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);
    
    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }
    
    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }
    
    const textaream = this.state.form ; 
  textaream.cargo_address = event.target.value ;
  this.setState({textaream});
  this.setState({
    rows: currentRows < maxRows ? currentRows : maxRows,
  });


};


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
        
                fetch('https://backend.abonesepeti.com/api/CityNameDistrictsGet/'+this.state.customer.cityId)
                .then(response => response.json())
                .then(data => {
                  this.setState({ dist: data });
                  console.log(this.myRef.current);
                  this.handleChangeTextareaM(this.myRef);
                
                });
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



componentDidUpdate(prevProps) {

  console.log(prevProps);

  if (prevProps.location !== this.props.location) {
  
    
  }
}

componentDidMount() {
 
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

        fetch('https://backend.abonesepeti.com/api/CityNameDistrictsGet/'+this.state.customer.cityId)
        .then(response => response.json())
        .then(data => {
          this.setState({ dist: data });
          console.log(this.myRef.current);
          this.handleChangeTextareaM(this.myRef);
        
        });
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
        customer.teyit == 1 ? (
          <Redirect to={"/detay/"+token} />
      
        ) : (
          <div className="container pt-3">
            <div className="row">
              <div className="col-lg-2 gizle">
                <div className="steps">
                  <div className="step">
                    <div className="step_content">
                      <div>
                        <ReactSVG
                          src="/assets/img/onay.svg?v=1"
                          height="27px"
                          className="active_icon"
                        />
                      </div>
                      <div>BAŞVURU ONAYI</div>
                    </div>
                    <div className="step_ok">
                      <img src="/assets/img/ok_active.svg" />
                    </div>
                  </div>
                </div>
                <div className="step passive">
                  <div className="step_content">
                    <div>
                      <ReactSVG
                        src="/assets/img/document.svg?v=1"
                        height="27px"
                        className="active_icon"
                      />
                    </div>
                    <div>EVRAK YÜKLEME</div>
                  </div>
                  <div className="step_ok">
                    <img src="/assets/img/ok_passive.svg" />
                  </div>
                </div>
                <div className="step passive">
                  <div className="step_content">
                    <div>
                      <img src="/assets/img/gift.svg" />
                    </div>
                    <div>AVANTAJLAR DÜNYASI</div>
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
                        Başvurunuzun güvenli bir şekilde tamamlanması için
                        bilgilerinizi kontrol ederek onaylamanız gerekmektedir.
                      </p>
                    </div>
                    <div className="row mt-3">
                      <div className="col-lg-4 t15">
                        <div className="customer_info">
                          <div className="customer_info_placeholder">
                            Tc Kimlik Numarası
                          </div>
                          <div className="customer_info_value">
                            {customer.tckimlik}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 t15">
                        <div className="customer_info">
                          <div className="customer_info_placeholder">
                            İsim Soyisim
                          </div>
                          <div className="customer_info_value">
                            {customer.firstname} {customer.lastname}
                          </div>
                        </div>
                      </div>
                      {customer.customer_data.gecisno ? (
                        <div className="col-lg-4 t15">
                          <div className="customer_info">
                            <div className="customer_info_placeholder">
                              Geçiş Yapılacak Numara
                            </div>
                            <div className="customer_info_value">
                              {customer.customer_data.gecisno}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="row mt-3">
                      <div className="col-lg-8">
                        <div className="row">
                          <div className="col-lg-12 mb-3">
                            <div className="customer_info">
                              <div className="customer_info_placeholder mb-2">
                                Kargo / Kurye Adresi
                              </div>
                              <textarea
                                disabled={this.state.onayla}
                                className="form-control"
                                ref={this.myRef}
                                defaultValue={form.cargo_address}
                                rows={this.state.rows}
                                name="cargo_address"
                                onChange={(event) =>
                                  this.handleChangeTextarea(event)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 t15">
                            <div className="customer_info">
                              <div className="customer_info_placeholder">
                                İL {this.state.form.teyit_il}
                              </div>
                              <div className="customer_info_value">
                                <select
                                  className="form-control"
                                  disabled={this.state.onayla}
                                  onChange={(event) =>
                                    this.getDist(event.target.value)
                                  }
                                  defaultValue={
                                    currentValue ? currentValue : ""
                                  }
                                >
                                  <option value="">İl Seçiniz</option>

                                  {this.state.citys.map((city) => {
                                    return (
                                      <option key={`city${city.id}`}>
                                        {city.name}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 t15">
                            <div className="customer_info">
                              <div className="customer_info_placeholder">
                                İLÇE {this.state.form.teyit_ilce}
                              </div>
                              <div className="customer_info_value">
                                <select
                                  className="form-control"
                                  disabled={this.state.onayla}
                                  defaultValue={distValue ? distValue : ""}
                                  name="teyit_ilce"
                                  onChange={(event) => this.setInput(event)}
                                >
                                  <option value="">İlçe Seçiniz</option>

                                  {this.state.dist.map((city) => {
                                    return (
                                      <option
                                        selected={distValue == city.name}
                                        key={`dist${city.id}`}
                                      >
                                        {city.name}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-12 mt-3 mb-3">
                            <div className="customer_info">
                              <div className="customer_info_placeholder mb-2">
                                İletmek İstediğiniz Not{" "}
                                {this.state.form.teyit_not}
                              </div>
                              <textarea
                                onChange={(event) => this.setInput(event)}
                                name="teyit_not"
                                disabled={this.state.onayla}
                                className="form-control"
                                placeholder=" İletmek İstediğiniz Not"
                                rows={3}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
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
                  <div className="col-lg-8">
                    <div className="form-check mt-3">
                      <input
                        defaultChecked={this.state.form.teyit}
                        disabled={this.state.onayla}
                        onChange={(event) => this.setCheckbox(event)}
                        className="form-check-input"
                        name="teyit"
                        type="checkbox"
                        id="teyit"
                      />
                      <label className="form-check-label" htmlFor="teyit">
                        Başvuru Koşullarını Onaylıyorum
                      </label>
                    </div>
                    <div className="form-check mt-3">
                      <input
                        defaultChecked={this.state.form.kvkk}
                        disabled={this.state.onayla}
                        onChange={(event) => this.setCheckbox(event)}
                        className="form-check-input"
                        name="kvkk"
                        type="checkbox"
                        id="kvkk"
                      />
                      <label className="form-check-label" htmlFor="kvkk">
                        Kişisel veri aydınlatma metni'ni okudum, kişisel
                        verilerimin işlenmesine izin veriyorum.
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-6 mt-5 mb-5">
                    <div className="d-flex">
                      <div className="btn-musteri hide">
                        <button
                          className="musteri"
                          style={{ marginRight: "15px" }}
                          disabled={this.state.onayla}
                          onClick={this.teyit}
                        >
                          Müşteri Temsilcisi Beni Arasın
                        </button>
                      </div>
                      <Button
                        variant="dark"
                        className="btn btn-success"
                        disabled={this.state.onayla}
                        onClick={this.devamEt}
                      >
                        {this.state.onayla ? (
                          <div>
                            <Spinner
                              as="span"
                              variant="light"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              animation="border"
                            />
                            Lütfen Bekleyiniz...
                          </div>
                        ) : (
                          "Kaydet ve Devam Et"
                        )}
                      </Button>
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

const connectedHomePage = connect(mapState, actionCreators)(Teyit);
export { connectedHomePage as Teyit };