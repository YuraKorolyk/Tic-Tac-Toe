let x = 0;
let playerX = [];
let playerO = [];

//------ start page
const xItem = document.querySelector('.item--x');
const oItem = document.querySelector('.item--o');
xItem.addEventListener('click', () => {
   oItem.classList.remove('item--active');
   xItem.classList.add('item--active');
});
oItem.addEventListener('click', () => {
   xItem.classList.remove('item--active');
   oItem.classList.add('item--active');
});

document.querySelector('.cpu--btn').addEventListener('click', ()=>{
   document.querySelector('.start').style.display='none';
   document.querySelector('.main').style.display='block';

   if (firstPlayer === 'X') {
      document.querySelector('.player-x').innerHTML = 'x (you)';
      document.querySelector('.player-o').innerHTML = 'o (cpu)';
   } else {
      document.querySelector('.player-x').innerHTML = 'x (cpu)';
      document.querySelector('.player-o').innerHTML = 'o (you)';
      x = 3;
      playerX = [1, 2, 3];
      checkWin(winnerComb, playerX);
      // playItems[5].style.background = "url('../images/icon-x.svg') center no-repeat, #1F3641";
      // console.log(playItems);

   }
});

document.querySelector('.player--btn').addEventListener('click', ()=>{
   document.querySelector('.start').style.display='none';
   document.querySelector('.main').style.display='block';

   if (firstPlayer === 'X') {
      document.querySelector('.player-x').innerHTML = 'x (p1)';
      document.querySelector('.player-o').innerHTML = 'o (p2)';
   } else {
      document.querySelector('.player-x').innerHTML = 'x (p2)';
      document.querySelector('.player-o').innerHTML = 'o (p1)';
   }
});

let firstPlayer = 'X';
document.querySelector('.item--x').addEventListener('click', () => {
   firstPlayer = 'X';
});
document.querySelector('.item--o').addEventListener('click', () => {
   firstPlayer = 'O';
});

//------ game 
const playground = document.querySelector('.main__play');
const playItems = document.querySelectorAll('.main__item');
const winnerComb = [
   [1, 2, 3],
   [1, 7, 4],
   [3, 6, 9],
   [7, 8, 9],
   [2, 5, 8],
   [4, 5, 6],
   [1, 5, 9],
   [3, 5, 7]
];


const turnBoxImg = document.querySelector('.main__img-turn');
let winner;

playground.addEventListener('click', (e) => {
   if (e.target.classList.contains('main__item')) {
      if (x%2===0 && !e.target.style.background) {
         x++;
         turnBoxImg.src = 'images/icon-o-silver.svg'
         e.target.style.background = "url('../images/icon-x.svg') center no-repeat, #1F3641";
         playItems.forEach(item => {
            item.classList.remove('o');
            item.classList.add('x');
         });
         playerX.push(+e.target.className.match(/\d/g));
         if (checkWin(winnerComb, playerX)) {
            winner = 'x';
         }
         checkWin(winnerComb, playerX);
         // console.log(checkWin(winnerComb, playerX));
         
      } else if (x%2===1 && !e.target.style.background) {
         x++;
         turnBoxImg.src = 'images/icon-x-silver.svg'
         e.target.style.background = "url('../images/icon-o.svg') center no-repeat, #1F3641";
         playItems.forEach(item => {
            item.classList.remove('x');
            item.classList.add('o');
         });
         playerO.push(+e.target.className.match(/\d/g));
         if (checkWin(winnerComb, playerO)) {
            winner = 'o';
         }
         checkWin(winnerComb, playerO);
      }
      if (winner || playerO.length+playerX.length === 9) {
         changeScore();
      }
      winner = '';
      if (playerO.length+playerX.length === 9  && count !== 3) {
         showTiedModal();
      }

      console.log(playerX);

   }
});

let count;
function checkWin (winArr, currArr) {
   // console.log(count);
   for (let i = 0; i < winArr.length; i++) {
      count = 0;
      for (let j = 0; j < winArr[i].length; j++) {
         for (let y = 0; y < currArr.length; y++) {
            if (winArr[i][j] === currArr[y]) {
               count++
            }
            if (count === 3) {
               showFinishModal(x);
               return true;
            }
         }
      }
   }
}

const finishModal = document.querySelector('.modal');
const finishImg = document.querySelector('.finish__img');
const nextBtn = document.querySelector('.finish__next');
const quitBtn = document.querySelector('.finish__quit');
const restartBtn = document.querySelector('.main__restart');
const finishText = document.querySelector('.finish__text');
const finishResult = document.querySelector('.finish__result');
const yesRestart = document.querySelector('.restart__yes');
const noThanks = document.querySelector('.restart__no');

restartBtn.addEventListener('click', ()=> {
   finishModal.style.display = 'flex';
   finishModal.children[1].style.display = 'block'
});
yesRestart.addEventListener('click', clearGame);
noThanks.addEventListener('click', () => {
   finishModal.style.display = 'none';
   finishModal.children[1].style.display = 'none'
});

nextBtn.addEventListener('click', clearGame);
quitBtn.addEventListener('click', () => {
   document.querySelector('.main').style.display='none';
   document.querySelector('.start').style.display='block';
   clearGame();
});

function clearGame() {
   playItems.forEach(item => {
      item.style.background = ''
   });
   finishModal.style.display = 'none';
   finishModal.children[0].style.display = 'none';
   finishModal.children[1].style.display = 'none'
   playerX = [];
   playerO = [];
   x = 0;
   turnBoxImg.src = 'images/icon-x-silver.svg'
   playItems.forEach(item => {
      item.classList.remove('x');
      item.classList.add('o');
   });
}


let scoreX = 0;
let scoreTies = 0;
let scoreO = 0;

function changeScore () {
   if (winner == 'x') {
      scoreX++;
      document.querySelector('.main__x-score').innerHTML = scoreX;
   } else if (winner == 'o') {
      scoreO++;
      document.querySelector('.main__o-score').innerHTML = scoreO;
   } else {
      scoreTies++;
      document.querySelector('.ties-score').innerHTML = scoreTies;
   }
}

function showFinishModal (el) {
   if (el%2===0) {
      finishImg.src ='images/icon-o.svg';
      finishText.style.color = '#F2B137'
   } else if (el%2===1) {
      finishImg.src ='images/icon-x.svg';
      finishText.style.color = '#31C3BD'
   } 
   finishModal.style.display = 'flex';
   finishModal.children[0].style.display = 'block'
}

function showTiedModal () {
   finishImg.style.display = 'none';
   finishResult.style.display = 'none';
   finishText.innerHTML = 'ROUND TIED'
   finishText.style.color = '#A8BFC9'
   finishModal.style.display = 'flex';
   finishModal.children[0].style.display = 'block'
}
