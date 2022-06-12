
const Gameboard = (function(document){

  const Player = (name,id) => {
    return { name , id };
  };



  let gameboard =[
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  let boardArray =[
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  const createDom = () => {
    const main = document.querySelector('.main');
    const board = document.createElement('div');
    board.classList.add("gameboard");
    main.appendChild(board);
    let cell;
    let id = 0;
    for(let i=0; i < 3; i++){
      for(let j=0; j < 3; j++){
      cell = document.createElement('div');
      cell.classList.add('cell')
      cell.id = id;
      id++
      gameboard[i][j] = cell
      board.appendChild(cell);
      }
    }
  }
  const reset = () => {
    const board = document.querySelector('.main');
    board.removeChild(board.firstChild);

    let gameboard =[
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
  
    let boardArray =[
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
  }
  const play = () => {
    let currentPlayer = 1;
    for(let i=0; i < 3; i++){
      for(let j=0; j < 3; j++){
        gameboard[i][j].addEventListener('click',e =>{
        if(e.target.textContent == ''){
          if (currentPlayer % 2 != 0) {
            e.target.textContent = "X"
            boardArray[i][j] = "X"
          }
          else {
            e.target.textContent = "O"
            boardArray[i][j] = "O"
          }
          currentPlayer++
          if(checkVictory(boardArray)) console.log("WIN CONDITION")
          if (currentPlayer > Math.pow(boardArray.length ,2)) console.log("TIE")
          }
        })
      } 
    }
    
  }

  const columns = (array) => {
    let cols = []
    for(let i=0; i < array.length; i++){
      let column = []
      for(let j=0; j < array.length; j++){
        column.push(array[j][i])
      }
      cols.push(column)
    }
    return cols;
  }

  const diagonal = (array) => {
    let diag = [];
    let main  = [];
    let second = [];
    for(let i=0; i < array.length; i++){
     main.push(array[i][i])
     second.push(array[i][array.length-1-i])
    }
    diag.push(main);
    diag.push(second);
    return diag;
  }
  const allEqual = arr => arr.every( v => v === (arr[0] && v !=0 ))


  const checkVictory = (array) => {
    if(find(array,0).length <5) return false
    let col = columns(array)
    let diag = diagonal(array); 
    for(i = 0; i < array.length; i++){

        if(allEqual(array[i]) ) return true
        if(allEqual(col[i])) return true
        if(i<=1){
          if(allEqual(diag[i])) return true
        }
      }
    
    return false
  }

  function generateMoves(board,player){
    let moves = [] ;
    let x =[]
   
    
    for(item in board){
         index = find(board[item],0);
        for(let i=0; i<index.length; i++){
          let temp = JSON.parse(JSON.stringify(board[item]));
          let a = index[i][0];
          let b = index[i][1];
          if(player.id == 2) temp[a][b] = 'O';
          else  temp[a][b] = 'X';
          x.push(temp);   
         } 
          
    }
    moves.push(x)
    return moves[0]
   
  }

  
  function find(array ,item){
    let indexArray = []
    for(let i = 0; i < array.length; i++){
      for(let j = 0; j < array.length; j++){
        if(array[i][j] == item){
          let index = []
          index.push(i);
          index.push(j);
          indexArray.push(index)
        }
      }
    }
    if (indexArray.length == 0) return false
    return indexArray;
  }
  
  function score(player) {
    if(player.name == "AI") return  - 10;
    return 10;
  }

 
  let testBoard = [
      ['X', 0, 0],
      ['O', 0, 0],
      [0, 0, 'X']
    ];
  let scoresArray = []
 
  
  function nextDepth (board,player){
    //console.log(player)
    let movesArray = []
    temp = JSON.parse(JSON.stringify(board));
    let scores = []
    if(temp[0][0].length == 1) movesArray = (generateMoves([temp],player)) 
    else {
      
      for(item in temp){
      
      let x = []
      
        //console.log(temp[item])
        if(checkVictory(temp[item]) == true) { 
          temp[item][0][0] = "END";
          //movesArray.push(temp[item])
          
          scores.push(score(player))
        
        }
       
       else { 
        scores.push(0);
        x = ((generateMoves([temp[item]],player)));
       
        
        for(item in x) {
          movesArray.push(x[item]);
        }
      }
      
    }
    
    }
    scoresArray.push(scores)
    return movesArray
  }
  const Player1 = Player("George",1);
  const Player2 = Player("AI",2);
  let counter = (find(testBoard,0)).length 
  console.log(counter)

  function Plan (board,player1,player2) {
    console.log(board)
    if(counter >= 0) {
      counter--
      return Plan(nextDepth(board,player2),player2,player1)
     
    }
    else { counter--;console.log(counter); return board}
  }

  
  const log = () => {

    //console.log(testBoard) 
   //x = nextDepth(testBoard,Player1)
   //console.log(x)
  //y = (nextDepth(x,Player2))
 // console.log(y) 

  //z = nextDepth(y,Player1)
  //console.log(z)
   
  //Plan(testBoard,Player1,Player2)
  //console.log(scoresArray)
  console.log(checkVictory(testBoard))

   //y = Plan(x)
   //console.log(y)
   //console.log(find(testBoard,0))
   //x = generateMoves([testBoard],Player1)
   //y = generateMoves(x[0],Player2)
   //z = generateMoves(y[0],Player1)
   //console.log(z)
   //console.log(Plan(x,Player1,Player2))

  }
  return{createDom,log,play,reset,generateMoves}

})(document);


Gameboard.reset();
Gameboard.createDom();
Gameboard.play();




Gameboard.log();

/*function minmax (board,player1,player2) {
  if (winCondition(board) == true){
    //scoresArray.push(score(player1))
    return 0;
  }
  else {
   let moves = generateMoves([board],player1)
   movesArray.push(moves)
  // console.log(moves)
   for(item in moves) {
    console.log(moves[item])
    console.log(winCondition(moves[item]))
    return  minmax(moves[item],player2,player1)
   }
  }
}*/