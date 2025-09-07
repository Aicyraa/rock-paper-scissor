let game = {
  choices: document.querySelectorAll(".choice"),
  modal: document.querySelector(".modal__container"),
  battle: document.querySelector(".battle"),
  user: document.getElementById("human__score"),
  computer: document.getElementById("computer__score"),
  images: ["images/rock.png", "images/paper.png", "images/scissor.png"],
  winner: undefined,
  score: [0, 0],

  manageUI() {
    setTimeout(() => {
      this.computer.textContent = this.score[0];
      this.user.textContent = this.score[1];
    }, 2000);
  },

  popModal(txt = " ") {
    this.choices.forEach((choice) => {
      choice.classList.toggle("disable");
    });

    setTimeout(() => {
      this.modal.classList.toggle("show");
      this.modal.querySelector("#text").textContent = txt;
    }, 2200);
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

  changeImage(human, computer) {
    let img = this.battle.children;

    for (let i = 0; i < this.images.length; i++) {
      if (this.images[i].includes(human)) {
        this.animate(img[0], this.images[i]);
      }

      if (this.images[i].includes(computer)) {
        this.animate(img[1], this.images[i]);
      }
    }
  },

  animate(pick, image) {
    pick.classList.add("active");
    setTimeout(() => {
      pick.src = image;
    }, 1580);

    setTimeout(() => {
      pick.classList.remove("active");
    }, 1800);
  },
};

game.choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    let userPick = e.target.dataset.pick;
    let computerPick = Math.random();
    let computerAttack =
      computerPick < 0.5 ? computerRandomChoice() : counterHuman(userPick);

    game.changeImage(userPick, computerAttack);

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

    let whoWon = game.checkScore();
    game.manageUI();

    if (whoWon) {
      game.popModal(whoWon);

      setTimeout(() => {
        game.score = [0, 0];
        game.manageUI();
        game.popModal();
      }, 3000);
    } else {
      disableBtn();
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

function disableBtn() {
  game.choices.forEach((choice) => {
    choice.classList.add("disable");
  });

  setTimeout(() => {
    game.choices.forEach((choice) => {
      choice.classList.remove("disable");
    });
  }, 2000);
}
