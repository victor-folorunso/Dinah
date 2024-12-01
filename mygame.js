//game state
var opened = false
var turnColor = "white"
var displayedWhite = ["btn1", "btn2", "btn3"]
var displayedBlack = ["btn7", "btn8", "btn9"]
occupied = [...displayedWhite, ...displayedBlack]
var lastClicked = []
var allMoves = [] //for current game
initialTheme = "#FFD700";
var aiColor = "black"


//consts
var popupMenu = document.getElementById("corner-popup");
var menuMenu = document.getElementById("menu-corner-popup");
var settingsMenu = document.getElementById("settings-corner-popup");
var allBtns = ["btn1", "btn2", "btn3", "btn4", "btn5", "btn6", "btn7", "btn8", "btn9"]
const winningPatterns = [["btn4", "btn5", "btn6"], ["btn2", "btn5", "btn8"], ["btn1", "btn4", "btn7"], ["btn3", "btn6", "btn9"], ["btn1", "btn5", "btn9"], ["btn7", "btn5", "btn3"]]
whiteWin = { "btn7": "white", "btn8": "white", "btn9": "white" }
blackWin = { "btn1": "black", "btn2": "black", "btn3": "black" }
var btn1CanPlayToNormally = ["btn2", "btn5", "btn4"];
var btn2CanPlayToNormally = ["btn1", "btn5", "btn3"];
var btn3CanPlayToNormally = ["btn2", "btn5", "btn6"];
var btn4CanPlayToNormally = ["btn1", "btn5", "btn7"];
var btn5CanPlayToNormally = ["btn1", "btn2", "btn3", "btn4", "btn6", "btn7", "btn8", "btn9"];
var btn6CanPlayToNormally = ["btn3", "btn5", "btn9"];
var btn7CanPlayToNormally = ["btn4", "btn5", "btn8"];
var btn8CanPlayToNormally = ["btn5", "btn7", "btn9"];
var btn9CanPlayToNormally = ["btn5", "btn6", "btn8"];
var allWhiteWinMoves = [] //list of allMoves for diff games
var allBlackWinMoves = []//[{ turnColor: "white" , preClicked: "btn2", postClicked: "btn5" },{ turnColor: "black" , preClicked: "btn7" , postClicked: "btn4" },{ turnColor: "white" , preClicked: "btn5" , postClicked: "btn2" },{ turnColor: "black" , preClicked: "btn8" , postClicked: "btn5" },{ turnColor: "white" , preClicked: "btn3" , postClicked: "btn6" },{ turnColor: "black" , preClicked: "btn5" , postClicked: "btn3" },{ turnColor: "white", preClicked: "btn6" , postClicked: "btn5" },{ turnColor: "black" , preClicked: "btn4" , postClicked: "btn7" },{ turnColor: "white", preClicked: "btn5" , postClicked: "btn4" },{ turnColor: "black" , preClicked: "btn9" , postClicked: "btn5" }]               ,[{ turnColor: "white" , preClicked: "btn2", postClicked: "btn5" },{ turnColor: "black" , preClicked: "btn7" , postClicked: "btn4" },{ turnColor: "white" , preClicked: "btn5" , postClicked: "btn2" },{ turnColor: "black" , preClicked: "btn8" , postClicked: "btn5" },{ turnColor: "white" , preClicked: "btn3" , postClicked: "btn6" },{ turnColor: "black" , preClicked: "btn5" , postClicked: "btn3" },{ turnColor: "white", preClicked: "btn6" , postClicked: "btn5" },{ turnColor: "black" , preClicked: "btn4" , postClicked: "btn7" },{ turnColor: "white", preClicked: "btn5" , postClicked: "btn4" },{ turnColor: "black" , preClicked: "btn9" , postClicked: "btn5" }]] //list of allMoves for diff games
var normallyStore = { "btn1": btn1CanPlayToNormally, "btn2": btn2CanPlayToNormally, "btn3": btn3CanPlayToNormally, "btn4": btn4CanPlayToNormally, "btn5": btn5CanPlayToNormally, "btn6": btn6CanPlayToNormally, "btn7": btn7CanPlayToNormally, "btn8": btn8CanPlayToNormally, "btn9": btn9CanPlayToNormally }
const soundPlayerPlayed = new Audio('/storage/emulated/0/Download/soundPlayerPlayed.wav');

function randomChoose(list) {
	// Generate a random index within the range of the array length
	var randomIndex = Math.floor(Math.random() * list.length);
	// Get a random element from the array using the random index
	var randomChoice = list[randomIndex];
	return randomChoice;
}
function resetGame() {
	opened = false
	displayedWhite = ["btn1", "btn2", "btn3"]
	displayedBlack = ["btn7", "btn8", "btn9"]
	occupied = [...displayedWhite, ...displayedBlack]
	lastClicked = []
	allMoves = [] //for current game;
	aiColor = "black"



	iterateThrough(displayedWhite, "white");
	iterateThrough(displayedBlack, "black");
	iterateThrough(unoccupied(allBtns), "blue");


}

function playSounds(sound) {
	if (document.getElementById("soundOn").style.backgroundColor == "green") {
		sound.play()
	}
}
function removeFrom(item, list) {
	if (list.includes(item)) {
		var indexToRemove = list.indexOf(item)
		list.splice(indexToRemove, 1)
	}
	return list;
}

function playAs(green) {
	var options = ["playAsBlack", "playAsWhite", "playByTurns"]
	removeFrom(green, options)
	document.getElementById(green).style.backgroundColor = "green"
	document.getElementById(options[0]).style.backgroundColor = "red"
	document.getElementById(options[1]).style.backgroundColor = "red"
}
function playAsWhite() {
	playAs("playAsWhite")
}
function playAsBlack() {
	playAs("playAsBlack")
}
function playByTurns() {
	playAs("playByTurns")
	return true;
}

function colorXBtn(x, y, onOroff) {
	if (onOroff == x) {
		document.getElementById(x).style.backgroundColor = "green"
		document.getElementById(y).style.backgroundColor = "red"
	}
	else if (onOroff == y) {
		document.getElementById(y).style.backgroundColor = "green"
		document.getElementById(x).style.backgroundColor = "red"
	}
}

function colorSoundBtnOn() {
	colorXBtn("soundOn", "soundOff", "soundOn")
}
function colorSoundBtnOff() {
	colorXBtn("soundOn", "soundOff", "soundOff")
}

function colorShowGreenBtnsOn() {
	colorXBtn("showGreenBtnsOn", "showGreenBtnsOff", "showGreenBtnsOn")
}
function colorShowGreenBtnsOff() {
	colorXBtn("showGreenBtnsOn", "showGreenBtnsOff", "showGreenBtnsOff")
}

function PlayGame(initOrstop) {
	const grids = document.getElementsByClassName("grid");
	var gridSettingBtn = document.getElementsByClassName("grid-setting-btn")
	const mainMenu = document.getElementsByClassName("main-menu");
	if (initOrstop == "init") {
		var a = "grid"; var b = "none";
		//gridSettingBtn.style.display = "inline"
	}
	else if (initOrstop == "stop") {
		var a = "none"; var b = "grid";
		//gridSettingBtn.style.display = "none"
	}

	for (let i = 0; i < grids.length; i++) {
		grids[i].style.display = a;

	}

	for (let i = 0; i < mainMenu.length; i++) {
		mainMenu[i].style.display = b;

	}
}

function twoPlayersGame() {
	PlayGame("init")
}
function level1Clicked() {
	PlayGame("init")
}



function setTheme() {
	var themeInput = document.getElementById("userColorChoice");
	var selectedColor = themeInput.value;
	document.body.style.backgroundColor = selectedColor;
}
//main menu
function settingsClicked() {
	var currentDisplay = settingsMenu.style.display;

	// Close the 'menu' menu if it's open
	if (menuMenu.style.display === 'flex') {
		menuMenu.style.display = 'none';
	}

	if (currentDisplay === 'flex') {
		settingsMenu.style.display = 'none';
		popupMenu.style.display = "none";
		setTheme()
	} else {
		settingsMenu.style.display = 'flex';
		popupMenu.style.display = "flex";
	}
}

function menuClicked() {
	var currentDisplay = menuMenu.style.display;

	// Close the 'settings' menu if it's open
	if (settingsMenu.style.display === 'flex') {
		settingsMenu.style.display = 'none';
	}

	if (currentDisplay === 'flex') {
		menuMenu.style.display = 'none';
		popupMenu.style.display = "none";
		setTheme()
	} else {
		menuMenu.style.display = 'flex';
		popupMenu.style.display = "flex";
	}
}
function home() {
	PlayGame("stop")
	// Close the 'menu' menu if it's open
	if (menuMenu.style.display === 'flex') {
		menuMenu.style.display = 'none';
		popupMenu.style.display = "none";
	}
	if (settingsMenu.style.display === 'flex') {
		settingsMenu.style.display = 'none';
		popupMenu.style.display = "none";
	}
	setTheme()
}
//major game functs
function iterateThrough(list, bgcolor) {
	for (let i = 0; i < list.length; i++) {
		var btnId = list[i];
		document.getElementById(btnId).style.backgroundColor = bgcolor;
		if (document.getElementById("showGreenBtnsOff").style.backgroundColor === "green" && document.getElementById(btnId).style.backgroundColor === "green") {
			document.getElementById(btnId).style.display = "none";
		}

	}
}
function unoccupied(baseArray) {
	var copiedBaseArray = [...baseArray]
	for (var i = 0; i < occupied.length; i++) {
		var character = occupied[i];
		if (copiedBaseArray.includes(character)) {
			var indexToRemove = copiedBaseArray.indexOf(character);
			copiedBaseArray.splice(indexToRemove, 1);
		}
	}
	return copiedBaseArray;
}

function getPrevBtn(currentBtn) {
	if (lastClicked.length > 1) {
		var currentBtnIndex = lastClicked.indexOf(currentBtn);
		if (currentBtnIndex > 0) {
			lastClickedIndex = currentBtnIndex - 1
			var prevBtn = lastClicked[lastClickedIndex];
		}
	}
	return prevBtn;
}
function refreshBtn(btnXCanPlayToNormally) {
	var btnXCanPlayToCurrently = unoccupied(btnXCanPlayToNormally);
	return btnXCanPlayToCurrently;
}
function listExcessDel(list) {
	if (list.length > 2) {
		list.splice(0, 1)
	}
	return list;
}
function removeUnwantedGreen() {
	for (var i = 0; i < allBtns.length; i++) {
		var btnIndex = allBtns[i];
		if (document.getElementById(btnIndex).style.backgroundColor == "green") {
			document.getElementById(btnIndex).style.backgroundColor = "blue";
		}
	}

}
// Helper function to check if a specific pattern leads to a win.
function isWinningPattern(pattern) {
	boolOut = true
	for (const item of pattern) {

		if (!(document.getElementById(item).style.backgroundColor == turnColor)) {
			boolOut = false;
			break
		}
	}
	return boolOut;
}

function changeColor() {
	if (turnColor == "white") {
		turnColor = "black"
	}
	else if (turnColor == "black") {
		turnColor = "white"
	}
}
function checkForWinner() {
	var boolHolder = false;
	// Iterate through the winning patterns.
	for (const pattern of winningPatterns) {
		if (isWinningPattern(pattern)) {
			boolHolder = true;
			alert(turnColor + " wins")

			if (turnColor == "white") {
				allWhiteWinMoves.push(allMoves)
				resetGame()
			}
			else if (turnColor == "black") {
				allBlackWinMoves.push(allMoves)
				resetGame()
			}


		}
	}
	return boolHolder;

}
function teachAi() {
	const move = { turnColor: turnColor, preClicked: lastClicked[0], postClicked: lastClicked[1] };
	allMoves.push(move)
}
function canPlay(btnNum) {
	var cond = false
	var nilColorCheck = document.getElementById(btnNum).style.backgroundColor
	var condition1 = (displayedWhite.includes(btnNum) && turnColor == "white") || (turnColor == "white" && nilColorCheck == "green");
	var condition2 = (displayedBlack.includes(btnNum) && turnColor == "black") || (turnColor == "black" && nilColorCheck == "green");
	if ((condition1 || condition2)) {
		var cond = true;
	}

	return cond;
}


function toggleAiPlay() {

	//var a = possiblePreclicks[0]
	//clicked(a,normallyStore[a]) //ai taps pre button
	binaryBool = false
	if (allBlackWinMoves.length > 0) {

		for (var item of allBlackWinMoves) {
			var binaryBool = true
			for (var i = 0; i < allMoves.length; i++) {
				//console.log(inner.turnColor)
				//console.log("i" + i)
				var cond1 = (item[i].turnColor == allMoves[i].turnColor)
				var cond2 = (item[i].preClicked == allMoves[i].preClicked)
				var cond3 = (item[i].postClicked == allMoves[i].postClicked)
				if (!(cond1 && cond2 && cond3)) {
					binaryBool = false
					break;

				}
			}
			if (binaryBool == true) {

				//console.log("binaryBull is supposed to be true " + binaryBool)
				if (item[i].turnColor == "black") {
					var nxtInnerMoveIndex = i  //woukd have been i+1 but because i++ above which broke out of loop,i is already +1
				}
				else {
					var nxtInnerMoveIndex = i + 1 //similatly woulf have been +2 instead
				}

				var OuterMoveIndex = allBlackWinMoves.indexOf(item)



				//console.log(nxtOuterMoveIndex)

				var selectedBlackWinOuterMove = allBlackWinMoves[OuterMoveIndex]
				var selectedBlackWinInnerMove = selectedBlackWinOuterMove[nxtInnerMoveIndex]
				var preClickedBtn = selectedBlackWinInnerMove.preClicked
				var postClickedBtn = selectedBlackWinInnerMove.postClicked
				clicked(preClickedBtn, normallyStore[preClickedBtn])
				clicked(postClickedBtn, normallyStore[postClickedBtn])
				break;

			}
		}
	}
	if (binaryBool == false) {
		console.log("idonno")
		var possiblePreClicks = []
		for (const btn of allBtns) {
			if (document.getElementById(btn).style.backgroundColor == aiColor) {
				possiblePreClicks.push(btn)
			}
		}
		/*
		var possiblePostClicks = []
		for (const btn of allBtns){
			if (document.getElementById(btn).style.backgroundColor == "blue"){
				possiblePostClicks.push(btn)
			}
		}
		while (turnColor == "black"){
		try{
			var preClickedBtn = randomChoose(possiblePreClicks)
			console.log(preClickedBtn)
			var postClickedBtn = randomChoose(possiblePostClicks)
			console.log(postClickedBtn)
			clicked(preClickedBtn,normallyStore[preClickedBtn])
			clicked(postClickedBtn,normallyStore[postClickedBtn])
			break
		}
		catch(Error){
			continue;
		}
		}*/

		while (true) {
			try {

				var preClickedBtn = randomChoose(possiblePreClicks)
				var A = refreshBtn(normallyStore[preClickedBtn])//preClickedBtn can play to currently
				if (!(A.length == 0)) {
					postClickedBtn = randomChoose(A)
					clicked(preClickedBtn, normallyStore[preClickedBtn])
					clicked(postClickedBtn, normallyStore[postClickedBtn])
					break
				}
			}
			catch (Error) { console.log(Error) }
		}








	}
}
// Call the checkForWin function whenever necessary to determine if there's a win.
function clicked(btnNum, btnNumCanPlayToNormally) {


	if (canPlay(btnNum)) {
		lastClicked.push(btnNum)
		listExcessDel(lastClicked)

		if (document.getElementById(btnNum).style.backgroundColor == turnColor) {
			if (opened == false) {
				iterateThrough(refreshBtn(btnNumCanPlayToNormally), "green");
				opened = true
			}
			else if (opened == true) {
				iterateThrough(refreshBtn(btnNumCanPlayToNormally), "blue");
				removeUnwantedGreen()
				opened = false

			}
		}
		else if (document.getElementById(btnNum).style.backgroundColor == "green") {
			opened = false
			document.getElementById(btnNum).style.backgroundColor = turnColor;
			document.getElementById(btnNum).style.display = "flex";
			var prevBtn = getPrevBtn(btnNum)
			removeFrom(prevBtn, occupied)
			occupied.push(btnNum)

			if (displayedWhite.includes(prevBtn)) {
				removeFrom(prevBtn, displayedWhite)
				displayedWhite.push(btnNum)
			}
			else if (displayedBlack.includes(prevBtn)) {
				removeFrom(prevBtn, displayedBlack)
				displayedBlack.push(btnNum)
			}

			playSounds(soundPlayerPlayed)
			iterateThrough(refreshBtn(btnNumCanPlayToNormally), "blue");
			//removeUnwantedChars note,both are mandatory		
			removeUnwantedGreen()
			checkForWinner()
			if (checkForWinner() == false) {
				teachAi()
				//switch current player btm color
				changeColor()
				//console.log(turnColor + aiColor)
				if (turnColor == aiColor) {
					toggleAiPlay()
				}
			}

		}
	}
	else {

		//alert("its "+ turnColor + " turn")
	}

}
//button functs
function btn1clicked() { clicked("btn1", normallyStore.btn1) }
function btn2clicked() { clicked("btn2", normallyStore.btn2) }
function btn3clicked() { clicked("btn3", normallyStore.btn3) }
function btn4clicked() { clicked("btn4", normallyStore.btn4) }
function btn5clicked() { clicked("btn5", normallyStore.btn5) }
function btn6clicked() { clicked("btn6", normallyStore.btn6) }
function btn7clicked() { clicked("btn7", normallyStore.btn7) }
function btn8clicked() { clicked("btn8", normallyStore.btn8) }
function btn9clicked() { clicked("btn9", normallyStore.btn9) }


document.addEventListener("DOMContentLoaded", function () {
	iterateThrough(displayedWhite, "white");
	iterateThrough(displayedBlack, "black");
	//initial theme hexadecimal
	var themeInput = document.getElementById("userColorChoice");
	themeInput.value = initialTheme;
	setTheme()
	//init colors
	colorSoundBtnOn()
	colorShowGreenBtnsOn()
	playByTurns()
});



/*
	 DOCUMENTATION
 there is a bug or two when switching turncolor after ai plays amd also the issue of ai playing as first man
 issue of bundling var items (game state variables ) into a file and retrieving once game is inti.use try catch
 understnsmd and debug css styles read through code all over again
 two player = plain bord
 olay with ai = toggle ai play

use images for settings,home,e.t.c
shrare ai rank,reset ai rank(delets all known moves)
apo faq = facebook or reliable static webpage with link try google /canva or wix,generte link,ensure vid can be enbeded
support = flutterwave
share app can be drive
remive reduntant functions from js code,carefully





*/