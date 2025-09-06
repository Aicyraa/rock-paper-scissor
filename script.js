let game = {
  choices: document.querySelectorAll(".choices"),
  winner: undefined,
  usersScore: 0,
  computerScore: 0,
};

game.choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    let userPick = e.target.dataset.pick;
    let computerPick = Math.random();
    let computerAttack = computerPick < 0.6 ? computerRandomChoice() : counterHuman(userPick);

    try {
      game.winner = determineWinner(userPick, computerAttack);
    } catch (e) {
      console.log(`Error: ${e}`);
    }

    console.log(
      `
      Random: ${computerPick}
      User: ${userPick} vs Computer: ${computerAttack} 
      Winner: ${game.winner[0]} - user: ${game.usersScore} - computer: ${game.computerScore}
      `
    );
  });
});

function computerRandomChoice() {
  const picks = ["rock", "paper", "scissor"];
  return picks[Math.floor(Math.random() * 2  ) + 1];
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

function determineWinner(human, computer) {
  if (
    (human == "rock" && computer == "paper") ||
    (human == "paper" && computer == "scissor") ||
    (human == "scissor" && computer == "rock")
  ) {
    ++game.computerScore;
    return ["Bob", computer];
  } else if (human == computer) {
    return ["Tie", human || computer];
  } else {
    ++game.usersScore;
    return ["You", human];
  }
}
