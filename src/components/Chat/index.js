import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBars, faTrophy, faUserFriends, faSignOut } from "@fortawesome/free-solid-svg-icons";
import Particle from "../particle";
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import "./index.scss"

function Chat() {
    const [showNav, setShowNav] = useState(false);
    const [user, setUser] = useState({ name: "Loading", handle: "Handle", steps: 0, email: "", pass: "" });
    const [text, setText] = useState("Load");
    const [steps, setSteps] = useState([
        {
            id: '0',
            message: 'Hey Geek!',
            trigger: '1',
        },
        {
            id: '1',

            // This message appears in
            // the bot chat bubble
            message: 'Hey!',
            trigger: '2'
        },
        {
            id: '2',

            // Here we want the user
            // to enter input
            user: true,
            trigger: '3',
        },
        {
            id: '3',
            message: " hi {previousValue}, how can I help you?",
            trigger: '4',
        },
        {
            id: '4',
            message: " hi {previousValue}, how can I help you?",
            trigger: '5',
        },
        {
            id: '5',
            message: " hi {previousValue}, how can I help you?",
            trigger: '6',
        },
        {
            id: '6',
            message: " hi {previousValue}, how can I help you?",
            trigger: '7',
        },
        {
            id: '7',
            message: " hi {previousValue}, how can I help you?",
            trigger: '8',
        },
        {
            id: '8',
            message: " hi {previousValue}, how can I help you?",
            trigger: '9',
        },
        {
            id: '9',
            message: " hi {previousValue}, how can I help you?",
            trigger: '10',
        },
        {
            id: '10',
            message: " hi {previousValue}, how can I help you?",
        },
    ]);

    const theme = {
        background: 'transparent',
        headerBgColor: 'white',
        headerFontSize: '20px',
        botBubbleColor: 'white',
        headerFontColor: 'black',
        botFontColor: 'black',
        userBubbleColor: '#FF5733',
        userFontColor: 'white',
    };

    async function getResponse(prompt) {
        const response = await fetch("http://127.0.0.1:5000/chatbot", {
            headers: {
                'Content-Type': 'application/json',
                'Prompt': prompt,
            },
            method: 'GET',
        }).then(function (response) {
            return response.json();
        }).then(function (text) {
            return text.status;
        });
        return (response)
    }

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
        // setText(await getResponse("You: Hi! I am " + data.user.name + ". I like to drive."));
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
            <ThemeProvider theme={theme}>
                <div className="chatbot">
                    <ChatBot steps={steps} />
                </div>
            </ThemeProvider>
            <div className="openai_text">
                Brad is a AI fitness expert, powered by the OpenAI GPT-3 model.
            </div>
            <div className="openai_text_2">
                Ask Brad about any fitness related query you have!
            </div>

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