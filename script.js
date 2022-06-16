
const Gameboard = (function(document){
  let scoresArray = []
  let newScores = []
  let movesArray = []
  let bestScores = []

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

  const Player = (name,id) => {
    return { name , id };
  };
  let  Player1 = Player("George",1)
  let Player2 = Player("AI",2) 

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
      cell.id = 'c'+ id;
      id++
      gameboard[i][j] = cell
      board.appendChild(cell);
      }
    }
  }
  const reset = () => {
    const main = document.querySelector('.main');
    const board = document.querySelector(".gameboard")
    main.removeChild(board);

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
    createDom();
  }

  const printBoard = (board) => {
    
    let counter = 0
    for(let i=0; i <= 2; i++){
      for(let j=0; j <= 2; j++){
        let div = document.querySelector(`#c${counter}`)
        if(board[i][j] != 0)div.textContent = board[i][j]   
        counter++

          
        }
      } 
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

  const playWithAI = () => {

    printBoard(boardArray)
    for(let i=0; i < 3; i++){
      for(let j=0; j < 3; j++){
        gameboard[i][j].addEventListener('click',e =>{
        if(e.target.textContent == ''){
            e.target.textContent = 'X'
            boardArray[i][j] = 'X'
          
          if(checkVictory(boardArray)) {console.log("PLAYER 1 WINS"); return 0;}
          if(find(boardArray,0) == false) {console.log("ITS A TIE"); return 1;}
          else {
          y = find(boardArray,0).length
          console.log(y)
          console.log(boardArray)
          x = playAI(boardArray,Player1,Player2,y)
          console.log(x)

          boardArray = JSON.parse(JSON.stringify(x));

          printBoard(boardArray)
          scoresArray = []
          newScores = []
          movesArray = []
          bestScores = []
          if(checkVictory(boardArray)) {console.log("AI WINS"); return 0}}
          if(find(boardArray,0) == false) {console.log("ITS A TIE"); return 1;}
        
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
   const allEqual = arr => arr.every( v => v === (arr[0]))

  const checkVictory = (array) => {
    if(find(array,0).length > 5) return false
    let col = columns(array)
    let diag = diagonal(array); 
    for(i = 0; i < array.length; i++){

        if(allEqual(array[i]) && array[i][0] != 0) return true
        if(allEqual(col[i]) && col[i][0] != 0) return true
        if(i<=1){
          if(allEqual(diag[i]) && diag[i][0]) return true
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
    if(player.name == "AI") return   -10;
    return 10;
  }

  function nextDepth (board,player){
    let movesArray = []
    temp = JSON.parse(JSON.stringify(board));
    let scores = []
    if(find(temp,0).length >=8 ) movesArray = (generateMoves([temp],player)) 
    else {
      for(item in temp){
        let x = [] 
        if(checkVictory(temp[item]) == true) { 
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

  function Plan (board,player1,player2,counter) {
    if(counter >= 1) {
      movesArray.push(board)
      return Plan(nextDepth(board,player2),player2,player1,(counter-1))
    }
    else {counter-1; 
      let scores = []
      for(item in board){
        if(checkVictory(board[item]) == true) { 
        scores.push(score(player2))
        }
        else scores.push(0)
      }
      scoresArray.push(scores)
      return board
    }
  }

  function max(array){
    let max = array[0]
    for(item in array){
      if(array[item]>max) max = array[item]
    }
    return max;
  }

  function min(array){
    let min = array[0]
    for(item in array){
      if(array[item]<min) min = array[item]
    }
    return min;
  }

  function containsZero(array){
    let boolean = false
    for(item in array){
      if(array[item] == 0) boolean=true;
    }
    return boolean
  }

  function bestMove(array,depth,string){
    if(array[array.length-depth-2].length <2) return array
    let A = JSON.parse(JSON.stringify(array[array.length-depth-2]))
    let B = JSON.parse(JSON.stringify(array[array.length-depth-1]))
    let minmax = string
    let increment = find(movesArray[movesArray.length-depth-2][0],0).length -1
    console.log('increment')
    console.log(increment)
    let a =0
    let b = increment+1
    console.log(A)
    console.log(B)
    for(item in A){
      console.log(a)
      console.log(b)
      if(A[item] == 0){
        if(increment  != -1){
          if(string == "max") {
            A[item] += max(B.slice(a,b))
          }
          else {
            A[item] += min(B.slice(a,b))
          }
          a=b+1
          b+=increment+1;  
        }
        else{
           A+=B[a]
           a++
           b=-1
        }       
      }
    }
    A = A.map(a => a+1)
    bestScores.push(A)
    console.log(A)
    array.splice(array.length-depth-2,1,A)
    if(minmax == "max") minmax = "min"
    else minmax = "max"
    return bestMove(array,depth+1,minmax)
    } 
  const playAI = (array,Player1,Player2,counter) =>{
    
    scoresArray = []
    newScores = []
    movesArray = []
    bestScores = []
    let move =[]
    let index
    if (counter == 8 && array[0][0] =="X"){
      move = [
        ["X",0,0],
        [0,0,0],
        [0, 0, "O"]
      ];
       
    }
   else if (counter == 8 && array[0][2] =="X"){
      move = [
        [0,0,"X"],
        [0,0,0],
        ["O", 0, 0]
      ];
       
    }
    else if(counter == 8 && array[2][0] =="X"){
      move = [
        [0,0,"O"],
        [0,0,0],
        ["X", 0, 0]
      ];
    }

    else if(counter == 8 && array[1][1]!="X"){
      move = JSON.parse(JSON.stringify(array));
      move[1][1] = "O"
    }
    else if(counter==8){
      move = [
        [0,0,"O"],
        [0,"X",0],
        [0, 0, 0]
      ];
    }
   else{
    if (counter>6) counter = 6;
  Plan([array],Player1,Player2,counter)
  console.log(movesArray)
  console.log(scoresArray)
  let s = 100000
  for(item in scoresArray){
    for (i in scoresArray[item]){
      scoresArray[item][i] *=s
     
    }
    s=s/10} 
 newScores = JSON.parse(JSON.stringify(scoresArray));JSON
   console.log(newScores)
  if(counter%2 != 0) {bestMove(newScores,0,"min");   }
 else if (counter%2 == 0) {bestMove(newScores,0,"max");  }
   console.log(bestScores)
   console.log(newScores)
  index = newScores[1].indexOf(max(newScores[1]))
  move = movesArray[1][index]
  console.log(move)
  }
 return move
  }
 

  return{createDom,play,reset,playWithAI}
  
})(document);


//Gameboard.reset();
Gameboard.createDom();
//Gameboard.play();
Gameboard.playWithAI();