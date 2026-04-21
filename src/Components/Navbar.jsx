import logo from "../images/logo.png"
import { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"
import { FaRegCopy } from "react-icons/fa6";
import { IoCloudDownloadOutline } from "react-icons/io5";
import axios from 'axios'

const NavBar = ({ textEnter, textLeave }) => {

    const [displayEmail, setDisplayEmail] = useState(false);
    const [curriculumClicked, setCurriculumClicked] = useState(false);
    const [inputChecked, setInputChecked] = useState(false);
    const location = useLocation();


    useEffect(() => {
        setInputChecked(false);
    }, [location]);


    const handleCurriculumClick = () => {
        setCurriculumClicked(true);
        textLeave()
    };
    useEffect(() => {
        if (location.pathname !== "/curriculum") {
            setCurriculumClicked(false);
        }
    }, [location.pathname]);

    const handleDownload = () => {

        const url = './Lebenslauf_Amparo_Cabezuelo_Architect.pdf';
        const fileName = 'Lebenslauf_Amparo_Cabezuelo_Architect.pdf'

        axios
            .get(url, { responseType: 'blob' })
            .then(response => {
                const href = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = href;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(error => console.error('Error downloading file:', error));
    };
    const handleContactClick = () => {
        setDisplayEmail(!displayEmail);
    }
    const handleCopyEmail = () => {
        navigator.clipboard.writeText("amcasep@gmail.com")
            .then(() => {
                console.log('Email copied to clipboard');
            })
            .catch(error => {
                console.error('Error copying email to clipboard:', error);
            });
        handleContactClick()
    };




    return (
        <>
            <div className="NavBar">
                <img src={logo} alt="Portfolio logo" />

                <nav className="navLinks" aria-label="Main navigation">
                    <Link to="/" className="home"><h5 onMouseEnter={textEnter} onMouseLeave={textLeave}>Home</h5></Link>
                    <Link to="/projects"><h5 onMouseEnter={textEnter} onMouseLeave={textLeave} >Projects</h5></Link>
                    {curriculumClicked ? (
                        <div onMouseEnter={textEnter} onMouseLeave={textLeave}>
                            <h5 className="downloadIcon"><IoCloudDownloadOutline onClick={handleDownload} /></h5>
                        </div>
                    ) : (
                        <Link to="/curriculum" onClick={handleCurriculumClick}><h5 onMouseEnter={textEnter} onMouseLeave={textLeave} >Curriculum</h5></Link>
                    )}
                    <Link to="/fotography"><h5 onMouseEnter={textEnter} onMouseLeave={textLeave} >Fotography</h5></Link>
                </nav>

                <div className="navContact">
                    {displayEmail ? (
                        <h5 onClick={handleCopyEmail} onMouseEnter={textEnter} onMouseLeave={textLeave}>amcasep@gmail.com <FaRegCopy /></h5>
                    ) : (
                        <h5 onClick={handleContactClick} onMouseEnter={textEnter} onMouseLeave={textLeave}>Contact</h5>
                    )}
                </div>


            </div>

            <div className="NavBar2">
                <img src={logo} alt="Portfolio logo" />

                <div id="menuToggle">
                    <input type="checkbox" checked={inputChecked} onChange={() => setInputChecked(!inputChecked)} />
                    <span className="line1"></span>
                    <span className="line2"></span>
                    <span className="line3"></span>
                    <div id="menu">
                        <Link to="/" ><h5>Home</h5></Link>
                        <Link to="/projects"><h5>Projects</h5></Link>
                        {curriculumClicked ? (
                            <div>
                                <h5 ><IoCloudDownloadOutline onClick={handleDownload} /></h5>
                            </div>
                        ) : (
                            <Link to="/curriculum" onClick={handleCurriculumClick}><h5>Curriculum</h5></Link>
                        )}
                        <Link to="/fotography"><h5>Fotography</h5></Link>
                        {displayEmail ? (
                            <h5 onClick={handleCopyEmail}>amcasep@gmail.com <FaRegCopy /></h5>
                        ) : (
                            <h5 onClick={handleContactClick}>Contact</h5>
                        )}
                    </div>
                </div>



            </div>
        </>
    );
}

export default NavBar;
