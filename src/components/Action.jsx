import {React, useContext} from 'react'
import GlobalContext from '../context/Contexts'

export default function Action() {
  const globalContext = useContext(GlobalContext);
    const css = {
        display:'flex',  
        justifyContent:'center',
        gap:'20px',
        flexWrap:'wrap'
    }
  return (
    <div className='ActionFlex' style={css}>
        <span className='CurrentPlayer'>Player {globalContext.CurrentPlayer}'s Turn</span>
        <span className='MovesLeft'>{globalContext.MovesLeft} Moves Left </span>
        <button className="reset" onClick={globalContext.ResetBoard}>Reset Board</button>        
    </div>
  )
}
