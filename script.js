const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const userScoreSpan = document.querySelector('[data-user-score]')
const SELECTIONS = [
    {
        name: 'rock',
        emoji: '🗿',
        beats: 'scissors',
        phrase: 'You Lose! You new dum dum, you give me gum gum.'
    },

    {
        name: 'paper',
        emoji: '📜',
        beats: 'rock',
        phrase: 'You Lose! Paper beats Rock'
    },

    {
        name: 'scissors',
        emoji: '✂️',
        beats: 'paper',
        phrase: 'You Lose! Scissors beats paper'
    }

]




selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        makeSelection(selection)
    })
})

function makeSelection(selection) {
    const computerSelection = randomSelection()
    const yourWinner = isWinner(selection, computerSelection)
    const computerWinner = isWinner(computerSelection, selection)
    
    addSelectionResult(computerSelection, computerWinner)
    addSelectionResult(selection, yourWinner)

    if(yourWinner) incrementScore(userScoreSpan)
    if(computerWinner) incrementScore(computerScoreSpan)
}

function incrementScore(scoreSpan){
    if(userScoreSpan.innerText < 5 && computerScoreSpan.innerText < 5){
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
    }
    else{
        alert("The game is over, look at the score and see who won !");
        location.reload()
    }
}

function addSelectionResult(selection, winner){
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add('result-selection')
    if (winner) div.classList.add('winner')
    finalColumn.after(div)
}

function isWinner(selection, oponnentSelection){
    return selection.beats === oponnentSelection.name
}

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
}