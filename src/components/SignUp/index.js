import './index.scss';
import { useState, useEffect } from "react"

const SignUp = () => {

    useEffect(() => {
        document.body.style.zoom = "80%";
    }, [])

    const [user, setUser] = useState({
        pass: "", email: "", name:"", handle: "", steps: ""
    });

    let name, value;
    const Input = (e) => {
        name = e.target.name;
        value = e.target.value;        
        setUser({ ...user, [name]: value });
    }

    async function SendDataSignUp(e) {
        e.preventDefault();
        console.log("Y" +user)
        let name = user.name;
        let email = user.email;
        let pass = user.pass;
        let handle = "@" + user.handle;
        let steps = 0;        
        console.log(user)
        const response = await fetch('http://localhost:1337/api/createUser', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                name, handle, steps, email, pass
            }),
        })
        console.log(response.status)
        if(response.status === 200) {
        console.log("S"+ response.toString());
        window.alert('Account Created!');
        localStorage.setItem("email", email);
        window.location.href = "/user/dashboard"
        }
        else {
        window.alert("Error!" + response.error)
        window.location.href = '/signUp';
        }
    }

    return (
        <div className="loginForm">
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Sign Up</h1>
                        <h5>Welcome to GamerH!</h5>
                        <input type="name" placeholder="Name" onChange={Input} id="name" value={user.name} name="name" />
                        <input type="handle" placeholder="@Handle" onChange={Input} id="handle" value={user.handle} name="handle" />
                        <input type="email" placeholder="Email" onChange={Input} id="email" value={user.email} name="email" />
                        <input type="password" placeholder="Password" onChange={Input} id="pass" value={user.pass} name="pass" />
                        <br />
                        <button onClick={SendDataSignUp} className="btn">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;