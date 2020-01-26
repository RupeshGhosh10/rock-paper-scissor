let humanOption = null;
let aiOption = null;
let humanScore = 0;
let aiScore = 0;

const resultContainer = document.querySelector("#result-container");
const btn = document.querySelectorAll(".btn");
const finalResult = document.querySelector("#final-result");
let humanScoreBtn = document.querySelector("#human-score");
let aiScoreBtn = document.querySelector("#ai-score");

const options = ["Rock", "Paper", "Scissor"];

for (let i = 0 ; i < btn.length ; i++) {
	btn[i].addEventListener("click", function(){
		humanOption = btn[i].textContent;
		playRound();
	});
}

function playRound() {
	if (humanScore >= 5 || aiScore >= 5) {
		return;
	}
	clear();
	getAiOption();
	showHumanOption();
	showAiOption();
	showWinner();
	updateScore();
	checkGameWinner();
}

function clear() {
	let p = document.querySelectorAll("p");
	for (let i = 0 ; i < p.length ; i++){
		p[i].remove();
	}
}

function getAiOption() {
	aiOption = options[Math.floor(Math.random() * 3)];
}

function showHumanOption() {
	createNode("Your choice: " + humanOption);
}

function showAiOption() {
	createNode("Computer's choice: " + aiOption);
}

function showWinner() {
	if (checkWinner() === "draw"){
		createNode("Result: Draw");
	}
	else if (checkWinner() === "ai"){
		aiScore += 1;
		createNode("Result: You lost");
	}
	else if (checkWinner() === "human"){
		humanScore += 1;
		createNode("Result: You won");
	}
}

function updateScore() {
	humanScoreBtn.innerHTML = humanScore;
	aiScoreBtn.innerHTML = aiScore;
}

function checkGameWinner() {
	if (humanScore === 5) {
		createNode("You Won the Game", finalResult);
		createResetBtn();
	}
	else if (aiScore === 5) {
		createNode("You lost the Game", finalResult);
		createResetBtn();
	}
}

function createNode(str, node=resultContainer) {
	let p = document.createElement("p");
	p.appendChild(document.createTextNode(str));
	node.appendChild(p);
}

function createResetBtn() {
	let b = document.createElement("button");
	b.appendChild(document.createTextNode("Reset"));
	b.classList.add("btn-hover");
	finalResult.appendChild(b);
	b.addEventListener("click", function() {
		clear();
		humanScore = 0;
		aiScore = 0;
		updateScore();
		b.remove();
	});
}

function checkWinner() {
	if (aiOption === humanOption){
		return "draw";
	}
	else if ((aiOption === "Rock" && humanOption === "Scissor") || (aiOption === "Scissor" && humanOption === "Paper") || (aiOption === "Paper" && humanOption === "Rock")){
		return "ai";
	}
	else if ((humanOption === "Rock" && aiOption === "Scissor") || (humanOption === "Scissor" && aiOption === "Paper") || (humanOption === "Paper" && aiOption === "Rock")){
		return "human";
	}
}