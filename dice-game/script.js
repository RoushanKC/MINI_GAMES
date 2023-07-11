'use strict';
const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');
const name0 = document.getElementById('name-0');
const name1 = document.getElementById('name-1');
const gScore0 = document.getElementById('score-0');
const gScore1 = document.getElementById('score-1');
const score0 = document.getElementById('current-0');
const score1 = document.getElementById('current-1');
//for click events
const bNew = document.querySelector('.new');
const bRoll = document.querySelector('.btn-roll');
const bHold = document.querySelector('.btn-hold');
const imgElement = document.querySelector('.dice');

//variables
let globalScores, currentPlayer, currentScore, isPlaying;

//initialization function
const init = function () {
    globalScores = [0, 0];
    currentPlayer = 0;
    currentScore = 0;
    isPlaying = true;

    gScore0.textContent = 0;
    gScore1.textContent = 0;
    score0.textContent = 0;
    score1.textContent = 0;

    player0.classList.add('player-active');
    player1.classList.remove('player-active');
    imgElement.classList.add('hidden');
    player0.classList.remove('player-winner');
    player1.classList.remove('player-winner');

};

//initialization
init();

//switching player function
const switchPlayers = function () {
    currentScore = 0;
    document.getElementById(`current-${currentPlayer}`).textContent = currentScore;
    if (currentPlayer === 0) {
        currentPlayer = 1;
    }
    else currentPlayer = 0;

    player0.classList.toggle('player-active');
    player1.classList.toggle('player-active');

};

//new game functionality
bNew.addEventListener('click', init);

//rolling dice functionality
bRoll.addEventListener('click', function () {
    if (isPlaying) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        imgElement.classList.remove('hidden');
        imgElement.src = `dice-${dice}.png`;

        if (dice !== 1) {
            currentScore += dice;
            if (currentPlayer === 0) score0.textContent = currentScore;
            else score1.textContent = currentScore;
        }
        else switchPlayers();
    }


});

//hold functionality
bHold.addEventListener('click', function () {
    if (isPlaying) {
        globalScores[currentPlayer] += currentScore;
        if (currentPlayer === 0) gScore0.textContent = globalScores[currentPlayer];
        else gScore1.textContent = globalScores[currentPlayer];

        if (globalScores[currentPlayer] >= 20) {
            isPlaying = false;
            imgElement.classList.add('hidden');
            document.querySelector(`.player-${currentPlayer}`).classList.remove('player-active');
            document.querySelector(`.player-${currentPlayer}`).classList.add('player-winner');
        }
        else switchPlayers();
    }
});


