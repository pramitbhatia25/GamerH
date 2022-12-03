import "./index.scss";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faEnvelope, faBars, faSignIn, faUpload, faUserPlus, faCalendar, faTrophy, faDashboard, faBarsProgress, faUserFriends, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Particle from "../particle";
const DashBoard = () => {
    const [showNav, setShowNav] = useState(false);


    return <>
    <Particle />
    <div className="nav-bar">
        <Link onClick={() => setShowNav(false)} className="logo" to="/home" >
            <h4>P</h4>
        </Link>


        <nav className={showNav ? 'mobile-show' : ''}>
            <NavLink exact="true" activeclassname="active" to="/user/dashboard" onClick={() => setShowNav(false)}>
                <FontAwesomeIcon icon={faHome} color="#fff" />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="friends-link" to="/user/friends" onClick={() => setShowNav(false)}>
                <FontAwesomeIcon icon={faUserFriends} color="#fff" />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="signout-link" to="/home" onClick={() => setShowNav(false)}>
                <FontAwesomeIcon icon={faSignOut} color="#fff" />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="leaderboard-link" to="/world/leaderboard" onClick={() => setShowNav(false)}>
                <FontAwesomeIcon icon={faTrophy} color="#fff" />
            </NavLink>
        </nav>
        <FontAwesomeIcon
            onClick={() => setShowNav(true)}
            icon={faBars}
            color="#ffd700"
            size="3x"
            className='hamburger-icon' />
    </div></>
}

export default DashBoard;