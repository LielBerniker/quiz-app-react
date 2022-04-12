import React, { Fragment } from 'react'
import { Link, useLocation, Router } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { FiCheckCircle } from "react-icons/fi";
import { FaFistRaised } from "react-icons/fa";
import { AiFillClockCircle } from "react-icons/ai";
import { GiStarMedal } from "react-icons/gi";
import './GamePage.css'
import M from 'materialize-css'

/*the main component of the game play page*/ 
function GamePlay() {
    var interval = null
    const location = useLocation()
    const [allQuestions, setAllQuestions] = React.useState([])
    const [playerName, setPlayerNmae] = React.useState("")
    const [currentQN, setcurrentQN] = React.useState(1)
    const [currentQuestion, setCurrentQuestion] = React.useState("")
    const [wrightQuestions, setWrightQuestions] = React.useState(0)
    const [score, setScore] = React.useState(0)
    const [timePass, setTimePass] = React.useState({})
    const [Val1, setVal1] = React.useState("")
    const [Val2, setVal2] = React.useState("")
    const [Val3, setVal3] = React.useState("")
    const [Val4, setVal4] = React.useState("")
    const [choose4, setChoose4] = React.useState(true)
    const [canChoose, setCanChoose] = React.useState(true)
    const [showFinal, setShowFinal] = React.useState(false)

    const [counter, setCounter] = React.useState(60);

    
/*run the timer from 60 to 0*/ 
    React.useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000)


        return () => clearInterval(timer);
    }, [counter]);


/*use the click sound*/ 
    function play_click_sound() {
        document.getElementById('click-sound').play()
    }

/*check if the answer is wright or wrong*/ 
    function check_answer(value1) {
        
/*check if the game has been finished*/ 
        if(showFinal===true){
            M.toast(
                {
                    html: "You finish the Quiz, please press finish for the results",
                    classes: 'toast-finish',
                    displayLength: 3000
                })
        }
        /*check if an option has already been chsen*/ 
        else if(canChoose===false)
        {
            M.toast(
                {
                    html: "You cant choose an answer more then once!!!",
                    classes: 'toast-allready',
                    displayLength: 3000
                })
        } 
        /*check if the timer did not end*/ 
        else if(counter <= 0) {
            M.toast(
                {
                    html: "Time is over, please go to the next question",
                    classes: 'toast-over',
                    displayLength: 3000
                })
        }
        /*update for correct answer*/ 
        else {
            /*check if the answer is correct*/ 
            if (value1 === currentQuestion.correct_answer) {
                setScore(score +get_score())
                setWrightQuestions(wrightQuestions + 1)
                setCanChoose(false)
                setTimeout(() => {
                    document.getElementById('correct-sound').play()
                }, 500)
                M.toast(
                    {
                        html: "you are wright :)",
                        classes: 'toast-valid',
                        displayLength: 1500
                    })
            }
            else {
                setTimeout(() => {
                    document.getElementById('wrong-sound').play()
                }, 500)
                setCanChoose(false)
                M.toast(
                    {
                        html: "you are wrong :(",
                        classes: 'toast-in-valid',
                        displayLength: 1500
                    })
            }
        }
    }
    /*calcolate the score by the time and question diffuclty*/ 
    function get_score() {
        var point_get
        if (counter > 40) {
            point_get = 3
        }
        else if (counter > 20) {
            point_get = 2
        }
        else {
            point_get = 1
        }

        if (currentQN < 5) {
            point_get = point_get
        }
        else if (currentQN < 7) {
            point_get = point_get * 2
        }
        else {
            point_get = point_get * 3
        }
        return point_get
    }
    /*get the answers for the question*/ 
    function set_values(cur_q) {
        if (cur_q.type === "multiple") {
            setChoose4(true)
            const cur_q_arr = []
            var rand_num = Math.floor(Math.random() * 4);
            var wrong_count = 0
            for (let i = 0; i < 4; i++) {
                if (i == rand_num)
                    cur_q_arr.push(cur_q.correct_answer.replace(/&quot;/g, '"').replace(/&#039;/g,"'"))
                else {
                    cur_q_arr.push(cur_q.incorrect_answers[wrong_count].replace(/&quot;/g, '"').replace(/&#039;/g,"'"))
                    wrong_count = wrong_count + 1
                }
            }
            setVal1(cur_q_arr[0])
            setVal2(cur_q_arr[1])
            setVal3(cur_q_arr[2])
            setVal4(cur_q_arr[3])
        }
        else {
            setChoose4(false)
            var rand_num = Math.floor(Math.random() * 2);
            if (rand_num == 0) {
                setVal1(cur_q.correct_answer.replace(/&quot;/g, '"').replace(/&#039;/g,"'"))
                setVal2(cur_q.incorrect_answers[0].replace(/&quot;/g, '"').replace(/&#039;/g,"'"))
            }
            else {
                setVal2(cur_q.correct_answer)
                setVal1(cur_q.incorrect_answers[0])
            }
        }
    }
/*update information for next questiond*/ 
    function next_questain() {
        
        if (currentQN < 8) {
            setCounter(60)
            play_click_sound()
            const cur_q = allQuestions[currentQN]
            const cur_q_d = cur_q.question.replace(/&quot;/g, '"').replace(/&#039;/g,"'")
            const count_q = currentQN+1
            set_values(cur_q)
            setcurrentQN(count_q)
            setCurrentQuestion(cur_q_d)
            setCanChoose(true)
        }
        else {
            setShowFinal(true)
            M.toast(
                {
                    html: "You finish the Quiz, please press finish for the results",
                    classes: 'toast-finish',
                    displayLength: 3000
                })
        }
    }

/*update info at the beginning*/ 
    React.useEffect(() => {
        setPlayerNmae(location.state.playerName)
        setAllQuestions(location.state.allQuestions)
        const cur_q = location.state.allQuestions[0].question.replace(/&quot;/g, '"').replace(/&#039;/g,"'")
        setCurrentQuestion(cur_q)
        set_values(location.state.allQuestions[0])
    }, [])

    return (
        <Fragment>
            <Helmet><title>Quiz App</title></Helmet>
            <Fragment>
                <audio id='correct-sound' src='/sounds/Correct.mp3'></audio>
                <audio id='wrong-sound' src='/sounds/Wrong.mp3'></audio>
                <audio id='click-sound' src='/sounds/Mouse-click.mp3'></audio>
            </Fragment>



            
            <div className='questions'>
                <h1 className='top-line'>Quiz Mode</h1>
                <div className='lifeline-container'>
                    <p>
                        <FiCheckCircle className='vi-icon' />
                        <span className='liseline'>{wrightQuestions}</span>
                    </p>
                    <p>
                        <FaFistRaised className='fist-icon' />
                        <span className='liseline'>Player: {playerName}</span>
                    </p>
                </div>
                <div className='info-1-container'>
                    <p>
                        <span className='left' style={{ float: 'left' }}>{currentQN} of 8</span>
                    </p>
                    <p>
                        <span className='right-game'>{counter}<  AiFillClockCircle className='clock-icon' /></span>
                    </p>
                </div>
                <div>
                <span className='right-game'>{score} points<  GiStarMedal className='clock-icon' /> </span>
                </div>
                <h5 className='h5-ingame'>{currentQuestion}</h5>
                <div className='options-container'>
                    <p onClick={() => {
                        check_answer(Val1);
                    }} className='option' >{Val1}</p>
                    <p onClick={() => {
                        check_answer(Val2);
                    }} className='option' >{Val2}</p>
                </div>
                {choose4 && (<div className='options-container'>
                    <p onClick={() => {
                        check_answer(Val3);
                    }} className='option' >{Val3}</p>
                    <p onClick={() => {
                        check_answer(Val4);
                    }} className='option'>{Val4}</p>
                </div>)}

                <div className='buton-container'>
                    <button className='next-btn' onClick={() => {
                        next_questain();
                    }}>next</button>
                    <Link className='quit-btn' to="/">quit</Link>
                    {showFinal && (<Link className='final-btn'
            to="/final"
            state={{ score: score }} >Finish</Link>)}
                </div>
            </div>
        </Fragment>
    );
}
export default GamePlay;