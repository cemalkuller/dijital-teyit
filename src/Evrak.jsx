
import React, { Component } from "react";
import { ReactSVG } from "react-svg";
import { connect } from 'react-redux';
import { userService } from './_services/user.service';
import { userActions } from './_actions';
import { Link } from 'react-router-dom';

import LoadingOverlay from 'react-loading-overlay';
import { Button, Spinner , Modal } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';



class Evrak extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        customer: {customer_data : {} , campaing : {propertys : []}},
        citys : [],
        dist : [],
        bekle : true ,
        show : false 
    };
    this.devamEt = this.devamEt.bind(this);
    this.getDist = this.getDist.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    
}

devamEt() {
  console.log("deneme");
  this.setState({ onayla: true })
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
  console.log(e);
  const state = this.state.customer ;
  state.cityId = e ;
  state.districtId = "" ;
       this.setState({state});


  fetch('https://backend.abonesepeti.com/api/CityNameDistrictsGet/'+this.state.customer.cityId)
  .then(response => response.json())
  .then(data => this.setState({ dist: data }));
  
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
          this.setState({ customer: data , bekle : false });

          fetch('https://backend.abonesepeti.com/api/CityNameDistrictsGet/'+this.state.customer.cityId)
          .then(response => response.json())
          .then(data => this.setState({ dist: data }));

      
      });

        fetch('https://backend.abonesepeti.com/api/allCitys')
        .then(response => response.json())
        .then(data => this.setState({ citys: data }));



}


render() {

  const {customer} = this.state ;
  let currentValue = customer.cityId ;
  let distValue = customer.districtId ;


  return (
    <LoadingOverlay
    className="overlay"
    active={this.state.bekle}
    spinner
    text='Lütfen Bekleyiniz...'
> {!this.state.bekle ? 
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
                <h3>Sayın {customer.firstname + " "+customer.lastname};</h3>
                <p>Başvurunuzun güvenli bir şekilde tamamlanması için bilgilerinizi kontrol ederek
                  onaylamanız
                  gerekmektedir.</p>
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
                    {customer.firstname}  {customer.lastname}
                    </div>
                  </div>
                </div>
                {customer.customer_data.gecisno ? 
                <div className="col-lg-4 t15">
                  <div className="customer_info">
                    <div className="customer_info_placeholder">
                      Geçiş Yapılacak Numara
                    </div>
                    <div className="customer_info_value">
                     {customer.customer_data.gecisno }
                    </div>
                  </div>
                </div>
                : <></>}
              </div>
              <div className="row mt-3">
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 mb-3">
                      <div className="customer_info">
                        <div className="customer_info_placeholder mb-2">
                          Kargo / Kurye Adresi
                        </div>
                        <textarea className="form-control" defaultValue={customer.cargo_address} />
                      </div>
                    </div>
                    <div className="col-lg-6 t15">
                      <div className="customer_info">
                        <div className="customer_info_placeholder">
                          İL
                        </div>
                        <div className="customer_info_value">
                          <select className="form-control" 
                           onChange={ (event) => this.getDist(event.target.value) } 
                           defaultValue={currentValue ? currentValue : ''}>
                          <option value="" >İl Seçiniz</option>
                       
                                  {
                               
                                    this.state.citys.map((city) => {
                                      return <option key={`city${city.id}`} >{city.name}</option>
                                    })
                                  }
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 t15">
                      <div className="customer_info">
                        <div className="customer_info_placeholder">
                          İLÇE
                        </div>
                        <div className="customer_info_value">
                          <select className="form-control"  defaultValue={distValue ? distValue : ''}>
                          <option value="" >İlçe Seçiniz</option>
                          
                            {
                               
                               this.state.dist.map((city) => {
                                 return <option selected={distValue == city.name } key={`dist${city.id}`} >{city.name}</option>
                               })
                             }
                           
                          </select>
                        </div>
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
                <div className="k_name">
                  {customer.productname}
                </div>
                <div className="brand_product_propertys">
                { customer.campaing.propertys.map((property, index) => { 
                    return  <div key={`brand_product_ozellik${property.icon}`} className="brand_product_ozellik"><i className={property.icon+ " product_icon "} /><span className="brand_unit">{property.value} <span> {property.unit}</span></span></div>
                })}
                
                </div>
                <div className="brand_price_div">
                  <div className="product_price">
                    <div className="price_tam">{customer.campaing.price_sale}.</div>
                    <div className="price_ondalik">
                      <div className="ondalik">{customer.campaing.price_ext}</div>
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
                <input className="form-check-input" type="checkbox"  id="bavuru"  />
                <label className="form-check-label" htmlFor="bavuru">
                  Başvuru Koşullarını Onaylıyorum
                </label>
              </div>
              <div className="form-check mt-3">
                <input className="form-check-input" type="checkbox"  id="kvkk"  />
                <label className="form-check-label" htmlFor="kvkk">
                  Kişisel veri aydınlatma metni'ni okudum, kişisel verilerimin işlenmesine izin veriyorum.
                </label>
              </div>
              <div className="form-check mt-3">
                <input className="form-check-input" type="checkbox"  id="iys"  />
                <label className="form-check-label" htmlFor="iys">
                  Ticari Elektronik İleti Gönderimi Hakkında Bilgilendirme yi okudum , kampanyalardan
                  haberdar olabilmem için kişisel verilerimin işlenmesini ve tarafıma elektronik ileti
                  gönderilmesini kabul ediyorum.
                </label>
              </div>
            </div>
            <div className="col-lg-6 mt-5 mb-5">
              <div className="d-flex">
              <Button variant="dark" className="btn btn-success" disabled={this.state.onayla} onClick={this.devamEt}>
                {this.state.onayla ? 
                <div>
              <Spinner
              as="span"
              variant="light"
              size="sm"
              role="status"
              aria-hidden="true"
              animation="border"/>
                 Lütfen Bekleyiniz...
                 </div> : 'Kaydet ve Devam Et'}
          </Button>
                
                <div className="btn-musteri" >
                  
                  <button className="musteri"  disabled={this.state.onayla} onClick={this.teyit} >Müşteri Temsilcisi Beni Arasın</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header >
          <Modal.Title>Kampanya Detayları</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div dangerouslySetInnerHTML={ { __html: customer.campaing.details } }></div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Kapat
          </Button>
         
        </Modal.Footer>
      </Modal>
    </div>
    : <></> }
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

const connectedHomePage = connect(mapState, actionCreators)(Evrak);
export { connectedHomePage as Evrak };