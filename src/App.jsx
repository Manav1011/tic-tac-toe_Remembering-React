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
  const [PlayerZero,setMovesZero] = useState([])
  const [PlayerOne,setMovesOne] = useState([])
  const [Winner,SetWinner] = useState(null)
  
  const initial_matrix = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
    ]
  const[matrix,changeMatrix] = useState(initial_matrix)
  
  useEffect(() => {
    if(GameOver || Winner){
      initial_matrix.forEach((element,index1) => {
        element.forEach((element2,index2) => {
          let button = document.getElementById(index1+','+index2)        
          button.setAttribute('disabled','disabled')
        });
      });      
    }  
  },[GameOver,Winner])

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
    setMovesZero([])
    setMovesOne([])
    setGame(false)
    SetWinner(null)
    const random = Math.round(Math.random());
    ChangePlayer(random)
  }
  return (
    <div className="App">      
      <>
      <GlobalContext.Provider value={{'CurrentPlayer':CurrentPlayer,'MovesLeft':MovesLeft,'matrix':matrix,'ResetBoard':ResetBoard,'changeMatrix':changeMatrix}}>
        <MainContainer SetWinner={SetWinner} PlayerZero={PlayerZero} PlayerOne={PlayerOne} setMovesZero={setMovesZero} setMovesOne={setMovesOne} setGame={setGame} ChangePlayer={ChangePlayer} UpdateMoves={UpdateMoves}/>
        <Action GameOver={GameOver} Winner={Winner}/>
        </GlobalContext.Provider>
      </>
    </div>
  );
}

export default App;
