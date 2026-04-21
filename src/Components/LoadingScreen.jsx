import {useTypewriter, Cursor} from "react-simple-typewriter"

const LoadingScreen = () => {
const [typeEffect] = useTypewriter({
    words: ['Architecture Portfolio'],
    typeSpeed:100
})
    return (
        <div className="loading-page">
            <h1 className="loading-message"><span>{typeEffect}</span></h1> 
            <span><Cursor></Cursor></span>
        </div>
    );
}
 
export default LoadingScreen;
