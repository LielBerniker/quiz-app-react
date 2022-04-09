import React, { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { FiCheckCircle } from "react-icons/fi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { AiFillClockCircle } from "react-icons/ai";
import './GamePage.css'
import M from 'materialize-css'

function GamePlay() {
    const location = useLocation()
    const [allQuestions, setAllQuestions] = React.useState([])
    const [playerName, setPlayerNmae] = React.useState("")
    const [currentQN, setcurrentQN] = React.useState(1)
    const [currentQuestion, setCurrentQuestion] = React.useState({})
    const [wrightQuestions, setWrightQuestions] = React.useState(0)
    const [score, setScore] = React.useState(0)
    const [timePass, setTimePass] = React.useState({})
    const [Val1, setVal1] = React.useState("")
    const [Val2, setVal2] = React.useState("")
    const [Val3, setVal3] = React.useState("")
    const [Val4, setVal4] = React.useState("")
    const [choose4, setChoose4] = React.useState(true)
    const [canChoose, setCanChoose] = React.useState(true)

    function check_answer(value1) {
        if (value1 === currentQuestion.correct_answer) {
            setScore(score + 1)
            setWrightQuestions(wrightQuestions + 1)
            setCanChoose(false)
            document.getElementById('correct-sound').play()
            M.toast(
                {
                    html:"you are wright :)",
                    classes:'toast-valid',
                    displayLength: 1500
                })
        }
        else {
            document.getElementById('wrong-sound').play()
            M.toast(
                {
                    html:"you are wrong :(",
                    classes:'toast-in-valid',
                    displayLength: 1500
                })
        }
    }

    function set_values(cur_q) {
        if (cur_q.type === "multiple") {
            setChoose4(true)
            const cur_q_arr = []
            var rand_num = Math.floor(Math.random() * 4);
            var wrong_count = 0
            for (let i = 0; i < 4; i++) {
                if (i == rand_num)
                    cur_q_arr.push(cur_q.correct_answer)
                else {
                    cur_q_arr.push(cur_q.incorrect_answers[wrong_count])
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
                setVal1(cur_q.correct_answer)
                setVal2(cur_q.incorrect_answers[0])
            }
            else {
                setVal2(cur_q.correct_answer)
                setVal1(cur_q.incorrect_answers[0])
            }
        }
    }

    function next_questain() {
        if (currentQN < 8) {
            setcurrentQN(currentQN + 1)
            setCurrentQuestion(allQuestions[currentQN - 1])
            set_values(currentQuestion)
            setCanChoose(true)
        }
        else {
            console.log("put here link to final page")
        }
    }

    React.useEffect(() => {
        setPlayerNmae(location.state.playerName)
        setAllQuestions(location.state.allQuestions)
        setCurrentQuestion(location.state.allQuestions[0])
        set_values(location.state.allQuestions[0])
    }, [])

    return (
        <Fragment>
            <Helmet><title>Quiz App</title></Helmet>
            <Fragment>
                <audio id='correct-sound' src='/sounds/Correct.mp3'></audio>
                <audio id='wrong-sound' src='/sounds/Wrong.mp3'></audio>
            </Fragment>
            <div className='questions'>
                <h2 className='top-line'>Quiz Mode</h2>
                <div className='lifeline-container'>
                    <p>
                        <FiCheckCircle className='vi-icon' />
                        <span className='liseline'>{wrightQuestions}</span>
                    </p>
                    <p>
                        <HiOutlineLightBulb className='lightbulb-icon' />
                        <span className='liseline'>5</span>
                    </p>
                </div>
                <div className='info-1-container'>
                    <p>
                        <span className='left' style={{ float: 'left' }}>{currentQN} of 8</span>
                    </p>
                    <p>
                        <span className='right-game'> 2:15< AiFillClockCircle className='clock-icon' /></span>
                    </p>
                </div>
                <h5 className='h5-ingame'>{currentQuestion.question}</h5>
                <div className='options-container'>
                    <p onClick={() => {
                        check_answer(Val1);
                    }}  className='option' >{Val1}</p>
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
                    <button className='quit-btn'>quit</button>
                </div>
            </div>
        </Fragment>
    );
}
export default GamePlay;