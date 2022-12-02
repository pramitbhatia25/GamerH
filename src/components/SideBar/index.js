import "./index.scss";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faEnvelope, faBars, faSignIn, faUpload, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const SideBar = () => {
    const [showNav, setShowNav] = useState(false);


    return <div className="nav-bar">
        <Link onClick={() => setShowNav(false)} className="logo" to="/Portfolio/home" >
            <h4>P</h4>
        </Link>


        <nav className={showNav ? 'mobile-show' : ''}>
            <NavLink exact="true" activeclassname="active" to="/Portfolio/home" onClick={() => setShowNav(false)}>
                <FontAwesomeIcon icon={faHome} color="#fff" />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="contact-link" to="/Portfolio/contact" onClick={() => setShowNav(false)}>
                <FontAwesomeIcon icon={faEnvelope} color="#fff" />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="login-link" to="/Portfolio/signIn" onClick={() => setShowNav(false)}>
                <FontAwesomeIcon icon={faSignIn} color="#fff" />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="signup-link" to="/Portfolio/signUp" onClick={() => setShowNav(false)}>
                <FontAwesomeIcon icon={faUserPlus} color="#fff" />
            </NavLink>
        </nav>
        <FontAwesomeIcon
            onClick={() => setShowNav(true)}
            icon={faBars}
            color="#ffd700"
            size="3x"
            className='hamburger-icon' />
    </div>
}

export default SideBar;