import {React,useState} from 'react'

export default function Square({style,HandleClick,index}) {    
  return (
    <div className="card" style={style}>
          <button onClick={() => HandleClick({index})} className="clickable" id={index} style={{border:'none',width:'100%',height:'100%',backgroundColor: 'transparent'}}>            
          </button>
    </div>
  )
}
