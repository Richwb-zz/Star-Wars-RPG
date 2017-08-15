function CreateCharacter(name,image, health, attack, counter, weapons){
	
	this.name = name;
	this.id = name.replace(/ /g,'');
	this.image = image;
	this.health = health;
	this.attack = attack;
	this.counter = counter;
	this.weapons = weapons;
	console.log(this);
	this.createProfile = function(){
		//Create Div for character profile
		
		var appendHtml = "<div id=\"#" + this.id + "\" class=\"character start-position\"><img src=\"" + this.image + "\"><div class=\"characterStats\"><div>Name: <span class=\"name\">" + this.name + "</span></div><div>Health: <span id=\"" + this.id + "health\">" + this.health + "</span></div><div>Attack: <span id=\"" + this.id + "attack\">" + this.attack + "</span></div><div>Counter: <span id=\"" + this.id + "counter\">"+ this.counter + "</span></div><div>Weapons: <span id=\"" + this.id + "weapons\">" + this.weapons + "</span></div><button id=\"" + this.id + "selectbtn\" class=\"visible select\"  data-character=\"" + this.id + "\" >Select</button><button id=\"" + this.id + "attackbtn\" class=\"invisible attack\"  data-character=\"" + this.id + "\">Attack</button><button id=\"" + this.id + "opponentbtn\" class=\"invisible opponent\" data-character=\"" + this.id + "\" >Opponent</button>";
		$(".board").prepend(appendHtml);
	};
	this.createProfile();

	characterNames.push(this.id);

};

//array to hold name of characters
var characterNames = [];
var enemies = [];
var player = "";
var opponent = "";

//  character constructors
new CreateCharacter("Ahsoka Tano","assets/images/characters/ahsoka.jpg", 20, 2, 1, 2);
new CreateCharacter("CT-5555","assets/images/characters/ct5555.jpg",30, 4, 2,1);
new CreateCharacter("General Grevious","assets/images/characters/grevious.jpg", 35, 2, 1, 4);
new CreateCharacter("Count Doku","assets/images/characters/doku.jpg", 40, 10, 5, 1);

//Character selection click
$(".select").on("click", function(){
	
	//gets data-character attribute to get characters name
	player = $(this).attr("data-character");

	// puts opponents into an array
	$.each(characterNames, function(index, person){
		if(person !== player){
			enemies.push(person);
		}
	});

	// consider switch to individual classes for the buttons so that you can modify the css directly without having to add and remove classes
	// hides the select button on all characters
	$(".select").addClass("invisible");

	//calls selectOpponent function and passes player characters name
	selectOpponent();

});

$(".opponent").on("click", function(){
	//set opponent variable
	opponent = $(this).attr("data-character");
	
	//hide opponent buttons
	$(".opponent").addClass("invisible");

	//switches attack button of player character from invisible to visible class
	$("#" + player + "attackbtn").removeClass("invisible");
})


$(".attack").on("click", function(){
	// Multiplies player attack power by the number of weapons they yield
	var fullAttack = $("#" + player + "attack").text() * $("#" + player + "weapons").text();
	// Stores player heath as var
	var opponentHealth = $("#" + opponent + "health").text();
	// Multiplies enemy counter with number of weapons they have
	var fullCounter = $("#" + opponent + "counter").text() * $("#" + opponent + "weapons").text();
	// Calculates what the opponents health would be after an attack
	var opponentNewHealth = opponentHealth - fullAttack;
	// Calculates what the players health would be after a counter
	var playerNewHealth =  $("#" + player + "health").text() - fullCounter;
	
	// player wins round if opponent's health is 0 or below else lowers the opponents health
	if(opponentNewHealth <= 0){
		alert("You win!");
		$("#" + opponent + "health").text(0);

		$("#" + opponent).addClass("defeated");
		$("#" + player + "attackbtn").addClass("invisible");
		//remove defeated opponent from enemies array
		enemies.splice(enemies.indexOf(opponent),1);

		selectOpponent();
	}else{
		$("#" + opponent + "health").text(opponentNewHealth);
	}

	//player looses if health is 0 or below else lowers the players health
	if(playerNewHealth <= 0){
		$("#" + player + "attackbtn").addClass("invisible");
		$("#" + player + "health").text(0);
		alert("you died!");
	}else{
		$("#" + player + "health").text(playerNewHealth);
	}

});

//function to select opponent
function selectOpponent(){

	$.each(enemies, function(index, person){
		$("#" + person + "opponentbtn").removeClass("invisible");
	});
}