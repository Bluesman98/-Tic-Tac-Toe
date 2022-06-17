
const Gameboard = (function(document){

  const main = document.querySelector('.main');
  const msg = document.createElement('p')
  msg.textContent = ''
  main.append(msg)

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


  const Input = () => {
    const container = document.createElement('form')
    const form = document.createElement('div')
    form.classList.add("container")
    container.append(form)
    for(let i = 1; i<3; i++){
      const div = document.createElement('div')
      const label = document.createElement('label')
      div.append(label)
      const input = document.createElement('input')
      input.placeholder = `Player ${i} Name`
      input.id = `player${i}`
      div.append(input)
      form.append(div)
    }
    const btn = document.createElement('button')
    btn.textContent = "Play"
    container.append(btn)
    main.append(container)
    btn.addEventListener('click',e =>{

      let p1 = document.querySelector('#player1')
      let p2 = document.querySelector('#player2')

      if(p1.value == "") p1.value = "Player 1"
      if(p2.value == "") p2.value = "Player 2"

      let  Player1 = Player(p1.value,1)
      let Player2 = Player(p2.value,2) 
      createDom(Player1,Player2)
      play(Player1,Player2)
      main.removeChild(container)
    })

  }

  const createDom = (Player1,Player2) => {
  //  const main = document.querySelector('.main');
    let btn = document.createElement('button')
    btn.textContent = 'Reset';
    btn.classList.add("reset")

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
      main.append(btn)
    }
    btn.addEventListener('click',e =>{
      main.removeChild(btn)
      Gameboard.reset();
      createDom(Player1,Player2)
      Gameboard.play(Player1,Player2);
     
    })
  }
  const reset = () => {
    const main = document.querySelector('.main');
    const board = document.querySelector(".gameboard")
    main.removeChild(board);
    msg.textContent = ''
   
     gameboard =[
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
  
     boardArray =[
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
   // createDom();
    
  }

  const play = (player1,player2) => {
    //const main = document.querySelector('.main');
    let currentPlayer = 1;
    for(let i=0; i < 3; i++){
      for(let j=0; j < 3; j++){
        gameboard[i][j].addEventListener('click',e =>{
        if(e.target.textContent == ''){
          if (currentPlayer % 2 != 0) {
            e.target.textContent = "X"
            e.target.style.color = '#ffe13f'
            boardArray[i][j] = "X"
          }
          else {
            e.target.textContent = "O"
            e.target.style.color = 'rgb(255, 139, 248)'
            boardArray[i][j] = "O"
          }
          
          currentPlayer++
          if(checkVictory(boardArray)) {
            if(currentPlayer%2!=0) msg.textContent = `${player2.name} Wins`
            else msg.textContent = `${player1.name} Wins`
          }
          if(find(boardArray,0) == false) { msg.textContent = "It's A Tie"}
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
  


  return{createDom,play,reset,Input,}
  
})(document);


//Gameboard.reset();
//Gameboard.createDom();
//Gameboard.play();
Gameboard.Input();
