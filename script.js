let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#reset");
let msgContainer=document.querySelector(".msg-container")
let newbtn=document.querySelector("#new")
let msg=document.querySelector("#msg");

let turn=true;
let count=0;

const winPattern=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const resetGame= () => {
    turn=true;
    count=0;
    enbBoxes();
    msgContainer.classList.add("hide");
    
}

const disBoxes= () => {
    for(let box of boxes){
        box.disabled=true;
    }
}
const enbBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turn){
            box.innerHTML="X"
            turn=false;
        }else{
            box.innerHTML="O"
            turn=true;
        }
        count++;
        box.disabled=true; //the values in the box cannot be changed once assigned


       if(count===9){
           gameDraw();
        }
        if(winChecker()){
           return;
       }
    })
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disBoxes();
  };

const winner= (winner)=>{
    msg.innerText=`Winner  is ${winner}`
    msgContainer.classList.remove("hide")
    disBoxes();
}

const winChecker=()=>{
    for(let pattern of winPattern){
        let pos1Value=boxes[pattern[0]].innerText;
        let pos2Value=boxes[pattern[1]].innerText;
        let pos3Value=boxes[pattern[2]].innerText;
        if(pos1Value!="" && pos2Value !="" && pos3Value !=""){
            if(pos1Value===pos2Value && pos2Value===pos3Value){
                winner(pos1Value);
                return true;
            }
        }     
    }
    return false;
};

newbtn.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);