const score = JSON.parse(localStorage.getItem('score'))  || {wins:0, loss:0, ties:0};

    document.querySelector('.js-score').innerHTML = `wins: ${score.wins}, loss: ${score.loss}, ties: ${score.ties}`;

    document.querySelector('.js-rock-click').addEventListener('click',()=>{
        playGame('rock');
    });

    document.querySelector('.js-papar-click').addEventListener('click',()=>{
        playGame('paper');
    });

    document.querySelector('.js-sci-click').addEventListener('click',()=>{
        playGame('scissors');
    });


    document.querySelector('.js-autoplay').addEventListener('click',()=>{
        autoPlay();
    })

    document.querySelector('.js-reset-button').addEventListener('click',()=>{
        score.wins =0;
        score.loss =0;
        score.ties =0;
        localStorage.removeItem('score');
        updatescore();
    });

    document.body.addEventListener('keydown',(event) =>{
        if(event.key==='r'){
            playGame('rock');
        }
        else if(event.key==='p'){
            playGame('paper');
        }
        else if(event.key==='s'){
            playGame('scissors');
        }
    })




    function playGame(playerMove) {

        const computerMove = pickComputerMove();

        let result = '';

        if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose.';
        } else if (computerMove === 'paper') {
            result = 'You win.';
        } else if (computerMove === 'scissors') {
            result = 'Tie.';
        }
        } 
        else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win.';
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        } else if (computerMove === 'scissors') {
            result = 'You lose.';
        }
        } 
        else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You lose.';
        } else if (computerMove === 'scissors') {
            result = 'You win.';
        }
        }

        

        if(result === 'You win.'){
            score.wins++;
        }
        else if(result === 'You lose.'){
            score.loss++;
        }
        else if(result ==='Tie.'){
            score.ties++;
        }

        localStorage.setItem('score', JSON.stringify(score));

        updatescore();
        document.querySelector('.js-result').innerHTML = result;
        document.querySelector('.js-moves').innerHTML = `You
        <img src="images/${playerMove}-emoji.png" alt="" class="css-move-icon">
        <img src="images/${computerMove}-emoji.png" alt="" class="css-move-icon">
        Computer` 
                

        }

        function updatescore(){
            document.querySelector('.js-score').innerHTML = `wins: ${score.wins}, loss: ${score.loss}, ties: ${score.ties}
            `;
        }

        function pickComputerMove() {
            const randomNumber = Math.random();

            let computerMove = '';

            if (randomNumber >= 0 && randomNumber < 1 / 3) {
            computerMove = 'rock';
            } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
            computerMove = 'paper';
            } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
            computerMove = 'scissors';
            }

            return computerMove;
        }

        let isAutoPlaying = false;

        let inervalId;

        function autoPlay(){

            if(!isAutoPlaying){
                inervalId = setInterval(function(){
                    const playerMove = pickComputerMove();
                    playGame(playerMove);
                }, 1000);
                isAutoPlaying = true;
            } else{
                clearInterval(inervalId);
                isAutoPlaying=false;
            }
            
        }