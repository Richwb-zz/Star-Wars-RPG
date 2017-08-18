function CreateCharacter(name,image, health, attack, counter, quote){
	// removes spaces from names for use in ids
	id = name.replace(/ /g,'');
	
	//Create Div for character profile
	var appendHtml = "<div id=" + id + " class=\"character\"><div class=\"name\">" + name + "</div><img src=\"" + image + "\"><div class=\"characterStats\"><div class=\"health\"><span id=\"" + id + "health\">" + health + "</span></div><div class=\"attackcounter\"><span id=\"" + id + "attack\">" + attack + "</span>/<span id=\"" + id + "counter\">"+ counter + "</span></div><div class=\"quote\"><q>" + quote + "</q></div></div><button id=\"" + id + "selectbtn\" class=\"visible select\"  data-character=\"" + id + "\" >Select</button><button id=\"" + id + "attackbtn\" class=\"invisible attack\"  data-character=\"" + id + "\">Attack</button><button id=\"" + id + "opponentbtn\" class=\"invisible opponent\" data-character=\"" + id + "\" >Opponent</button>";
	$(".board").prepend(appendHtml);

	//add character name to array
	characterNames.push(this.id);

};

function startGame(){
	
	//set background to intro image
	$("body").css({"background": "url(assets/images/backgrounds/intro.jpg)", "background-size": "100% 100%"});
	
	// Start game by clearing out any varaibles
	characterNames = [];
	enemies = [];
	player = "";
	opponent = "";
	multiplier = 1;
	backgrounds = ["assets/images/backgrounds/jeditemple.jpg", "assets/images/backgrounds/battle.jpg", "assets/images/backgrounds/skytop.jpg", "assets/images/backgrounds/city.jpg"];
	playerBackground = "";

	// Remove all elements within the board class element
	$(".board").html("");
	    
	// Create new elements
	//  character constructors
	CreateCharacter("Ahsoka Tano","assets/images/characters/ahsoka.jpg", 150, 20, 15, "Yes, but will we do so as keepers of the peace or warriors? And what\'s the difference?");
	CreateCharacter("CT-5555","assets/images/characters/ct5555.jpg",175, 15, 20, "Look around. We’re one and the same. Same heart, same blood");
	CreateCharacter("Grevious","assets/images/characters/grevious.jpg", 225, 10, 25, "How does it feel to die?");
	CreateCharacter("Count Doku","assets/images/characters/doku.jpg", 275, 5, 30, "One man should be able to make a difference if he is powerful enough");
}

//function to select opponent
function selectOpponent(){

	$.each(enemies, function(index, person){
		$("#" + person + "opponentbtn").removeClass("invisible");
	});
}

// loads intro background


//array to hold name of characters
var characterNames = [];
//  array to hold enemies
var enemies = [];
// hold player
var player = "";
// current opponent
var opponent = "";
// set attack multiplier
var multiplier = 1;

var backgrounds = [];
var playerBackground = "";
startGame();

//Character selection click
$(document).on("click", ".select", function(){

	//gets data-character attribute to get characters name
	player = $(this).attr("data-character");

	//set image for player
	playerBackground = backgrounds[characterNames.indexOf(player)];
	
	//removes background image of the player
	backgrounds.splice(characterNames.indexOf(player),1);
	
	//sets background as player image
	$("body").css({"background": "url(" + playerBackground + ")", "background-size": "100% 100%"});
	

	baseAttack = parseInt($("#" + player + "attack").text());

	// puts opponents into an array
	$.each(characterNames, function(index, person){
		if(person !== player){
			enemies.push(person);
			// moves enimies to top of screen
			$("#" + person).switchClass("","top", 0, "swing");
		}
	});

	//moves player to bottom of screen
	$("#" + player).switchClass("","bottom", 0, "swing");

	// consider switch to individual classes for the buttons so that you can modify the css directly without having to add and remove classes
	// hides the select button on all characters
	$(".select").addClass("invisible");

	//calls selectOpponent function and passes player characters name
	selectOpponent();

});

$(document).on("click",".opponent", function(){
	//set opponent variable

	opponent = $(this).attr("data-character");
	
// Set background to that of the opponent
	$("body").css({background: "url(" + backgrounds[enemies.indexOf(opponent)] + ")", "background-size": "100% 100%" });
	
	//hide opponent buttons
	$(".opponent").addClass("invisible");

	$("#" + opponent).switchClass("","center", 0, "swing");

	//switches attack button of player character from invisible to visible class
	$("#" + player + "attackbtn").removeClass("invisible");
})

$(document).on("click",".attack", function(){
	// Multiplies player attack power by the number of weapons they yield
	var fullAttack = baseAttack * multiplier;

	// Calculates what the opponents health would be after an attack
	var opponentNewHealth = parseInt($("#" + opponent + "health").text()) - fullAttack;
	// Calculates what the players health would be after a counter
	var playerNewHealth =  parseInt($("#" + player + "health").text()) - parseInt($("#" + opponent + "counter").text());
	
	// player wins round if opponent's health is 0 or below else lowers the opponents health
	if(opponentNewHealth <= 0){
		alert("You win!");

		//update health and attack information
		$("#" + opponent + "health").text(0);
		$("#" + player + "attack").text(fullAttack);

		//add classes to defeated player and remove attack button from player until new opponent is selected
		$("#" + opponent).addClass("defeated");
		$("#" + player + "attackbtn").addClass("invisible");
		//remove defeated opponent from enemies array
		console.log("before:" + backgrounds);
		console.log("before:" + enemies);
		//Removes opponenets background image to keep in sync with enemy array
		backgrounds.splice(enemies.indexOf(opponent),1);
		console.log("after:" + backgrounds);
		enemies.splice(enemies.indexOf(opponent),1);
		console.log("after:" + enemies);
		// changes background image back to the player until next opponent is selected
		$("body").css({background: "url(" + playerBackground + ")", "background-size": "100% 100%" });
		// glide card from center class to top class positions
		$("#" + opponent).switchClass("center","top", 0, "swing");

		selectOpponent();
	
	}else{
		$("#" + opponent + "health").text(opponentNewHealth);
		$("#" + player + "health").text(playerNewHealth);

	}

	// update multiplier for next attack and display new attack power
	multiplier++;
	fullAttack = baseAttack * multiplier;
	$("#" + player + "attack").text(fullAttack);

	//player looses if health is 0 or below else lowers the players health
	if(playerNewHealth <= 0 && opponentNewHealth > 0){
		$("#" + player + "attackbtn").addClass("invisible");
		$("#" + player + "health").text(0);
		alert("you died!");
	}

	// check health of player and current enimies, if either are 0 then ask if play again
	if(playerNewHealth <=0 && opponentNewHealth > 0 || enemies.length === 0){
		if(confirm("play again?")){
			startGame();
		}
	}

});