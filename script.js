console.log("Welcome to Tic Tac Toe")
let music = new Audio("peritune-spook4(chosic.com).mp3")
let audioTurn = new Audio("ting.mp3")
//let gameover = new Audio("gameover.mp3")
let turn = "X"
let isgameover = false;

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
}
const removeColorChangeAnimation = () => {
    let boxes = document.getElementsByClassName("box");
    Array.from(boxes).forEach(element => {
        element.style.animation = 'none';
    });
};

// Function to check for a draw
const checkDraw = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let isDraw = true;
    for (let i = 0; i < boxtext.length; i++) {
        if (boxtext[i].innerText === '') {
            isDraw = false;
            break;
        }
    }
    if (isDraw && !isgameover) {
        document.querySelector('.Tturn').innerText = "It's a Draw!";
        isgameover = true;
        document.querySelector('.gameContainer').classList.add('game-over');
        removeHoverEffect(); // Remove hover effect
        removeClickListeners(); // Remove click event listeners
        removeColorChangeAnimation();
    }
}

// Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")) {
            document.querySelector('.Tturn').innerText = boxtext[e[0]].innerText + " Won"
            isgameover = true
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "230px";
            
            boxtext[e[0]].parentNode.classList.add('winning-box');
            boxtext[e[1]].parentNode.classList.add('winning-box');
            boxtext[e[2]].parentNode.classList.add('winning-box');
            document.querySelector('.gameContainer').classList.add('game-over');
            removeHoverEffect(); // Remove hover effect
            removeClickListeners(); // Remove click event listeners
            removeColorChangeAnimation();

        }
    })
}

// Function to remove hover effect
const removeHoverEffect = () => {
    let boxes = document.getElementsByClassName('box');
    Array.from(boxes).forEach(box => {
        box.classList.remove('hover-effect');
    });
}
// Function to play sound effect with ducking
const playSoundWithDucking = (soundEffect) => {
    music.volume = 0.2; // Lower background music volume
    soundEffect.volume=1.0;
    soundEffect.play();
    soundEffect.onended = () => {
        music.volume =0.4; // Restore background music volume after sound effect ends
    };
};



// Function to remove click event listeners from boxes
const removeClickListeners = () => {
    let boxes = document.getElementsByClassName("box");
    Array.from(boxes).forEach(element => {
        element.removeEventListener('click', handleClick);
    });
};

// Game Logic
music.play();
music.volume =0.2;
let handleClick = (event) => {
    let boxtext = event.target.querySelector('.boxtext');
    if (boxtext.innerText === '' && !isgameover) {
        boxtext.innerText = turn;
        turn = changeTurn();
        playSoundWithDucking(audioTurn, 1.0); // Play sound effect with maximum volume
        checkWin();
        checkDraw();
        if (!isgameover) {
            document.getElementsByClassName("Tturn")[0].innerText = "Turn for " + turn;
        }
    }
};

// Add click event listeners to boxes
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    element.addEventListener('click', handleClick);
});
document.addEventListener('DOMContentLoaded', () => {
    const muteCheckbox = document.querySelector('.containerer input');
    const music = new Audio("peritune-spook4(chosic.com).mp3");
    music.volume=0.5;
    muteCheckbox.addEventListener('change', () => {
        if (muteCheckbox.checked) {
            music.play();
        } else {
            music.pause();
        }
    });
});

// Add onclick listener to reset button
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.getElementsByClassName("Tturn")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
    document.querySelector('.gameContainer').style.backgroundImage = 'none';
    
    // Remove winning box highlight
    let winningBoxes = document.querySelectorAll('.winning-box');
    winningBoxes.forEach(box => {
        box.classList.remove('winning-box');
    });

    // Reset hover effect
    let boxes = document.getElementsByClassName('box');
    Array.from(boxes).forEach(box => {
        box.classList.add('hover-effect');
        box.style.animation = 'glow 2s infinite alternate'; // Reapply the glow animation
    });

    // Add click event listeners back to boxes
    Array.from(boxes).forEach(element => {
        element.addEventListener('click', handleClick);
    });
});
