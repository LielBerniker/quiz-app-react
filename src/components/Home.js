import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import './Home.css'
/*component for the beginning page*/ 
function Home() {
  const [questionsRand, setQuestionsRand] = React.useState([])
  const [playerName, setPlayerNmae] = React.useState("")

  /*update the questions from the api */ 
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=100")
      .then((res) => res.json())
      .then(data => get8Questions(data.results))
      /*get questions randomly from the api */ 
    function get8Questions(arrOfQuestions) {

      const newarr = [];
      const beenchoose = [];
      var i = 0;
      while (i < 8) {
        var rand_num = Math.floor(Math.random() * arrOfQuestions.length);
        if (i < 4) {
          if (!beenchoose.includes(rand_num) && arrOfQuestions[rand_num].difficulty === "easy") {
            beenchoose.push(rand_num);
            newarr.push(arrOfQuestions[rand_num]);
            i = i + 1;
          }
        }
        else if (i < 6) {
          if (!beenchoose.includes(rand_num) && arrOfQuestions[rand_num].difficulty === "medium") {
            beenchoose.push(rand_num);
            newarr.push(arrOfQuestions[rand_num]);
            i = i + 1;
          }
        }
        else {
          if (!beenchoose.includes(rand_num) && arrOfQuestions[rand_num].difficulty === "hard") {
            beenchoose.push(rand_num);
            newarr.push(arrOfQuestions[rand_num]);
            i = i + 1;
          }
        }
      }
      console.log(newarr)
      setQuestionsRand(newarr);
    }
  }, [])
/*change name*/ 
  function handleChangeName(event) {
    setPlayerNmae(event.target.value)
  }

  return (
    <Fragment>
      <Helmet><title>Quiz App</title></Helmet>
      <video src='/videos/home-vid.mp4' autoPlay loop muted id='myVideo' />
      <div className='main-info'>
        <div>
          <h1 className='h1-home'>My Quiz Game</h1>
          <h5 className='h5-home'>Welcome to Quiz Game ! </h5>
          <h4 className='h4-home'>please insert your name</h4>
          <input
            className='input-name'
            type="text"
            placeholder='Name'
            onChange={handleChangeName} />
          {playerName !== "" && (<Link className='start-btn'
            to="/play"
            state={{ playerName: playerName, allQuestions: questionsRand }} >Start Game</Link>)}
        </div>

      </div>
    </Fragment>
  );
}
export default Home;