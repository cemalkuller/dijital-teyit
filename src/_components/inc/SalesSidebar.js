import React, { Component } from "react";
import { render } from "react-dom";
import { ReactSVG } from "react-svg";
import {withRouter,Link,Route} from "react-router-dom";
import { history } from '../../_helpers';
import { CommonLoading   } from 'react-loadingg';
class SalesSidebar extends Component {

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
          <div className="card">
          <div className="card-body card-toolbar"><h5 className="card-title">Durumlara Göre Filtrele</h5></div>
  
          <ul className="card_ul">
    
          { sales.length > 0 ? 
                     sales.map((r, index) => (                    
               
                      
                      <li  key={index}  className={this.props.match.params.id == r.status ? 'active' : '' } >
                      <Link to={'/sales/'+r.status}  >
                      <div style={{ textTransform: 'capitalize' }}>{r.status_name.toLowerCase()}</div>
                              <span className="badge bg-primary" style={{width : 'auto'}}>{r.total}</span>
                        </Link>
                    </li>

            
                  
                       )) 
                       
                       : <div style={{minHeight: "calc(100vh - 350px)" , width :'100%',position : 'relative' }}><div className="overlay_load"> <CommonLoading color="#38d8ee" speed="1.2" /></div></div> } 

       
          </ul>
          </div>
        </div>);

}
}
export default withRouter(SalesSidebar);
