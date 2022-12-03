import './index.scss';
import { useState, useEffect } from "react"

const SignUp = () => {

    useEffect(() => {
        document.body.style.zoom = "80%";
    }, [])

    // function logOut() {
    //     localStorage.removeItem("email");
    //     window.location.assign("/login");
    // }
    // const [data, setData] = useState();

    // useEffect(() => {
    //     getData();
    // }, [])

    // async function getData() {
    //     const email = localStorage.getItem("email");
    //     console.log(email);
    //     if (!email) {
    //         alert("Please Login first!");
    //         window.location.assign("/home");
    //     }
        // const response = await fetch('http://localhost:1337/api/find', {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     method: 'POST',
        //     body: JSON.stringify({
        //         email,
        //     }),
        // })

        // setData(await response.json());
        // console.log("Data->" + data);
    // }

    const [user, setUser] = useState({
        pass: "", email: "", name:""
    });

    let name, value;
    const Input = (e) => {
        console.log(e)
        name = e.target.name;
        value = e.target.value;
        console.log(value)
        
        setUser({ ...user, [name]: value });
    }

    async function SendDataSignUp(e) {
        e.preventDefault();
        console.log(user)
        let name = user.name;
        let email = user.email;
        let pass = user.pass;        
        const response = await fetch('http://localhost:1337/api/createUser', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                name, email, pass
            }),
        })
        console.log("S"+ await response.json());

    }

    return (
        <div className="loginForm">
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Sign Up</h1>
                        <h5>Welcome to GamerH!</h5>
                        <input type="name" placeholder="Name" onChange={Input} id="name" value={user.name} name="name" />
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