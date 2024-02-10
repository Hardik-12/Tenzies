/* eslint-disable no-unused-vars */
import React from "react";
import Die from "./components/Die";
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"
import './App.css'


export default function App(){
  const [randomArray, setRandomArray] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)


  React.useEffect(() => {
    const held = randomArray.every(obj => obj.isHeld)
    const dieValue = randomArray.every(obj => obj.value === randomArray[0].value)

    if(held && dieValue){
      setTenzies(true)
      console.log("You won")
    }
  }, [randomArray])
  
  function allNewDice(){
    const randomNumberArray = []
    for(let i=0;i<10;i++){
      randomNumberArray.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid()
      })
    }
    return randomNumberArray
  }


  function handleClick(){
    if(tenzies){
      setTenzies(false)
      setRandomArray(allNewDice())
    } 
      
    setRandomArray(prevArray => {
      return prevArray.map(obj => {
        return !obj.isHeld ? {...obj, value: Math.floor(Math.random() * 6) + 1, isHeld: false, id: nanoid()} : obj
    })
      
    })
  }


  function holdDice(id){
    setRandomArray(prevArray => prevArray.map(obj => {
      return obj.id === id ? {...obj, isHeld: !obj.isHeld} : obj
    }))
    console.log(id)
  }

  const diceValues = randomArray.map(obj => {
    return (
      <Die key={obj.id} value={obj.value} isHeld={obj.isHeld} fun={() => holdDice(obj.id)} />
    )
  })
  

  return (
    <main className="main-area">
      {tenzies && <Confetti width={450} height={500} />}
      <section className="sub-area">
        <h1 className="game-heading">Tenzies</h1>
        <p className="game-rule">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dices">
          {diceValues}
        </div>
        <button className="roll" onClick={handleClick}>{tenzies ? "New Game" : "Roll"}</button>
      </section>
    </main>
  )
}