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


    async function apiTest() {
        await fetch("http://127.0.0.1:5000", { method: "GET" }).then((response) => response.json()).then((data) => { setA(data.u) });
    }

    useEffect(() => {
        // apiTest();
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
                <div className="hh4">GAMER!</div>
                <br />
            </h1>
            <br />
            <br />
            <br />
            {/*
                <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={19} />
                <span className={`${letterClass} _19`}>!</span>

                <div className="typing"><ReactTypingEffect typingDelay="1000" eraseDelay="1000" eraseSpeed="10" speed="50"
                text={["Software Developer.", "Undergrad @ Georgia State University", "Huge Marvel Fan!", "Aspring Software Engineer :)"]}
            /></div>
            */}
            <div className="typing">Game Like Never Before!</div>
            <Link to="//linkedin.com/in/pramit-bhatia-220680b2/" target="_blank" className="flat-button">Linkedin <FontAwesomeIcon className="ic" icon={faLinkedin} color="white" fontSize={"20px"} /></Link>
            <Link to="//github.com/pramitbhatia25" target="_blank" className="flat-button">Github <FontAwesomeIcon className="ic" icon={faGithub} color="white" fontSize={"20px"} /></Link>
        </div>
        
    </div>
        <Loader type="line-scale" />
    </>
}

export default Home;