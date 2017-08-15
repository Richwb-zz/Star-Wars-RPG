function CreateCharacter(name,image, health, attack, counter, weapons, agility){
	
	id = name.replace(/ /g,'');
	//Create Div for character profile
		
	var appendHtml = "<div id=" + id + " class=\"character start-position\"><img src=\"" + image + "\"><div class=\"characterStats\"><div>Name: <span class=\"name\">" + name + "</span></div><div>Health: <span id=\"" + id + "health\">" + health + "</span></div><div>Attack: <span id=\"" + id + "attack\">" + attack + "</span></div><div>Counter: <span id=\"" + id + "counter\">"+ counter + "</span></div><div>Weapons: <span id=\"" + id + "weapons\">" + weapons + "</span></div><div>Agility: <span id=\"" + id + "agility\">" + agility + "</span></div><button id=\"" + id + "selectbtn\" class=\"visible select\"  data-character=\"" + id + "\" >Select</button><button id=\"" + id + "attackbtn\" class=\"invisible attack\"  data-character=\"" + id + "\">Attack</button><button id=\"" + id + "opponentbtn\" class=\"invisible opponent\" data-character=\"" + id + "\" >Opponent</button>";
	$(".board").prepend(appendHtml);

	characterNames.push(this.id);
};

//array to hold name of characters
var characterNames = [];
var enemies = [];
var player = "";
var opponent = "";

//  character constructors
CreateCharacter("Ahsoka Tano","assets/images/characters/ahsoka.jpg", 75, 20, 10, 2, 4);
CreateCharacter("CT-5555","assets/images/characters/ct5555.jpg",150, 15, 20,1, 3);
CreateCharacter("General Grevious","assets/images/characters/grevious.jpg", 300, 10, 30, 4,2);
CreateCharacter("Count Doku","assets/images/characters/doku.jpg", 600, 5, 40, 1, 1);

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
	var multiplier = 1;	
	if(i === 1){
		var baseAttack = $("#" + player + "attack"); 
	}

	// Multiplies player attack power by the number of weapons they yield
	var fullAttack = baseAttack * multiplier;
	// Calculates what the opponents health would be after an attack
	var opponentNewHealth = opponentHealth - fullAttack;
	// Calculates what the players health would be after a counter
	var playerNewHealth =  $("#" + player + "health").text() - $("#" + player + "counter").text();
	
	// player wins round if opponent's health is 0 or below else lowers the opponents health
	if(opponentNewHealth <= 0){
		alert("You win!");
		$("#" + opponent + "health").text(0);
		$("#" + player + "attack").text(parseInt($("#" + player + "attack").text()) + 3)

		$("#" + opponent).addClass("defeated");
		$("#" + player + "attackbtn").addClass("invisible");
		//remove defeated opponent from enemies array
		enemies.splice(enemies.indexOf(opponent),1);

		selectOpponent();
	}else{
		$("#" + opponent + "health").text(opponentNewHealth);
		$("#" + player + "health").text(playerNewHealth);
	}

	//player looses if health is 0 or below else lowers the players health
	if(playerNewHealth <= 0 && opponentNewHealth > 0){
		$("#" + player + "attackbtn").addClass("invisible");
		$("#" + player + "health").text(0);
		alert("you died!");
	}
	multiplier++;
});

//function to select opponent
function selectOpponent(){

	$.each(enemies, function(index, person){
		$("#" + person + "opponentbtn").removeClass("invisible");
	});
}