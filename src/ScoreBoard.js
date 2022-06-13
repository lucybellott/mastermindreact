import React from 'react'
import {useEffect, useState} from 'react'

export default function ScoreBoard({win, trialCounter}) {
  
  const [boardData, setBoardData] = useState([])
  const [winner, setWinner] = useState("")
  

  //GET request from backend
  useEffect(() => {
    fetch('http://192.168.1.223/games')
    .then(resp => resp.json())
    .then(data => {
        
        setBoardData(data)
     })
    }, [])


    let sortedData = boardData.sort((a, b) => (a.trials > b.trials) ? 1 : -1)
    
//Render sorted winners data from backend
 const boardInfo = sortedData.map(item => {

  //  console.log(item.trials)
        return <>
            
            <tr key={item.id}>
                <td>{item.username}</td>
                <td>{item.trials} </td>
            </tr>
        </>
    })



 const pastTrials = boardData.map(item => item.trials)
 let maxTrials = Math.max(...pastTrials)
 
 
 //Compare new score to existing 10 scores on the board
 function betterScore () {
    
    if(trialCounter < maxTrials) {
            return true
        }

    else if (trialCounter >= maxTrials && pastTrials.length < 10)
        { 
            return true
        }  
      
    }
//console.log(pastTrials.length)
  
    //Replacing the last place on the board with new winner with that has a better score
    const displayWinner = (newWinner) => {

         let winnerArray = [...boardData, newWinner]
           //console.log(winnerArray)
            if (winnerArray.length > 10 ) {
                
                winnerArray.sort((a, b) => (a.trials > b.trials) ? 1 : -1)
                winnerArray.pop()

            }

            else {
                winnerArray.sort((a, b) => (a.trials > b.trials) ? 1 : -1)
            }
    
           setBoardData(winnerArray)
    }

    
    //POST request to the backend  
    const handleSubmit = (e) => {
        e.preventDefault()
    
      let wallData = {
            username: winner,
            trials: trialCounter
            }
    
            fetch('http://localhost:3000/games', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    },
                body: JSON.stringify(wallData),
                })
                .then((res) => res.json())
                .then(inputData => {
                      displayWinner(inputData)
                      
                      setWinner("")
                })
                .catch((error) => {
                    console.log(error)
                  })
    }
    
    //console.log(betterScore())
    return (
      <div>

        <h4> 🏁 Wall of Champions 🏁</h4>
        <br/>

            {win === true && betterScore() === true ?
            <div>
                <form onSubmit={handleSubmit}>
                <label>Add your name to the Top 10 Wall of Champions!</label>
                <br/>
                <br/>
                <input type="text" placeholder="Enter your Name" value={winner} onChange={(e)=> setWinner(e.target.value)}></input>
                <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div> 
            
            : null
            }
           
        {/* <p id="message">Your number of trials must be lower than existing ones to enter the board</p>  */}

        <table>
          <tbody id="score-board">
            <tr>
                <th>Name</th>
                <th>Number of trials</th>
            </tr>
              {boardInfo}
          </tbody>
        
        </table>
        
    </div>
  )
}
