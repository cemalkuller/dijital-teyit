import React, { Component } from "react";
import { render } from "react-dom";
import { ReactSVG } from "react-svg";
import {withRouter,Link,Route} from "react-router-dom";
import { history } from '../../_helpers';

class AltyapiSidebar extends Component {

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
          <div className="card">
          <div className="card-body card-toolbar"><h5 className="card-title">Altyapı Sorgulama</h5></div>
          <ul className="page_menu">
           
            <li className={provider == 'turktelekom' ? 'active' : '' }  onClick={() => this.goto("/altyapi/turktelekom")} >
              <Link  to="/altyapi/turktelekom">Tük Telekom Altyapı Sorgulama</Link>
            </li>
            <li className={provider == 'superonline' ? 'active' : '' }  onClick={() => this.goto("/altyapi/superonline")} >
              <Link  to="/altyapi/superonline">Superonline Altyapı Sorgulama</Link>
            </li>
      
          </ul>
          </div>
        </div>);

}
}
export default withRouter(AltyapiSidebar);
