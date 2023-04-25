import {React, useContext} from 'react'
import GlobalContext from '../context/Contexts'

export default function Action({GameOver,Winner}) {
  const globalContext = useContext(GlobalContext);
    const css = {
        display:'flex',  
        justifyContent:'center',
        gap:'20px',
        flexWrap:'wrap'
    }
    if(GameOver && Winner){
      return (
        <div className='ActionFlex' style={css}>            
            <span className='Winner'>Player {Winner} is the Winner!!</span>
            <button className="reset" onClick={globalContext.ResetBoard}>Reset Board</button>        
        </div>
      )
    }else if(GameOver){
      return (
        <div className='ActionFlex' style={css}>            
            <span className='GameOver'>It's a tie!!</span>
            <button className="reset" onClick={globalContext.ResetBoard}>Reset Board</button>        
        </div>
      )
    }else{
      return (
        <div className='ActionFlex' style={css}>
            <span className='CurrentPlayer'>Player {globalContext.CurrentPlayer}'s Turn</span>
            <span className='MovesLeft'>{globalContext.MovesLeft} Moves Left </span>
            <button className="reset" onClick={globalContext.ResetBoard}>Reset Board</button>        
        </div>
      )
    } 
  
}
