import {useState, useEffect} from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBars, faTrophy, faUserFriends, faSignOut } from "@fortawesome/free-solid-svg-icons";
import Particle from "../particle";


function Chat() {
    const [showNav, setShowNav] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        document.body.style.zoom = "80%";
        if (localStorage.getItem("email") != null) {
            getUser();
        }
        else {
            window.alert("Not Logged In!");
            window.location.href = "/signIn";
        }
    }, [])

    async function getUser() {
        setUser('Pramit.')
    }

    async function SignOutUser(e) {
        setShowNav(false);
        e.preventDefault();
        localStorage.removeItem('email');
        window.alert('You have been logged out!')
        window.location.href = "/home";
    }
    return <>
    <Particle />
    <div className="nav-bar">
        <Link onClick={() => setShowNav(false)} className="logo" to="/home" >
            <h4>G</h4>
        </Link>


        <nav className={showNav ? 'mobile-show' : ''}>
            <NavLink exact="true" activeclassname="active" to="/user/dashboard" onClick={() => setShowNav(false)}>
                <FontAwesomeIcon icon={faHome} color="#fff" />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="friends-link" to="/user/chat" onClick={() => setShowNav(false)}>
                <FontAwesomeIcon icon={faUserFriends} color="#fff" />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="signout-link" to="/home" onClick={SignOutUser}>
                <FontAwesomeIcon icon={faSignOut} color="red" />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="leaderboard-link" to="/user/leaderboard" onClick={() => setShowNav(false)}>
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

export default Chat;