import React, { Component } from "react";
import { render } from "react-dom";
import { ReactSVG } from "react-svg";
import {withRouter,Link,Route} from "react-router-dom";
import { history } from '../../_helpers';
import { CommonLoading   } from 'react-loadingg';
class PersonelSidebar extends Component {

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
          <div className="card product_sidebar">
        <div className="w-100">
        <button className="btn mavi_button">+ YENİ KULLANICI EKLE</button>
        
        <div className="personel_menu">
            <div className="personel_menu_title">KULLANICILAR</div>
            <ul>
                              <li>
                                  <label class="checkbox">
                                      <span class="checkbox__input">
                                          <input type="radio" name="aktivasyon_type" value="0"  />
                                          <span class="checkbox__control"></span>
                                      </span>
                                      <span class="radio__label">Tüm Kullanıcılar</span>
                                  </label>
                              </li>
                              <li>
                                  <label class="checkbox">
                                      <span class="checkbox__input">
                                          <input type="radio" name="aktivasyon_type" value="1"  />
                                          <span class="checkbox__control"></span>
                                      </span>
                                      <span class="radio__label">Aktif Kullanıcılar</span>
                                  </label>
                              </li>
                              <li>
                                  <label class="checkbox">
                                      <span class="checkbox__input">
                                          <input type="radio" name="aktivasyon_type" value="2" />
                                          <span class="checkbox__control"></span>
                                      </span>
                                      <span class="radio__label">Pasif Kullanıcılar</span>
                                  </label>
                              </li>
            </ul>

        </div>
             
        <div className="personel_menu">
            <div className="personel_menu_title">

                    <div className="">DEPARTMANLAR</div>
                    <div className="yeni_departman">+EKLE</div>
            </div>
            <ul>
                              <li>
                                  <label class="checkbox">
                                      <span class="checkbox__input">
                                          <input type="radio" name="aktivasyon_type" value="0"  />
                                          <span class="checkbox__control"></span>
                                      </span>
                                      <span class="radio__label">Tüm Kullanıcılar</span>
                                  </label>
                              </li>
                              <li>
                                  <label class="checkbox">
                                      <span class="checkbox__input">
                                          <input type="radio" name="aktivasyon_type" value="1"  />
                                          <span class="checkbox__control"></span>
                                      </span>
                                      <span class="radio__label">Aktif Kullanıcılar</span>
                                  </label>
                              </li>
                              <li>
                                  <label class="checkbox">
                                      <span class="checkbox__input">
                                          <input type="radio" name="aktivasyon_type" value="2" />
                                          <span class="checkbox__control"></span>
                                      </span>
                                      <span class="radio__label">Pasif Kullanıcılar</span>
                                  </label>
                              </li>
            </ul>

        </div>
        
        </div>
       
  
          </div>
        </div>);

}
}
export default withRouter(PersonelSidebar);
