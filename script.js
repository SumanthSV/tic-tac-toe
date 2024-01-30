let boxes=document.querySelectorAll(".box");
let msgContainer=document.querySelector(".msg-container")
let msg=document.querySelector("#msg");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");

let turnO=true;
let count=0;

const patterns=[
    [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () =>{
    turnO=true;
    enableBoxes();
    count=0;
    msgContainer.classList.add("hide");
};

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText="O";
            turnO=false;
        }
        else{
            box.innerText="X";
            turnO=true;
        }
        count++;
        box.disabled=true;

        let isWinner=checkWinner();

        if(count===9 && !isWinner){
            gameDraw();
        }
        
    });
});

const checkWinner = () =>{
    for(let pattern of patterns){
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;

        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1===pos2 && pos2===pos3){
                showWinner(pos1);
                return true;
            }
        }
    }
};

const showWinner = (winner) =>{
    msg.innerText=`Congratulations, the winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableBoxes =()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

const gameDraw = () =>{
    msg.innerText=`The game was draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};
resetBtn.addEventListener("click",resetGame);
newGameBtn.addEventListener("click",resetGame);