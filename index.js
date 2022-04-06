const events = document.getElementById("addCard");

let cardsToCheck = [];

function addToCardCheck(check) {
  console.log(check);
  cardsToCheck.push(check);
}

buttons = document.getElementsByTagName("button");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function (event) {
    addToCardCheck(event.target.name);
    event.target.innerText = event.target.name;
  });
}
