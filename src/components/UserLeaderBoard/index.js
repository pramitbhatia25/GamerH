import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBars, faTrophy, faUserFriends, faSignOut } from "@fortawesome/free-solid-svg-icons";
import Particle from "../particle";
import "./index.scss";

function UserLeaderBoard() {
    const [showNav, setShowNav] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        getData();
    }, [])

    var [list_data, setListData] = useState([]);

    async function getData() {
        const res = await fetch("http://localhost:1337/api/fetchUsers", { method: "GET" });

        const data = await res.json();
        let temp = []
        temp.push({ handle: 'HANDLE', name: 'NAME', steps: "STEPS" });
        for (let i = 0; i < data.users.length; i++) {
            temp.push({ handle: data.users[i].handle, name: data.users[i].name, steps: data.users[i].steps })
        }
        setListData(temp);
    }

    function ListItem(item) {
        return <div className="sleaderboard_list_item">
            <div className="sitem name">
                {item.i.name}
            </div>
            <div className="sitem handle">
                {item.i.handle}
            </div>
            <div className="sitem steps">
                {item.i.steps}
            </div>
        </div>
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
        console.log(data.user)
        setUser(data.user);
        // var nas = (document.getElementsByClassName('sitem name'));
        // console.log(nas);
        // Array.from(nas).forEach((d) => {
        //     console.log(d);
        //     if (d.textContent == data.user.name) {
        //         console.log("RE")
        //         console.log(d.classList)
        //         d.classList.add("redded");
        //     }
        // })
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

        <div className="sleaderboard_list">
            {list_data.map((d) =>
                <ListItem key={d.handle} i={d} />
            )}
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

export default UserLeaderBoard;