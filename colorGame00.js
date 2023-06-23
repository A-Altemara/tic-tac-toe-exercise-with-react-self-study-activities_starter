// import checkForWinner from "./superset";

const Square = ({ id, player, newState }) => {
  const [color, setColor] = React.useState('green');
  const [status, setStatus] =React.useState(null);
  const xORoArray = ["O", "X"];

  const palet = ['red', 'blue', 'green'];
  const getRandomColor = () => palet[Math.floor(Math.random() * 3)];

  React.useEffect(() => {
    console.log(`Render ${id}`);
    return () => console.log(`unmounting Square ${id}`);
  })
  // keep track of state of the Square
  return (
    <button onClick={(e) => {
      // let col = (getRandomColor())
      // setColor(col)
      let nextPlayer = newState(id)
      setStatus(nextPlayer);
      // e.target.style.background = col; // if you had used color here the use state part it is async and won't me accurate.

      }}
    >
      <h1>{xORoArray[status]}</h1>
    </button>
  )
}
const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [state, setState] = React.useState(Array(9).fill(null));
  
  // testing functions
  // const [mounted, setMounted] = React.useState(true);
  // const [random, setRandom] = React.useState(0);
  // const toggle = () => setMounted(!mounted);
  // const reRender = () => setRandom(Math.random());
  
  
  let status = `Player ${player}`;
  let winner = checkForWinner(state);
  if(winner != null) status = `Player ${winner} wins!`;
  
  // define newState function
  const newState = idOfSquare => {
    let thePlayer = player;
    state[idOfSquare] = player // player is present player
    setState(state); // state is array of 0 or 1 or null
    let nextPlayer = (player + 1) % 2;
    setPlayer(nextPlayer);
    return thePlayer; // returing present player
  }

  function renderSquare(i) {
    return <Square id={i} player={player} newState={newState}></Square>
  }
  return (
    <div
      className="game-board"
      // onClick={(e) => {
        // setPlayer((player + 1) % 2); // makes the player 0 or 1
        // status = `Player ${player}`;
      // }}
    >
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
        {/* <button onClick={toggle}>Show/Hide Row</button>
        <button onClick={reRender}>ReRender</button> */}
        <h1>{status}</h1>
      </div>
    </div>
  );
};


 const checkForWinner = (state) => {
  // get array of box id's
  // can't be a winner in less than 5 turns

  const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 5, 6],
    [2, 4, 6]
  ];

  for (let i = 0; i< win.length; i++) {
    const [a, b, c] = win[i];
    if (state[a] == state[b] && state[a] == state[c] && state[a] !== null)
    return state[a]
  }
  return null;
}



// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
