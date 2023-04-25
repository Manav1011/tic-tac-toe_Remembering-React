import React, { useEffect, useState, useContext } from 'react'
import Square from './square'
import GlobalContext from '../context/Contexts'

export default function MainContainer({ChangePlayer,UpdateMoves}) {     
  const globalContext = useContext(GlobalContext);
  const Circle = `<svg height="100%" width="100%"><circle cx="50%" cy="50%" r="40%" fill="blue"></circle></svg>`;
  const Cross = `<svg style="width: 100%; height: 100%;" viewBox="0 0 122.88 122.88"><path class="cls-1" d="M6,6H6a20.53,20.53,0,0,1,29,0l26.5,26.49L87.93,6a20.54,20.54,0,0,1,29,0h0a20.53,20.53,0,0,1,0,29L90.41,61.44,116.9,87.93a20.54,20.54,0,0,1,0,29h0a20.54,20.54,0,0,1-29,0L61.44,90.41,35,116.9a20.54,20.54,0,0,1-29,0H6a20.54,20.54,0,0,1,0-29L32.47,61.44,6,34.94A20.53,20.53,0,0,1,6,6Z"/></svg>`;  
  const [PlayerZero,setMovesZero] = useState([])
  const [PlayerOne,setMovesOne] = useState([])

  const WinndersWay = [
    [[0,0],[0,1],[0,2]],
    [[1,3],[1,4],[1,5]],
    [[2,6],[2,7],[2,8]],
    [[0,0],[1,3],[2,6]],
    [[0,1],[1,4],[2,7]],
    [[0,2],[1,5],[2,8]],
    [[0,0],[1,4],[2,8]],
    [[0,2],[1,4],[2,6]]
  ]

  useEffect(()=>{           
    if(globalContext.MovesLeft == 0){
      console.log(PlayerZero)
      console.log(PlayerOne)
    }    
  },[globalContext.matrix])

  const HandleClick = (index) => { 
    if(!document.getElementById(index.index[0]+','+index.index[1]).getAttribute('disabled')){
      document.getElementById(index.index[0]+','+index.index[1]).innerHTML=globalContext.CurrentPlayer==0?Circle:Cross
      UpdateMoves(globalContext.MovesLeft-1)    
      let arr = index.index  
      let newMatrix = [...globalContext.matrix];
      newMatrix[arr[0]][arr[1]] = 0;
      globalContext.changeMatrix(newMatrix);    
      document.getElementById(index.index[0]+','+index.index[1]).setAttribute('disabled','disabled')
      if(globalContext.CurrentPlayer == 0){
        setMovesZero([...PlayerZero,index.index])        
      }else{
        setMovesOne([...PlayerOne,index.index])        
      }            
      ChangePlayer(globalContext.CurrentPlayer==0?1:0)
    }
  }
  return (
    <div className='MainContainer'>
     {globalContext.matrix.map((row,rowIndex) => {       
        return row.map((cell,cellIndex) => {
          if(rowIndex == 2){
            if(cellIndex == 2 )return <Square style={{backgroundColor: "white"}} HandleClick={HandleClick} key={cellIndex} index={[rowIndex,cellIndex]}/>
              else return <Square style={{backgroundColor: "white",borderRight: "1px solid black"}} HandleClick={HandleClick} key={cellIndex} index={[rowIndex,cellIndex]}/>
          }if(cellIndex == 2){
            return <Square style={{backgroundColor: "white", borderBottom: "1px solid black"}} HandleClick={HandleClick} key={cellIndex} index={[rowIndex,cellIndex]}/>
          }else{
            return <Square style={{backgroundColor: "white",borderRight: "1px solid black", borderBottom: "1px solid black"}} HandleClick={HandleClick} key={cellIndex} index={[rowIndex,cellIndex]}/>
          }         
      })     
     })}
    </div>
  )
}
