function CreateCharacter(name,image, health, attack, counter, weapons){
	
	this.name = name;
	this.id = "#" + name.replace(/ /g,'');
	this.image = image;
	this.health = health;
	this.attack = attack;
	this.counter = counter;
	this.weapons = weapons;
	console.log(this);
	this.createProfile = function(){
		//Create Div for character profile
		
		var appendHtml = "<div id=\"" + this.id + "\"><img src=\"" + this.image + "\"><div class=\"characterStats\"><span>Name: </span><span>" + this.name + "</span><span>Health: </span><span>" + this.health + "</span><span>Attack: </span><span>" + this.attack + "</span><span>Counter: </span><span>" + this.counter + "</span></div></div>";
		$(".characters").append(appendHtml);
	};
	this.createProfile();

};
	

//  character constructors
var ahsoka = new CreateCharacter("Ahsoka Tano","assets/images/characters/ahsoka.jpg", 20, 2, 1, 2);
var fives = new CreateCharacter("CT-5555","assets/images/characters/ct5555.jpg",30, 4, 2,1);
var grevious = new CreateCharacter("General Grevious","assets/images/characters/doku.jpg", 35, 2, 1, 4);
var doku = new CreateCharacter("Count Doku","assets/images/characters/grevious.jpg", 40, 10, 5, 1);

 //ahsoka.createProfile();

