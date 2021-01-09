const X_CLASS='x'
const O_CLASS='o'
const winning_combinations=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements =document.querySelectorAll('[data-cell]')
const board =document.getElementById('board')
const winningMessageElement=document.getElementById('winningMessage')
const restartbutton =document.getElementById('restartButton')
const winningMessageTextElement=document.querySelector('[data-wining-message-text]')
let OTurn 

startGame()
restartbutton.addEventListener('click',startGame)

function startGame(){
    OTurn=false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.addEventListener('click',handleClick,{once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e){
    const cell=e.target
    const currentClass=OTurn ? O_CLASS :X_CLASS
    placeMark(cell, currentClass)
    if(checkwin(currentClass)){
       endgame(false)
    } else if(isdraw()) {
        endgame(true)
    } else {
    swapTurns()  
    setBoardHoverClass()
    }
}

function endgame(draw){
    if(draw) {
        winningMessageTextElement.innerText='Draw!'
    }else {
        winningMessageTextElement.innerText= `${OTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isdraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(O_CLASS)
    })
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    OTurn=!OTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if(OTurn){
        board.classList.add(O_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkwin(currentClass){
    return winning_combinations.some(combonation=> {
        return combonation.every(index=> {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

