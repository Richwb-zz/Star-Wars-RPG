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
		
		var appendHtml = "<div id=\"#" + this.id + "\" class=\"character start-position\"><img src=\"" + this.image + "\"><div class=\"characterStats\"><div>Name: <span class=\"name\">" + this.name + "</span></div><div>Health: <span class=\"health\">" + this.health + "</span></div><div>Name: <span class=\"Attack\">" + this.attack + "</span></div><div>Counter: <span class=\"counter\">" + this.counter + "</span></div><button id=\"" + this.id + "select\" class=\"visible select\" data-character=\"" + this.id + "\" type=\"button\">Select</button><button id=\"" + this.id + "attack\" type=\"button\" class=\"invisible\" data-character=\"" + this.id + "\">Attack</button><button id=\"" + this.id + "opponent\" type=\"button\" class=\"invisible\" data-character=\"" + this.id + "\">Opponent</button>";
		$(".board").prepend(appendHtml);
	};
	this.createProfile();

	characterNames.push(this.id);

};
	
var characterNames = [];

//  character constructors
new CreateCharacter("Ahsoka Tano","assets/images/characters/ahsoka.jpg", 20, 2, 1, 2);
new CreateCharacter("CT-5555","assets/images/characters/ct5555.jpg",30, 4, 2,1);
new CreateCharacter("General Grevious","assets/images/characters/grevious.jpg", 35, 2, 1, 4);
new CreateCharacter("Count Doku","assets/images/characters/doku.jpg", 40, 10, 5, 1);

//waiting select button to be clicked to choose player character
$(".select").on("click", function(){
	//gets data-character attribute to get characters name
	var player = $(this).attr("data-character");
	//takes player name and appends to target that characters attack button
	var selected = "#" + player + "attack";


	console.log(selected);
	//switches attack button of player character from invisible to visible class
	$(selected).removeClass("invisible");
	$(selected).addClass("visible");

	
	// consider switch to individual classes for the buttons so that you can modify the css directly without having to add and remove classes
	// hides the select button on all characters
	characterLoop("#", "select", "visible" ,"remove");
	characterLoop("#", "select", "invisible" ,"add",);

	//calls selectOpponent function and passes player characters name
	selectOpponent(player);

});

//function to select opponent
function selectOpponent(playerChar){
	characterLoop("#", "opponent", "visible" ,"add", playerChar);
	characterLoop("#", "opponent", "invisible" ,"remove", playerChar);
}

// function that allows the processing of any information that involves majority of characters
// selector is either "."" or "#" for classes or IDs 
// selectorName is unique button name 
// elementName is the class/id name can be blank if not working with a class or id (css change) 
// action is the action to be taken must match switch
// ignoreCharacter character to not apply a change to
function characterLoop(selector, selectorName, elementName = "", action, ignoreCharacter = ""){
	//loops through the characterName array
	for (var i = 0; i < characterNames.length; i++) {
		//if ignoreCharacters is set it will not make changes to that character (generally player's character)
		if(characterNames[i] != ignoreCharacter){
			//combine the variable to create a jquery selector comment for classes or ids
			var element = selector + characterNames[i] + selectorName;
			//switch statement to process the action 
			switch(action){
				case action = "add":
					//adds a class
					$(element).addClass(elementName);
					break;
				case action = "remove":
					//removes a class
					$(element).removeClass(elementName)
					break;
				case action = "css":
					//modifies css
					$(element).css("visibility", value);
					break;
				default:
					break;
			}
		}
	}
}



