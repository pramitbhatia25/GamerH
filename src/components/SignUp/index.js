import './index.scss';
import { useState } from "react"

const SignUp = () => {

    const [user, setUser] = useState({
        pass: "", email: "",
    });

    let name, value;
    const Input = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }

    const SendDataLogin = async (e) => {
        e.preventDefault();

        const { email, pass } = user;
        const res = await fetch("http://localhost:1337/api/login", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email, pass
            })
        });

        const data = await res.json();
        console.log(data)

        if (res.status === 400 || !data) {
            window.alert("Invalid Credentials!");
            console.log("Invalid Credentials!");
            window.location.href = "/signIn"

        } else {
            window.alert("Login Successful");
            console.log("Login Successful");
            localStorage.setItem("email", email);
            window.location.href = "/progress"
        }

    }

    return (
        <div className="loginForm">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
    <br />
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Sign Up</h1>
                        <span>Welcome to GamerH!</span>
                        <input type="name" placeholder="Name" onChange={Input} id="name" value={user.name} name="name" />
                        <input type="email" placeholder="Email" onChange={Input} id="email" value={user.email} name="email" />
                        <input type="password" placeholder="Password" onChange={Input} id="pass" value={user.pass} name="pass" />
                        <br />
                        <button onClick={SendDataLogin} className="btn">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;