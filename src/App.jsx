
import './style.css'
import { useEffect, useState } from 'react'
import Card from './card'
import EndScreen from './endScreen'
let cardClick

function App() {
  const [allCards, setAllCards] = useState([])
  const [scores, setScores] = useState([{
    user: 0,
    score: 0
  },{
    user: 1,
    score: 0
  }])
  //turn states
  const [turn, setTurn] = useState(0)
  const [cardIn, setCardIn ] = useState(0)
  //cardValue States
  const [firstCard, setFirstCard] = useState({})
  const [gameEnd, setGameEnd] = useState(false)


  let dummyArray = []
  let dummyScores = []


  const checkGameEnd = () => {
    const notDone = allCards.filter(el => el.state != 'done')
    if(notDone.length == 0){
      setGameEnd(true)
    }else{
      setGameEnd(false)
    }
  }

  const changeTurn = (stat, secondCard) => {
    console.log('next')
    dummyArray = allCards
    dummyScores = scores
    // console.log(dummyScores)

    if(turn == 1){
      // console.log('stat', stat)
      if(stat){
        dummyScores[turn].score += 1;
        setScores(dummyScores)
        dummyArray[dummyArray.indexOf(firstCard)].state = 'done'
        dummyArray[dummyArray.indexOf(secondCard)].state = 'done'
        setTurn(turn)
        setAllCards(dummyArray)
        checkGameEnd()
      }else{
        dummyArray[dummyArray.indexOf(firstCard)].state = 'normal'
        dummyArray[dummyArray.indexOf(secondCard)].state = 'normal'
        setAllCards(dummyArray)
        setTurn(0)
        checkGameEnd()
      }
    }else{
      if(stat){
        dummyScores[turn].score += 1;
        setScores(dummyScores)
        dummyArray[dummyArray.indexOf(firstCard)].state = 'done'
        dummyArray[dummyArray.indexOf(secondCard)].state = 'done'
        setTurn(turn)
        setAllCards(dummyArray)
        checkGameEnd()
      }else{
        dummyArray[dummyArray.indexOf(firstCard)].state = 'normal'
        dummyArray[dummyArray.indexOf(secondCard)].state = 'normal'
        setAllCards(dummyArray)
        setTurn((prev) => prev +=1 )
        checkGameEnd()
      }
    }
  }

  const compareCards = (data)=>{
    const secondCard = data
    // console.log('second', secondCard)
    // console.log('first', firstCard)
    if(secondCard.id == firstCard.id){
      // console.log('yes')
      setCardIn(0)
      setTimeout(()=>{
        const stat = true
        changeTurn(stat, secondCard)
      }, 1000)
    }else{
      // console.log('no')
      dummyArray = allCards
      setCardIn(0)
      const stat = false
      setTimeout(()=>{
        changeTurn(stat, secondCard)
      }, 1000)
    }
    
  }

  cardClick = (data) => {
    // console.log(data)
    if(cardIn == 0){
      //setFirstCard
      setFirstCard(data)
      dummyArray = allCards
      // console.log(dummyArray)
      dummyArray[dummyArray.indexOf(data)].state = 'flipped'
      // console.log(dummyArray)
      setAllCards(dummyArray)
      setCardIn(1)
    }else{
      //setSecondCard, Compare, changeTurn
      dummyArray = allCards
      // console.log(dummyArray)
      dummyArray[dummyArray.indexOf(data)].state = 'flipped'
      // console.log(dummyArray)
      setAllCards(dummyArray)
      compareCards(data)
    }
  }
  


  // console.log('card', cardIn)
  // console.log('turn', turn)

  useEffect(()=>{
    fetch('../src/cards.json').then((response) => response.json())
    .then((json) => {
        for (let index = 0; index <= 1; index++) {
          json.cards.forEach(element => {
            dummyArray.push(element)
          }); 
        }
        // console.log(dummyArray[19])
        dummyArray = dummyArray.map((el)=> ({
          label: el.label,
          image: el.image,
          id: el.id,
          state: 'normal',
        }))
        console.log(dummyArray)
        dummyArray = dummyArray.sort(() => Math.random() - 0.5);
        setAllCards(dummyArray)
        // setScores(dummyScores)
    })
  }, [])

  useEffect(()=>{

  }, [])

  // console.log(allCards)

  return (
    <div className={`container t${turn}`}>
        {/* <h1>Turn {turn}</h1> */}
        <div className="memoryGrid">
          {
            allCards.map((card) => (
              <Card data={ card } key={ allCards.indexOf(card) }/>
            ))
          }
        </div>

        <div className="scores">
          <div className="part">
            { scores.length > 0? (
              <>{scores[0].score}</>
            ):(<>0</>) }
          </div>
          <div className="part">
          { scores.length > 0? (
              <>{scores[1].score}</>
            ):(<>0</>) }
          </div>
        </div>
        {
          // console.log(scores)
        }
        {
          scores[0].score > scores[1].score ? (
            <EndScreen visible= { gameEnd } results= { scores } winner={ 'blue' } />
          ):(
            <EndScreen visible= { gameEnd } results= { scores } winner={ 'red' } />
          )
        }
    </div>
  )
}

export  {App, cardClick}
