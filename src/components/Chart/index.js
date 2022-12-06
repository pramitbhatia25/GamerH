import "./index.scss";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBars, faTrophy, faUserFriends, faSignOut, faChartBar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Particle from "../particle";
import { useEffect } from "react";
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function ChartD() {
    var [cstate, setCState] = useState(
        {
            labels: ['Loading', 'Loading', 'Loading', 'Loading', 'Loading', 'Loading', 'Loading'],
            datasets: [
                {
                    label: 'STEP DATA',
                    fill: false,
                    lineTension: 0,
                    backgroundColor: 'white',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 4,
                    data: [0, 0, 0, 0, 0, 0, 0]
                }
            ]
        }
    )

    const [showNav, setShowNav] = useState(false);
    const [user, setUser] = useState({ name: "Loading", handle: "Handle", steps: "Loading", email: "", pass: "", ocr_steps: "" });
    var fitbit_link = "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=2394P9&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fuser%2Fchart&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight%20oxygen_saturation%20respiratory_rate%20temperature&expires_in=604800"

    useEffect(() => {
        updateChart();
        document.body.style.zoom = "80%";
    }, [])

    async function updateChart() {
        if (localStorage.getItem("email") != null) {
            await getUser();
        }
        else {
            window.alert("Not Logged In!");
            window.location.href = "/signIn";
        }
        if (window.location.href.length > 40) {
            var url = window.location.href;
            var access_token = url.split("#")[1].split("=")[1].split("&")[0];
            var userId = url.split("#")[1].split("=")[2].split("&")[0];

            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://api.fitbit.com/1/user/' + userId + '/activities/steps/date/today/1w.json');
            xhr.setRequestHeader("Authorization", 'Bearer ' + access_token);
            xhr.onload = async function () {
                if (xhr.status === 200) {
                    var tlabels = []
                    var tdata = []
                    var s = JSON.parse(xhr.responseText)['activities-steps']
                    for (let i = 0; i < s.length; i++) {
                        tlabels.push(s[i]['dateTime']);
                        tdata.push(s[i]['value']);
                    }
                    setCState({
                            labels: tlabels,
                            datasets: [
                                {
                                    label: 'STEP DATA',
                                    fill: false,
                                    lineTension: 0,
                                    backgroundColor: 'white',
                                    borderColor: 'rgba(0,0,0,1)',
                                    borderWidth: 4,
                                    data: tdata
                                }
                            ]
                        }
                
                    )
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
                StepS History
            </div>
            <a href={fitbit_link}>
                <button className="connect_button extra">Sync with Fitbit</button>
            </a>
            <div className="step_count_chart">
                <div className='chart_cl'>
                    <Line
                        data={cstate}
                        options={{
                           title: {
                            display: true,
                            text: 'Step Data',
                            fontSize: 25
                            },
                            legend: {
                                display: true,
                                position: 'right'
                            }
                        }}
                    />
                </div>
            </div>

        </div>
    </>
}

export default ChartD;