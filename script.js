let game = {
  choices: document.querySelectorAll(".choices"),
  user: document.getElementById("human__score"),
  computer: document.getElementById("computer__score"),
  modal: document.querySelector(".modal__container"),
  images: ['images/rock.png', 'images/paper.png', 'scissor.png'], 
  winner: undefined,
  score: [0, 0],

  manageUI() {
    this.computer.textContent = this.score[0];
    this.user.textContent = this.score[1];
  },

  checkScore() {
    for (let i = 0; i < this.score.length; i++) {
      if (this.score[i] == 3) {
        switch (i) {
          case 0:
            return `Bob win! `;
          case 1:
            return `You win! `;
        }
      }
    }
    return false;
  },

  popModal(txt = " ") {
    this.choices.forEach((choice) => {
      choice.classList.toggle("disable");
    });

    this.modal.classList.toggle("show");
    this.modal.querySelector("#text").textContent = txt;
  },
};

game.choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    let userPick = e.target.dataset.pick;
    let computerPick = Math.random();
    let computerAttack =
      computerPick < 0.5 ? computerRandomChoice() : counterHuman(userPick);

    try {
      game.winner = determineWinner(userPick, computerAttack);
    } catch (e) {
      console.log(`Error: ${e}`);
    }

    console.log(
      `
      Random: ${computerPick}
      User: ${userPick} vs Bob: ${computerAttack} 
      Winner: ${game.winner} - user: ${game.score[1]} - Bob: ${game.score[0]}
      `
    );

    let score = game.checkScore();
    game.manageUI()

    if (score) {
      game.popModal(score);

      setTimeout(() => {
        game.score = [0, 0];
        game.manageUI();
        game.popModal();
      }, 3000);
    }
  });
});

function computerRandomChoice() {
  const picks = ["rock", "paper", "scissor"];
  return picks[Math.floor(Math.random() * picks.length)];
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
    ++game.score[0];
    return "Bob";
  } else if (human == computer) {
    return "Tie";
  } else {
    ++game.score[1];
    return "You";
  }
}
