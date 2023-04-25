import './App.css';
import MainContainer from './components/MainContainer';
import Action from './components/Action';
import {React,useEffect,useState} from 'react';
import GlobalContext from './context/Contexts';

function App() {  
  const random = Math.round(Math.random());
  const [CurrentPlayer,ChangePlayer] = useState(random)
  const [MovesLeft,UpdateMoves] = useState(9)
  const [GameOver,setGame] = useState(false)
  
  const initial_matrix = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
    ]
  const[matrix,changeMatrix] = useState(initial_matrix)
  
  useEffect(() => {
    if(GameOver){
      initial_matrix.forEach((element,index1) => {
        element.forEach((element2,index2) => {
          let button = document.getElementById(index1+','+index2)        
          button.addAttribute('disabled')
        });
      });
    }  
  },[GameOver])

  const ResetBoard = () =>{    
    initial_matrix.forEach((element,index1) => {
      element.forEach((element2,index2) => {
        let button = document.getElementById(index1+','+index2)
        button.innerHTML = ''
        button.removeAttribute('disabled')
      });
    });
    changeMatrix(initial_matrix)
    UpdateMoves(9)
    ChangePlayer(0)
  }
  return (
    <div className="App">      
      <>
      <GlobalContext.Provider value={{'CurrentPlayer':CurrentPlayer,'MovesLeft':MovesLeft,'matrix':matrix,'ResetBoard':ResetBoard,'changeMatrix':changeMatrix}}>
        <MainContainer setGame={setGame} ChangePlayer={ChangePlayer} UpdateMoves={UpdateMoves}/>
        <Action/>
        </GlobalContext.Provider>
      </>
    </div>
  );
}

export default App;
