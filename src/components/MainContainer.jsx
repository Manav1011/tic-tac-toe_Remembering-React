import React, { useEffect, useState, useContext } from 'react'
import Square from './square'
import GlobalContext from '../context/Contexts'

export default function MainContainer({SetWinner,PlayerZero,PlayerOne,setMovesZero,setMovesOne,setGame,ChangePlayer,UpdateMoves}) {     
  const globalContext = useContext(GlobalContext);
  const Circle = `<svg height="100%" width="100%"><circle cx="50%" cy="50%" r="40%" fill="blue"></circle></svg>`;
  const Cross = `<svg style="width: 100%; height: 100%;" viewBox="0 0 122.88 122.88"><path class="cls-1" d="M6,6H6a20.53,20.53,0,0,1,29,0l26.5,26.49L87.93,6a20.54,20.54,0,0,1,29,0h0a20.53,20.53,0,0,1,0,29L90.41,61.44,116.9,87.93a20.54,20.54,0,0,1,0,29h0a20.54,20.54,0,0,1-29,0L61.44,90.41,35,116.9a20.54,20.54,0,0,1-29,0H6a20.54,20.54,0,0,1,0-29L32.47,61.44,6,34.94A20.53,20.53,0,0,1,6,6Z"/></svg>`;  
  const [CurrentMove,setMove] = useState('')

  const WinnersWay = {
    "00": [["01", "02"], ["10", "20"], ["11", "22"]],
    "01": [["11", "21"], ["00", "02"]],
    "02": [["01", "00"], ["12", "22"], ["11", "20"]],
    "10": [["11", "12"], ["00", "20"]],
    "11": [["10", "12"], ["01", "21"], ["00", "22"], ["02", "20"]],
    "12": [["11", "10"], ["02", "22"]],
    "20": [["21", "22"], ["00", "10"], ["02", "11"]],
    "21": [["20", "22"], ["01", "11"]],
    "22": [["20", "21"], ["02", "12"], ["00", "11"]]
}

  useEffect(()=>{        
    if(globalContext.MovesLeft == 0){
      setGame(true)
    }    
  },[globalContext.matrix])
  useEffect(()=>{
    if(globalContext.CurrentPlayer == 0){
        if(PlayerZero.length >2){
          WinnersWay[CurrentMove].forEach(element => {            
            if (element.every(val => PlayerZero.includes(val))) {
              SetWinner("0")
              setGame(true)
            }
          });
        }
    }else{
      if(PlayerOne.length >2){
        WinnersWay[CurrentMove].forEach(element => {
          if (element.every(val => PlayerOne.includes(val))) {
            SetWinner("1")
            setGame(true)
          }
      });
      }
    }
    ChangePlayer(globalContext.CurrentPlayer==0?1:0)
  },[PlayerZero,PlayerOne])

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
        setMovesZero([...PlayerZero,index.index[0]+""+index.index[1]])  
        let move = index.index[0]+""+index.index[1];
        setMove(move)
      }else{        
        setMovesOne([...PlayerOne,index.index[0]+""+index.index[1]])  
        let move = index.index[0]+""+index.index[1];
        setMove(move)
        
      }
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
