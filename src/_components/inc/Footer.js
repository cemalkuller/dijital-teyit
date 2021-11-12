import React, { Component } from "react";
import { render } from "react-dom";
import { ReactSVG } from "react-svg";
import {withRouter,Link} from "react-router-dom";
import WhatsAppWidget from 'react-whatsapp-widget'
import 'react-whatsapp-widget/dist/index.css'

class Footer extends Component {


    render() {
        const { user } = this.props;
          return ( <footer>
             
              <div className="footer_left">
              © 2021 abonesepeti, tüm hakları saklıdır.
              </div>
              <div className="footer_right">
                  <Link>
                  Kullanım Şartları 
                  </Link>
                 |   
                 <Link> Gizlilik Politikası</Link>    |  
                 <Link> Güvenlik</Link>
              </div>
              
              </footer>);

}
}

   export default Footer ;
