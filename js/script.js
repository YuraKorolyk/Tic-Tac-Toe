let x = 0;
let count;
let playerX = [];
let playerO = [];
let gameType;
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
let firstPlayer = 'X';
document.querySelector('.item--x').addEventListener('click', () => {
   firstPlayer = 'X';
});
document.querySelector('.item--o').addEventListener('click', () => {
   firstPlayer = 'O';
});
document.querySelector('.cpu--btn').addEventListener('click', ()=>{
   gameType = 'cpu';
   document.querySelector('.start').style.display='none';
   document.querySelector('.main').style.display='block';
   if (firstPlayer === 'X') {
      document.querySelector('.player-x').innerHTML = 'x (you)';
      document.querySelector('.player-o').innerHTML = 'o (cpu)';
   } else {
      document.querySelector('.player-x').innerHTML = 'x (cpu)';
      document.querySelector('.player-o').innerHTML = 'o (you)';
      playItems.forEach(item => {
         item.classList.remove('o');
         item.classList.add('x');
      });
      if (x%2===0) {
         x++;
         let checkResult = checkRandom();
         turnBoxImg.src = 'images/icon-o-silver.svg'
         playItems[checkResult-1].style.background = "url('images/icon-x.svg') center no-repeat, #1F3641";
         playerX.push(checkResult);
      } 
   }
});

document.querySelector('.player--btn').addEventListener('click', ()=>{
   gameType = 'player';
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

   function playLogic(target, turnImg, bgImg, removeEl, addEl, arr) {
      x++;
      turnBoxImg.src = `images/${turnImg}-silver.svg`
      target.style.background = `url('images/${bgImg}.svg') center no-repeat, #1F3641`;
      playItems.forEach(item => {
         item.classList.remove(removeEl);
         item.classList.add(addEl);
      });
      arr.push(+target.className.match(/\d/g));
   }

   playground.addEventListener('click', (e) => {
      if(gameType === 'player') {
         if (e.target.classList.contains('main__item')) {
            if (x%2===0 && !e.target.style.background) {
               playLogic(e.target, 'icon-o', 'icon-x', 'o', 'x', playerX);

               if (checkWin(winnerComb, playerX)) {
                  winner = 'x';
               }
               checkWin(winnerComb, playerX);
            } else if (x%2===1 && !e.target.style.background) {
               playLogic(e.target, 'icon-x', 'icon-o', 'x', 'o', playerO);

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
         }
      }
      
      if(gameType === 'cpu') {
         if (e.target.classList.contains('main__item')) {
            if (firstPlayer === 'X') {
               if (x%2===0 && !e.target.style.background) {
                  playLogic(e.target, 'icon-o', 'icon-x', 'o', 'o', playerX,);
                  if (checkWin(winnerComb, playerX)) {
                     winner = 'x';
                  }
                  checkWin(winnerComb, playerX);
                  
                  
               }
               if (x%2 === 1 && !checkWin(winnerComb, playerX)) {
                  x++;
                  let checkResult = checkRandom();
                  turnBoxImg.src = 'images/icon-x-silver.svg'
                  if (playerX.length+playerO.length !== 9) {
                     playItems[checkResult-1].style.background = "url('images/icon-o.svg') center no-repeat, #1F3641";
                  }
                  playerO.push(checkResult);
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
            } else if (firstPlayer === 'O') {
               if (x%2===1 && !e.target.style.background) {
                  playLogic(e.target, 'icon-x', 'icon-o', 'x', 'x', playerO,);
                  if (checkWin(winnerComb, playerO)) {
                     winner = 'o';
                  }
                  checkWin(winnerComb, playerO);
                  // return;
               }
               if (x%2===0 && !checkWin(winnerComb, playerO)) {
                  x++;
                  let checkResult = checkRandom();
                  turnBoxImg.src = 'images/icon-o-silver.svg'
                  if (playerX.length+playerO.length !== 9) {
                     playItems[checkResult-1].style.background = "url('images/icon-x.svg') center no-repeat, #1F3641";
                  }
                  playerX.push(checkResult);
                  if (checkWin(winnerComb, playerX)) {
                     winner = 'x';
                  }
                  checkWin(winnerComb, playerO);
               }
               if (winner || playerO.length+playerX.length === 9) {
                  changeScore();
               }
               if (playerO.length+playerX.length === 9  && count !== 3) {
                  showTiedModal();
               }
               winner = '';
            }
         }
      }
   });
   function checkRandom () {
      if (playerX.length+playerO.length === 9) {
         return;
      } else {
      let random = getRandomInt(1, 9);
      if (playerX.includes(random) || playerO.includes(random)) {
         return checkRandom();
      }
      return random;
   }
}
   function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }


function checkWin (winArr, currArr) {
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
const backBtn = document.querySelector('.main__back');

const finishText = document.querySelector('.finish__text');
// const finishResult = document.querySelector('.finish__result');
const yesRestart = document.querySelector('.restart__yes');
const noThanks = document.querySelector('.restart__no');

restartBtn.addEventListener('click', ()=> {
   finishModal.style.display = 'flex';
   finishModal.children[1].style.display = 'block'
});
backBtn.addEventListener('click', ()=> {
   finishModal.style.display = 'flex';
   finishModal.children[2].style.display = 'block'
})
document.querySelector('.back__no').addEventListener('click', ()=> {
   finishModal.style.display = 'none';
   finishModal.children[2].style.display = 'none'
});
document.querySelector('.back__yes').addEventListener('click', ()=>{
   goMainScreen();
});
yesRestart.addEventListener('click', ()=> {
   clearGame();
   if (gameType === 'cpu') {
      cpuXLogic();
   }

});
noThanks.addEventListener('click', () => {
   finishModal.style.display = 'none';
   finishModal.children[1].style.display = 'none'
});

let scoreX = 0;
let scoreTies = 0;
let scoreO = 0;

nextBtn.addEventListener('click', ()=> {
   clearGame();
   if (gameType === 'cpu') {
      cpuXLogic();
   }
});
function cpuXLogic() {
   if (firstPlayer === 'O') {
      playItems.forEach(item => {
         item.classList.remove('o');
         item.classList.add('x');
      });
      if (x%2===0) {
         x++;
         let checkResult = checkRandom();
         turnBoxImg.src = 'images/icon-o-silver.svg'
         playItems[checkResult-1].style.background = "url('images/icon-x.svg') center no-repeat, #1F3641";
         playerX.push(checkResult);
      } 
   }
}
quitBtn.addEventListener('click', goMainScreen);

function goMainScreen () {
   document.querySelector('.main').style.display='none';
   document.querySelector('.start').style.display='block';
   clearGame();
   scoreX = 0;
   scoreTies = 0;
   scoreO = 0;
   document.querySelector('.main__x-score').innerHTML = scoreX;
   document.querySelector('.main__o-score').innerHTML = scoreO;
   document.querySelector('.ties-score').innerHTML = scoreTies;
}
function clearGame() {
   playItems.forEach(item => {
      item.style.background = ''
   });
   finishModal.style.display = 'none';
   finishModal.children[0].style.display = 'none';
   finishModal.children[1].style.display = 'none'
   finishModal.children[2].style.display = 'none'
   playerX = [];
   playerO = [];
   x = 0;
   turnBoxImg.src = 'images/icon-x-silver.svg'
   playItems.forEach(item => {
      item.classList.remove('x');
      item.classList.add('o');
   });
}

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
   finishImg.style.display = 'block';
   finishText.innerHTML = 'takes the round'
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
   finishText.innerHTML = 'ROUND TIED'
   finishText.style.color = '#A8BFC9'
   finishModal.style.display = 'flex';
   finishModal.children[0].style.display = 'block'
}


