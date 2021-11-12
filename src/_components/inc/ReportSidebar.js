import React, { Component } from "react";
import { render } from "react-dom";
import { ReactSVG } from "react-svg";
import {withRouter,Link,Route} from "react-router-dom";
import { history } from '../../_helpers';
import { CommonLoading   } from 'react-loadingg';
class ReportSidebar extends Component {

    constructor(props) {

   
        super(props);
        this.goto = this.goto.bind(this);
      }

    goto(e) {
        this.props.history.push(e)

      //  history.push(e);
    } 


    render() {
        const { user , provider,sales } = this.props;
  
          return (      <div className="col-lg-3">
          <div className="card bg_acik_mavi" style={{background : 'rgba(21,209,235,0.1)'}}>
          <div className="card-body card-toolbar"><h5 className="report_page_sidebar_title">RAPOR OLUŞTUR</h5></div>
          <div className="report_form">

            <div className="report_form_item">
               

                              <div className="form-item">
                                  <label className="report_form_item_title"> Başlangıç tarihi</label>
                                  <input name="randevu_date" placeholder="Randevu Tarihi" className="form-control" type="date" />
                              </div>

                              <div className="form-item">
                                  <label className="report_form_item_title"> Bitiş tarihi</label>
                                  <input name="randevu_date" placeholder="Randevu Tarihi" className="form-control" type="date" />
                              </div>
                              <div className="form-item">
                                  <label className="report_form_item_title">  Durum</label>
                                  <select className="form-control bg-white w-100">
                                      <option>Durum Seçiniz</option>
                                  </select>
                              </div>
                              <div className="form-item">
                                  <label className="report_form_item_title">  Marka</label>
                                  <select className="form-control bg-white w-100">
                                      <option>Marka Seçiniz</option>
                                  </select>
                              </div>
                              <div className="form-item">
                                  <label className="report_form_item_title">  Personel</label>
                                  <select className="form-control bg-white w-100">
                                      <option>Durum Seçiniz</option>
                                  </select>
                              </div>
                              <div className="form-item">
                                 <button className="btn btn-primary detay_button w-100">RAPOR OLUŞTUR</button>
                              </div>
               
            </div>

          </div>
            </div>
        </div>);

}
}
export default withRouter(ReportSidebar);
