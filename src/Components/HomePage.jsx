import img2 from "../images/img2.jpg"
import img3 from "../images/img3.jpg"
import img4 from "../images/img4.jpg"
import img5 from "../images/img5.jpg"
import img6 from "../images/img6.jpg"
import img7 from "../images/img7.jpg"
import img8 from "../images/img8.jpg"
import img9 from "../images/img9.jpg"


import { useEffect, useState } from "react"

const HomePage = () => {
        const [currentSlide, setCurrentSlide] = useState(0);
        const images = [img4, img2, img3, img5, img6, img7, img8, img9];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        },4000);

        return () => clearInterval(interval);
    }, [images.length]); 

    return (
        <>
            <div className="img-container">
                <div className="carousel-container">
                
                    {images.map((image, index) => (
                
                    <img
                        key={index}
                        className={index === currentSlide ? 'active' : 'image'}
                        src={image}
                        alt={`Slide ${index}`}
                    />
                ))}
                </div>
            </div>
        </>
    );
}

export default HomePage;
