import '../assets/css/app-footer.css'
import '../assets/css/global.css'
import {Link} from "react-router-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


import {faLocationDot} from '@fortawesome/free-solid-svg-icons';
import { faFacebook,faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'


function AppFooter(){
return(
    <footer className="container">
    <section className="links">
    <Link to="/">About</Link>
    <Link to="/">Contact us</Link>
    <Link to="/">Get directions <FontAwesomeIcon icon={faLocationDot} /></Link>
      
    </section>

    <section><p>© 2023, Papertown.com</p></section>

    <section className="social-media-icons">
      <a className="button"><FontAwesomeIcon icon={faFacebook} /></a>
      <a className="button"><FontAwesomeIcon icon={faTwitter} /></a>
      <a className="button"><FontAwesomeIcon icon={faInstagram} /></a>

    </section>
  </footer>
)
}
export default AppFooter;