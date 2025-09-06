let game = {
  choices: document.querySelectorAll(".choices"),
};

game.choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    const userPick = e.target.dataset.pick;
    let computerPick = Math.random();
    let computerAttack =  computerPick < 0.6 ? computerRandomChoice() : counterHuman(userPick);
        
  });
});

function computerRandomChoice() {
  const picks = ["rock", "paper", "scissor"];
  return picks[Math.floor(Math.random() * 3) + 1];
}

function counterHuman(userPick) {
  switch (userPick) {
    case "rock":
      return "paper";
    case "paper":
      return "scissor";
    case "scissor":
      return "rock";
    default:
      console.log(`Invalid: ${userPick}`);
  }
}

function determineWinner(human, computer) {}
