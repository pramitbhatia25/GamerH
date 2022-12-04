import "./index.scss";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBars, faTrophy, faUserFriends, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Particle from "../particle";
import { useEffect } from "react";
const DashBoard = () => {
    const [showNav, setShowNav] = useState(false);
    const [my_steps, setMySteps] = useState("Loading");
    const [user, setUser] = useState({name:"Loading", handle: "Handle", steps: 0, email: "", pass: ""});

    useEffect(() => {
        document.body.style.zoom = "80%";
        if (localStorage.getItem("email") != null) {
            console.log("A");
            getUser();
            console.log("B");
        }
        else {
            window.alert("Not Logged In!");
            window.location.href = "/signIn";
        }
    }, [])

    async function getUser() {
        let email = localStorage.getItem("email");
        const response = await fetch('http://localhost:1337/api/find', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                email,
            }),
        })

        const data = await response.json()
        console.log(data);
        setUser(data.user)
        setMySteps(data.user.steps)
        const el = document.querySelector('.steps_amount');
        el.classList.remove("amt");
    }

    async function SignOutUser(e) {
        setShowNav(false);
        e.preventDefault();
        localStorage.removeItem('email');
        window.alert('You have been logged out!')
        window.location.href = "/home";
    }

    async function Sync() {
        console.log("s");
    }
    return <>
        <Particle />
        <div className="dash">
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
            </div>
            <div className="welcome_box">
                Welcome, {user.handle}
            </div>
            <div className="step_count">
                <div className="steps_title">
                    My Steps:
                </div>
                <div className="steps_amount amt">
                    {my_steps}
                </div>
            </div>
            <button onClick={Sync} className="connect_button">Connect To Google Fitness</button>
            <button className="enter_manually">Or Enter Manually</button>
            <div className="ocr_box">
                <button className="ocr_title">
                    Upload an image of your step tracking device
                </button>
                <div className="ocr_desc">
                    We use OCR to detect the number of steps from your image and upload it to your account.
                </div>
            </div>
        </div>
    </>
}

export default DashBoard;