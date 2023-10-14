import React from 'react'

export default function HiddenCode({sequence, win}) {
    console.log(sequence)
  
    
    return (
        <div> 
            
            <div style={{marginTop:"20px"}}>
                <h5>Can you crack the code?</h5>
                
                <br/>
                { win === true ? 
                <div>
                    
                    <br/>
                    <h5>CONGRATS</h5>
                    <img alt="winner" id="winner" src="https://www.netcov.com/wp-content/pubfiles/2022/07/shutterstock_1092829541.jpg"/>
                    <br/>
                    <br/>
                </div>
               : 
                <div>
                   
                    <img id="lock-img" alt="lock" src="https://img.freepik.com/premium-vector/closed-padlock-digital-background-cyber-security_42077-21756.jpg"/>
                    <br/>
                    <br/>
                    <p id="message">The code consists of numbers between 0 and 7</p>
                </div>
                }
                
            </div>
        </div>
    )
}
