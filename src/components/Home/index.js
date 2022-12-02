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
    const nameArray = ['r', 'a', 'm', 'i', 't'];
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
                <span className={`${letterClass} _12`}>i,</span>
                <br />
                <span className={`${letterClass} _13`}>I</span>
                <span className={`${letterClass} _14`}>'m</span>
                <div className="hh4">P</div>
                <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={15} />
                <span className={`${letterClass} _15`}>!</span>
                <br />
            </h1>
            <br />
            <br />
            <br />
            <div className="typing"><ReactTypingEffect typingDelay="1000" eraseDelay="1000" eraseSpeed="10" speed="50"
                text={["Software Developer.", "Undergrad @ Georgia State University", "Huge Marvel Fan!", "Aspring Software Engineer :)"]}
            /></div>

            <Link to="//linkedin.com/in/pramit-bhatia-220680b2/" target="_blank" className="flat-button">Linkedin <FontAwesomeIcon className="ic" icon={faLinkedin} color="white" fontSize={"20px"} /></Link>
            <Link to="//github.com/pramitbhatia25" target="_blank" className="flat-button">Github <FontAwesomeIcon className="ic" icon={faGithub} color="white" fontSize={"20px"} /></Link>
            <Link to="/Portfolio/contact" className="flat-button cont">Contact Me! <FontAwesomeIcon className="ic" icon={faContactCard} color="white" fontSize={"20px"} /></Link>
        </div>
        
    </div>
        <Loader type="line-scale" />
    </>
}

export default Home;