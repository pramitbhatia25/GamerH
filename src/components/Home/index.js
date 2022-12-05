import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactTypingEffect from 'react-typing-effect';
import { Loader } from "react-loaders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import "./index.scss";
import AnimatedLetters from "../AnimatedLetters";
import {faContactCard} from "@fortawesome/free-solid-svg-icons";

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
            <h1>
                <span className={letterClass}>H</span>
                <span className={`${letterClass} _12`}>e</span>
                <span className={`${letterClass} _13`}>y</span>
                <span className={`${letterClass} _14`}> </span>
                <span className={`${letterClass} _15`}>t</span>
                <span className={`${letterClass} _16`}>h</span>
                <span className={`${letterClass} _17`}>e</span>
                <span className={`${letterClass} _18`}>r</span>
                <span className={`${letterClass} _19`}>e,</span>
                <br />
                <div className="hh4">GAMER-H!</div>
                <br />
            </h1>
            <br />
            <br />
            <br />
            <div className="typing">Are you tired of sitting around all day?</div>
            <div className="typing">Do you want to get up and move around too but find it boring?</div>
            <div className="typing">You've come to the right place!</div>

            <div className="typing_2"><i>Gamer-H make exercise more interesting by providing an interactive and competitive environment where you can challenge yourself, achieve your fitness goals, and have fun while doing it!</i></div>

            <div className="buttons">
                <Link to="//linkedin.com/in/pramit-bhatia-220680b2/" target="_blank" className="flat-button">Linkedin <FontAwesomeIcon className="ic" icon={faLinkedin} color="white" fontSize={"20px"} /></Link>
                <Link to="//github.com/pramitbhatia25" target="_blank" className="flat-button">Github <FontAwesomeIcon className="ic" icon={faGithub} color="white" fontSize={"20px"} /></Link>
            </div>

        </div>
        <img className="lottie"src={require("../../assets/images/gif.gif")} alt="gif"/>
        
    </div>
        <Loader type="line-scale" />
    </>
}

export default Home;