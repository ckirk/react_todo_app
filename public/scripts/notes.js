// function declaration
function eatBurger() {
	console.log('yum');
}

// anonomous function (no name)
var eatBurger = function() {
	console.log('yum');
}

// function expression (can use the variable to call the funciton)
var eatBurger = eatBurger() {
	console.log('yum');
}



// ARROW FUNCTIONS

// ES5
var multiply = function(x, y) {
	return x * y;
};

// ES6
var multiply = (x, y) => { x * y };

// Curly brackets are not required if only one expression is present
var multiply = (x, y) => x * y;

// Parentheses are optional when only one parameter is present
var sayHi = name => console.log('hello ' + name);

// Parentheses are required when no parameters are present.
var sayHi = () => console.log('hi');

// object literal syntax
var setNameIds = (name, id) => ({ name: name, id: id }); // Object { name: name, id: id}


// var vs let vs const

var = 'old school';
let = 'like var, but only in current block scope';
const = 'constant, cant change (values in array or keys/values in object can change, but variable refrence cannot)'

// Template Literals
var name = `Your name is ${first} ${last}.`
var url = `http://localhost:3000/api/messages/${id}`

// Multi line strings
var fourAgreements = `You have the right to be you.
    You can only be you when you do your best.`

// Default Parameters
var link = function(height = 50, color = 'red', url = 'http://azat.co') {
  // do stuff
}

