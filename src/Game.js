import React from 'react'
import HiddenCode from './HiddenCode'
import ScoreBoard from './ScoreBoard'
import {useState} from 'react'


export default function Game({sequence}) {

    //Setting state for guess inputs
    const [inputData, setInputData] = useState({
        first: "0",
        second: "0",
        third: "0",
        fourth: "0"
      })

      
      const [newInputs, setNewInputs] = useState([0,0,0,0])

    //   let inputArray = newInputs.map((newinput) => {
    //     return <div>
    //         <input type="number" onChange={handleChange}></input>
    //     </div>
    //   })

    //   const handleNewInput = () =>




    const [turns, setTurns] = useState(10)
    
    const [win, setWin] = useState(false)
   
    const [logData, setLogData] = useState([])
    
    const [trialCounter, setTrialCounter] = useState(0)

    //Pushing input values into one array of guesses
    let playerGuess = [];
    playerGuess.push(inputData.first, inputData.second, inputData.third, inputData.fourth)
    
   
   
    //onChange function for guess inputs
    const handleChange = (e) => {
       
        //number entered can't be higher than 7
        if (e.target.value >= 0 && e.target.value <= 7) { 
             setNewInputs( inputData )
    }}
    
    let i;
    let rightNumberAndIndexCount = 0;
    let wrongIndexCount = 0;
   
   //onClick logic of Guess button
     function handleGuess() {
        
        const compare = logData.find((i) => {
             //console.log(i.guessedSequence)
 
           return  playerGuess.toString() === i.guessedSequence.toString()
                
                
        })

         //console.log(compare)

         if (compare) {
             alert(`You can't repeat the same sequence`)
         }
         else {

         
        
        let rightNumberAndIndex = ""
        let wrongIndex = ""
        let allWrongGuess =""
        setTurns(() => turns -1)
        setTrialCounter(() => trialCounter +1)
        
        
        //comparing playerGuess with generated sequence
        for(i = 0; i < sequence.length; i++) {
           
            
            //right number in the right position
            if (sequence[i] === playerGuess[i]) {
                rightNumberAndIndexCount++;
                rightNumberAndIndex = ` ${rightNumberAndIndexCount} right number(s) in the right position(s)`
                
            }

            //right number in the wrong position
            if (sequence[i] !== playerGuess[i] && playerGuess.includes(sequence[i])) {
                wrongIndexCount++;
                wrongIndex =`${wrongIndexCount} right number(s) in the wrong position(s)`
            }
            
            //sets win to true
            if (sequence[i] === playerGuess[i] && rightNumberAndIndexCount === 4) {
                setWin(true)
            }
           
      }
       //No correct numbers guessed
        if(rightNumberAndIndex === "" && wrongIndex ==="" ){
            allWrongGuess = "No correct numbers"
        } 
        
        // Data to display feedback
        const data = {correctAnswer: rightNumberAndIndex, 
                      guessedSequence: playerGuess, 
                      wrongPosition: wrongIndex,
                      wrongGuess: allWrongGuess
                    }
        
        setLogData([...logData, data])

     }

        //console.log(playerGuess)

       
                
     }
    
   
    return (
        
        <div className="numbers">
            <HiddenCode sequence={sequence} win={win}/>
           
            <div>
                <div>
                    {/* {inputArray} */}
                 {/* <input type="number" value={newInputs}></input> */}
                <input className="number-input" name="first" value={inputData.first} onChange={handleChange} type="number"></input>
                <input className="number-input" name="second" value ={inputData.second} onChange={handleChange} type="number"></input>
                <input className="number-input" name="third" value={inputData.third} onChange={handleChange} type="number"></input>
                <input className="number-input" name="fourth" value={inputData.fourth} onChange={handleChange} type="number"></input>
                <br/>
                <br/>
                </div>
              
                {/* if win is true */}
                {turns >= 0 && win === true ?
                    <>
                    <h4 className="win">👏👏 You win!!! 👏👏</h4> 
                    <br/>
                    <h5>Trials: {trialCounter}</h5>
                    </>
                    // if player still has turns left
                    : turns > 0 ?
                     <div>
                        <button type="button" className="btn btn-success" onClick={handleGuess}>Guess!</button>
                        <br/>
                        <br/>
                        <p>You have {turns} guesses left</p>
                       
                        <hr/>
                        {/* display feedback */}
                        {logData.map((item, index) => 
                            
                           <div key={index}>
                              <p>You guessed {item.guessedSequence}.</p>
                              <span className="win">{item.correctAnswer}</span> 
                              <span className="warning">{item.wrongPosition}</span> <span className="warning">{item.wrongGuess}</span> 
                              <br/><br/>
                            </div> )}
                            
                        </div>
                        // no more guesses left
                        : <h5>❌ You're out of guesses ❌</h5>
                }
            </div>
            <hr/>
            <ScoreBoard win={win} trialCounter={trialCounter}/>
         </div>
        
     
    )
}
