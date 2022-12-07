import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "react-loaders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";
import {faArrowDownLong, faContactCard, faSignIn, faUser} from "@fortawesome/free-solid-svg-icons";

function Home() {
    const [letterClass, setLetterClass] = useState('text-animate');
    // const nameArray = ['r', 'a', 'm', 'i', 't'];
    const nameArray = "Welcome To GamerH".split("");
    const [a, setA] = useState("Loading!");

    useEffect(() => {
        document.body.style.zoom = "80%";
        let timeoutId = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 4000)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [])

    return <><div className="container home-page">
        <div className="text-zone">
            <div className="hh5">Game Like Never Before.</div>
            <div className="hh6">Welcome to Gamer-H</div>
            <div className="typing_2"><i>Gamer-H make exercise more interesting by providing an interactive and competitive environment where you can challenge yourself, achieve your fitness goals, and have fun while doing it!</i></div>

            <div className="buttons">
                <Link to="/GamerH/signIn" className="flat-button">SignIn <FontAwesomeIcon className="ic" icon={faSignIn} color="white" fontSize={"20px"} /></Link>
                <Link to="/GamerH/contact" className="flat-button">Contact <FontAwesomeIcon className="ic" icon={faContactCard} color="white" fontSize={"20px"} /></Link>
                <Link to="/GamerH/signUp" className="flat-button">SignUp <FontAwesomeIcon className="ic" icon={faUser} color="white" fontSize={"20px"} /></Link>
            </div>

        </div>
        <img className="lottie"src={require("../../assets/images/gif.gif")} alt="gif"/>
        <FontAwesomeIcon className="scroll" icon={faArrowDownLong} color="white" fontSize={"25px"} />

    </div>
        <Loader type="line-scale" />
    </>
}

export default Home;