import "./index.scss";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBars, faTrophy, faUserFriends, faSignOut, faChartBar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Particle from "../particle";
import { useEffect } from "react";
import React from 'react';

const DashBoard = () => {

    const [image, setImage] = React.useState();

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImage(imageList);
    };

    

    const [showNav, setShowNav] = useState(false);
    const [my_steps, setMySteps] = useState("Loading");
    const [ocr_steps, setOCRSteps] = useState("");
    const [daily_goal, setDailyGoal] = useState(10000);
    const [user, setUser] = useState({ name: "Loading", handle: "Handle", steps: "Loading", email: "", pass: "", ocr_steps: "" });
    var fitbit_link = "https://www.fitbit.com/oauth2/authorize?client_id=23944D&expires_in=604800&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fuser%2Fdashboard&response_type=token&scope=activity+heartrate+location+nutrition+profile+settings+sleep+social+weight+oxygen_saturation+respiratory_rate+temperature&state"

    useEffect(() => {
        updateSTEPS();
        document.body.style.zoom = "80%";
    }, [])

    async function updateSTEPS() {
        if (localStorage.getItem("email") != null) {
            console.log("A");
            await getUser();
            console.log("B");
        }
        else {
            window.alert("Not Logged In!");
            window.location.href = "/signIn";
        }
        if (window.location.href.length > 40) {
            console.log("started")
            var url = window.location.href;
            var access_token = url.split("#")[1].split("=")[1].split("&")[0];
            var userId = url.split("#")[1].split("=")[2].split("&")[0];

            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://api.fitbit.com/1/user/' + userId + '/activities/steps/date/today/today.json');
            xhr.setRequestHeader("Authorization", 'Bearer ' + access_token);
            xhr.onload = async function () {
                if (xhr.status === 200) {
                    console.log("ANSWER" + xhr.responseText)
                    var s = JSON.parse(xhr.responseText)['activities-steps']['0']['value']
                    console.log("S" + s);
                    await updateDB(s);
                    setMySteps(parseInt(s));
                }
            };
            xhr.send()
        }
    }

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
        setOCRSteps(data.user.ocr_steps)
        const el = document.querySelector('.steps_amount');
        el.classList.remove("amt");
    }

    async function updateDB(steps) {
        let email = localStorage.getItem("email");
        const response = await fetch('http://localhost:1337/api/updateApprovalStatus', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email, steps
            }),
        })
        console.log("hola")

        const data = await response.json()
        console.log(data)
        // window.location.href = "/user/dashboard";
    }

    async function SignOutUser(e) {
        setShowNav(false);
        e.preventDefault();
        localStorage.removeItem('email');
        window.alert('You have been logged out!')
        window.location.href = "/home";
    }

    async function add_ocr() {
        setMySteps(parseInt(document.getElementById('quantity').value))
        await updateDB(parseInt(document.getElementById('quantity').value))
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
                <NavLink exact="true" activeclassname="active" className="chart-link" to="/user/chart" onClick={() => setShowNav(false)}>
                    <FontAwesomeIcon icon={faChartBar} color="white" />
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
            <div className="temp_steps">
                <div className="steps_title">
                    My Steps:
                </div>
                <div className="steps_title_2">
                    Daily Goal:
                </div>
            </div>
            <div className="steps_amount amt">
                <div className="daily_goal">
                {my_steps}
                </div>
                <div className="daily_goal">
                    {daily_goal}
                </div>
            </div>
        </div>
        <a href={fitbit_link}>
            <button className="connect_button">Sync with Fitbit</button>
        </a>
        <div className="enter_manually">
            <div className="t">
                Enter Manually:
            </div>
        </div>
        <div className="ocr_box">
            <input className="num_input" type="number" id="quantity" name="quantity" />
            <button onClick={add_ocr} className="ocr_title">
                Click here to update your daily total.
            </button>
        </div>
        <div className="ty">
        </div>
    </div>
</>
}

export default DashBoard;