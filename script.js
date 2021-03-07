//
//Guess Game
//Reuben Clemens
//Due: 1/29/21
//
start = false; //Variable named start. Its value is false, as it will be used in scoring for an if statement.
const MIN = 1; //Constant Value that acts as the min for getting a random value in RandVal().
const MAX = 16; //Constant Value that acts as the max for getting a random value in RandVal().
cards = []; //Array named cards. Will be defined in checklist().
clicked=[]; //Array named clicked. Will be defined in clickevent().
finished=[]; //Array named finished. Will be defined in scoring().
clickamount=""; //Variable named clickamount. Value is null, but will be defined in MainProcess().
click=""; //Variable named click. Value is null, but will be defined in clickevent().
check=""; //Variable named check. Value is null, but will be defined in checklist().
rand=""; //Variable named rand. Value is null, but will be defined in RandVal().
scan2=""; //Variable named scan2. Value is null, but will be defined in clickevent().
scan=""; //Variable named scan. Value is null, but will be defined in clickevent().
tries = ""; //Variable named tries. Value is null, but will be defined in MainProcess().
x = 0; //Variable named x. Value is null, but will be defined in MainProcess() and scoring().


/*
The DealingHand() main purpose is to create a list of numbers that will define cards using RandVal() and checklist().
Also used to start the whole program as it is used in a button.
*/
function DealingHand()
{
	//Will activate if the cards array length is not equals to 16.
	//Repeats until cards length is 16, and while it does so, uses the functions to add integers to cards.
	while (cards.length != 16)
	{
		RandVal() //Calls on RandVal() to create a rand value.
		checklist() //Calls on checklist() to check the rand value.
	}
	document.getElementById("button").disabled = true; //Disables the button from being activated while game is running.
	start = true; //Changes start to true allowing the clickevent() to begin.
}

/*
The MainProcess() main purpose is to run the main contents of the program. 
The Functions CardTurning() and scoring() are used for choosing what the cards src will change to.
Also includes an if statement once the game is done, as it acts as restart and ending.
*/
function MainProcess()
{
	CardTurning() //Resets the images to blank if they didn't match.
	scoring() //Changes the images to carddone if they did match.
	tries++; //Increments the tries variable.
	document.getElementById("tryamount").innerHTML = tries; //Changes the html for id tryamount with variable tries.
	clicked = []; //clears the clicked array.
	clickamount = 0; //Resets the clickamount variable to 0.

	//Will activate if finished array length equals 16.
	//Used as an ending, where everything is reset to its original state.
	if (finished.length == 16)
	{
		alert("you win! you tried " + tries + " times!"); //Uses an alert to tell the user they won with whatever amount tries they had.
		tries = 0; //Resets tries to 0.
		document.getElementById("tryamount").innerHTML = tries; //Updates the html for tryamount and replaces it with tries.

		//Will activate if x is not 16.
		//Resets all the images back to the original state.
		while (x != 16)
		{
			document.getElementById(x).src= 'images/blank.jpg'; //Changes the src for the id selected with blank.
			x++; //Increments x.
		}
		x = 0; //Resets x to 0.
		cards = []; //Clears cards array.
		finished = []; //Clears finished array.
		start = false; //Changes start to false.
		document.getElementById("button").disabled = false; //Reanable the button.
	}
}

/*
The RandVal() main purpose is to create a random integer from the MIN to MAX range. This 
will be used in checklist() to add to cards. 
*/
function RandVal()
{
	rand = Math.floor(Math.random() * MAX) + MIN; //Chooses a random number from the ranges of MIN and MAX.
}

/*
The checklist() main purpose is to check if the rand value has already been used in the list or not. If not,
it will add to the list the rand value. If it does, it will call to RandVal() to create a new value for rand.
*/
function checklist()
{
	check = cards.indexOf(rand); //Using indexOf, it checks the array cards to see if the rand value has been used before in the list. Will define the check variable.

	//The if statement will only activate if check is equal to -1 which will only happen if indexOf does not
	//detect the use of the same value in the list. Will add to the list.
	if (check == -1)
	{
		console.log('pushed'); //Writes in the log and tells us that this if statement has been activated with the message 'pushed'.
		cards.push(rand); //Pushes the rand value into cards.
	}
	//The else statement will activate if check is anything but -1.
	else
	{
		console.log('rerolled'); //Writes in the log and tells us that this else statement has been activated with the message 'rerolled
		RandVal() //Will call to RandVal() to create a new value for rand.
	}
}

/*
The scoring() mian purpose is to change the clicked image src to cardone.jpg.
That image will be blank, as it will signal to the user that those cards have already been matched.
*/
function scoring()
{
	//Will activate if cards array that is in the position of clicked[0] is more than 8.
	//Checks if it fits the requirements for next if statement.
	if (cards[clicked[0]] > 8)
	{
		//Will activate if cards array that is in the position of clicked[0] minus 8 equals cards array that is in the position of clicked[1].
		//Will run a while loop that will change the image src of the clicked to carddone.
		if (cards[clicked[0]] - 8 == cards[clicked[1]])
		{
			//Will activate as long as x is not 2.
			//Changes the image of clicked src.
			while (x != 2)
			{
				document.getElementById(clicked[x]).src= 'images/carddone.jpg'; //Changes src of clicked[x] to carddone.
				finished.push(clicked[x]); //Pushes clicked[x] into finished.
				x++; //Increments x.
			}
			x = 0; //Changes x value to 0.
		}
	}

	//Will activate if cards array that is in the position of clicked[0] is equal or less than 8.
	//Checks if it fits the requirements for next if statement.
	else if (cards[clicked[0]] <= 8)
	{
		//Will activate if cards array that is in the position of clicked[0] equals cards array that is in the position of clicked[1] minus 8.
		//Will run a while loop that will change the image src of the clicked to carddone.
		if (cards[clicked[0]] == cards[clicked[1]] - 8)
		{
			//Will activate as long as x is not 2.
			//Changes the image of clicked src.	
			while (x != 2)
			{
				document.getElementById(clicked[x]).src= 'images/carddone.jpg'; //Changes src of clicked[x] to carddone.
				finished.push(clicked[x]); //Pushes clicked[x] into finished.
				x++; //Increments x.
			}
			x = 0; //Changes x value to 0.
		}
	}
}

/*
The CardTurning() main purpose is to change the src of the clicked images.
Will replace them with a image that will indicated that they guessed wrong.
*/
function CardTurning()
{
	//Will activate if clicked length equals or is more than 1.
	//Changes the image of the clicked[0].
	if (clicked.length >= 1)
	{
		document.getElementById(clicked[0]).src= 'images/blank.jpg'; //Changes src of clicked[0] to blank.
		
		//Will activate if clicked length equals 2.
		//Changes the image of the clicked[1].
		if (clicked.length == 2)
		{
			document.getElementById(clicked[1]).src= 'images/blank.jpg'; //Changes src of clicked[1] to blank.
		}
	}
}

/*
The CardsTurningFix() main purpose is to change the src of wrong clicked images.
If you click on a blank after you clicked on a regular card, it should replace the images accordingly.
*/
function CardTurningFix()
{
	document.getElementById(clicked[0]).src= 'images/blank.jpg'; //Changes src of clicked[0] to blank.
	clickamount = 0; //Changes clickamount to 0.
	clicked = []; //Clears clicked array.
}

/*
The clickevent() main purpose is to use the onclick values that return.
It will 'flip' the card images to show the number underneath the clicked spot.
*/
function clickevent(CardClick)
{
	//Will activate if start is true, but is currently false.
	//Restricts the code inside from activating.
	if (start)
	{
		click = CardClick; //Makes click value the same as CardClick.
		clicked.push(click); //click value is pushed to clicked.
		var scan = finished.indexOf(clicked[0]); //Uses indexof to check if clicked[0] is in the finished array already. Defines scan with the results.
		var scan2 = finished.indexOf(clicked[1]); //Uses indexof to check if clicked[1] is in the finished array already. Defines scan2 with the results.

		//Will activate if scan equals -1.
		//Goes to the second scan to make sure there arent any of the same cards used.
		if (scan == -1)
		{
			//Will activate if scan2 equals -1.
			//Changes the src of click with the cards array that has the position of CardsClick.
			if (scan2 == -1)
			{
				clickamount++; //Increments clickamount.
				document.getElementById(click).src= 'images/' + cards[click] + '.jpg'; //Changes the src of click with the image of the same value position in cards list.
			}
			//Will activate if scan is anything else than -1.
			else
			{
				CardTurningFix() //Calls to the CardTurningFix() function to change the images back to normal.
			}
		}
		//Will activate if scan2 is anything else than -1.
		else
		{
			clicked = []; //Clears the clicked array.
		}
		
		//Will activate if clickamount equals 2.
		//Calls to the MainProcess() function.
		if (clickamount == 2)
		{
			setTimeout(function(){MainProcess()}, 500); //Goes to MainProcess() with a 500 millisecond delay.
		}
	}	
}