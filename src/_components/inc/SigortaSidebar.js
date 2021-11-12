import React, { Component } from "react";
import { render } from "react-dom";
import { ReactSVG } from "react-svg";
import {withRouter,Link,Route} from "react-router-dom";
import { history } from '../../_helpers';

class SigortaSidebar extends Component {

    constructor(props) {
        super(props);
        this.goto = this.goto.bind(this);
      }

    goto(e) {
        this.props.history.push(e)

      //  history.push(e);
    }


    render() {
        const { user , provider } = this.props;
        console.log(provider);
          return (      <div className="col-lg-3">
          <div className="card  sigorta_sidebar">
          <div className="card-body card-toolbar"><h5 className="card-title">Sigorta Satışı İşlemleri</h5></div>
          <img src={'./assets/img/sidebar.svg'} />
          <ul className="page_menu">
            <li >
            Sigorta Teklifi Al Butonuna Tıklayın.
            </li>
            <li >
            Sigorta Tekliflerini Listeleyin.
            </li>
            <li >
            Seçtiğiniz Teklifi Satın Alın ve Poliçeyi İndirin.
            </li>
            <li >
            İndirdiğiniz Poliçeyi ve Müşteri Bilgilerini "Sigorta Teklifi Al" Butonunun Altındaki Butona Tıklayarak Bize İletin.
            </li>


          </ul>
          </div>
        </div>);

}
}
export default withRouter(SigortaSidebar);
