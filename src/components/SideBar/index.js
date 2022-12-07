import "./index.scss";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faEnvelope, faBars, faSignIn, faUpload, faUserPlus, faCalendar, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const SideBar = () => {
    const [showNav, setShowNav] = useState(false);


    return <div className="nav-bar">
        <Link onClick={() => setShowNav(false)} className="logo" to="/home" >
            <h4>GAMER-H</h4>
        </Link>


        <nav className={showNav ? 'mobile-show' : ''}>
            <NavLink exact="true" activeclassname="active" to="/GamerH/home" onClick={() => setShowNav(false)}>
                <FontAwesomeIcon icon={faHome} color="#fff" />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="contact-link" to="/GamerH/contact" onClick={() => setShowNav(false)}>
                <FontAwesomeIcon icon={faEnvelope} color="#fff" />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="login-link" to="/GamerH/signIn" onClick={() => setShowNav(false)}>
                <FontAwesomeIcon icon={faSignIn} color="#fff" />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="signup-link" to="/GamerH/signUp" onClick={() => setShowNav(false)}>
                <FontAwesomeIcon icon={faUserPlus} color="#fff" />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="leaderboard-link" to="/GamerH/world/leaderboard" onClick={() => setShowNav(false)}>
                <FontAwesomeIcon icon={faTrophy} color="#fff" />
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