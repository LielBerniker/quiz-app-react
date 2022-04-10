import React, { Fragment } from 'react'
import { Link, useLocation, Router } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import './ScorePage.css'
import Confetti from 'react-confetti'
/*commponent for the ending page*/ 
function ScorePage() {
    const location = useLocation()
    const [finalScore, setFinalScore] = React.useState(0)
    function run_audio()
    {
     document.getElementById('Ending-sound').play()
    }
    /*set the sound and video*/ 
    React.useEffect(() => {
        setFinalScore(location.state.score)
        run_audio()
    }, [])
    return (
        <Fragment>
            <Helmet>Quiz App - Score</Helmet>
            <video src='/videos/final-vid.mp4' autoPlay loop muted id='myVideo1' />
            <Fragment>
              
                <audio id='Ending-sound' src='/sounds/Ending.mp3' loop></audio>
                <Confetti/>
            </Fragment>
            <div className='main-div'>
                <h1>Quiz has ended</h1>
                <div>
                    <h2>Your score is: {finalScore}</h2>
                </div>
                <div>
                    <Link className='go-back-btn' to="/">Play again</Link>
                </div>
            </div>
        </Fragment>

    );
}
export default ScorePage;