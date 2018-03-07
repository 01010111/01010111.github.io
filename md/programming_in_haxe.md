# Programming in Haxe
## A Primer!

Hi! This is a quick primer in programming in Haxe, an open source strictly typed programming language and cross compiler. Tons of people (myself included) use Haxe to create games, apps, websites, and lots of other things!

I'll also be going over some basic computer science, so don't worry if you've never coded anything before!

To follow along with this article, there's no need to download anything! Just go to [try.haxe.org](https://try.haxe.org/) and experiment along with the lessons!

## Table of Contents

- [Part One - Intro](#part-one-intro)
- [Part Two - Classes](#part-two-classes)
- [Part Three - Variables](#part-three-variables)
- [Part Four - Objects](#part-four-objects)
- [Part Five - Visibility](#part-five-visibility)
- [Part Six - Functions](#part-six-functions)
- [Part Seven - If & Else](#part-seven-if-else)
- [Part Eight - Loops](#part-eight-loops)
- [Part Nine - Arrays](#part-nine-arrays)
- [Part Ten - Inheritence](#part-ten-inheritence)
- [Epilogue](#epilogue)

---

## Part One - Intro

If you're wondering if Haxe is for your next project, ask yourself these questions:

- Are you comfortable in any other object oriented languages like Java, C++, PHP, or AS3?
- Do you want your next project on multiple targets - including HTML5, Flash, Windows, Mac/OSX, Linux, Android, iOS, and more?
- Are you interested in open source projects and communities?
- Did you specifically come to this tutorial to learn Haxe?

If you answered "yes" to any of these, Haxe might be a good programming language for you!

So what does Haxe look like?

```haxe
class Test
{

	// Here are some variables!
	static var my_name:String = 'Will';
	static var my_likes:Array<String> = [
		'gamedev',
		'cheeseburgers',
		'karaoke'
	];

	static function main()
	{
		trace('Hi! My name is $my_name, and I really like...');
		
		for (i in 0...my_likes.length)
		{
			trace(my_likes[i]);
		}
	}

}
```

You can create comments in your code with two slashes (**//**) - your program will ignore anything on the same line after those slashes! I'll be using comments within some of the code examples to annotate the code, so pay attention!

If that looks like gibberish to you now, don't worry! In the next hour or so you'll be able to write something way more interesting!

### [Back to top](#programming-in-haxe)

---

## Part Two - Classes

A class is an organized structure of data. It consists of a name, a path, and zero or more members. Go to [try.haxe.org](https://try.haxe.org/), and you'll be presented with the following:

```haxe
class Test 
{

	static function main()
	{
		trace("Haxe is great!");
	}

}
```

You can see this class is named **Test**. What you don't see is that its path has been implied as the root of the program. If you wanted to explicitly label the path, you could add the following at the top of the code:

```haxe
package;
```

Since there's no path declared after **package**, the path is implied to be the root directory of the source folder. If you were building a program in your own code editor, and your source folder was structured like this:

```
📂 source
	📂 objects
		📂 people
			📄 Person.hx
```

You would start off the **Person.hx** file like this:

```haxe
package objects.people;
```

While coding on try.haxe.org, you won't need to mess around with that, but this info is very useful if you start making programs outside of the 'net!

Finally, the code on try.haxe.org has one member, a function called **main()**. Members of a class are enclosed between the curly brackets for that class.

Notice that blocks of code are enclosed between two **{ curly brackets }**, and every instruction ends in a semicolon (**;**)

Classes can have another kind of member as well - the **variable**!

### [Back to top](#programming-in-haxe)

---

## Part Three - Variables

A variable is a value or object that has been given a name. That way you can reference or change them later! In Haxe, there are several basic types of variable:

- **Bool** (short for boolean) is a variable that is either true or false.
- **Int** (short for integer) is a whole number like -14, or 256. It can also be writen in hexadecimal, like 0xF0000D.
- **Float** (floating-point number) is a number that can have a decimal place. (Note you can always use an Int where a Float is expected, but not vice-versa!)
- **String** is a sequence of characters, like **"Hello World!"** You can create a String by placing text between two "double quotation marks" or two 'single quotation marks'!

Let's add some of these to our code!

```haxe
class Test 
{

	static function main()
	{
		var alive:Bool = true;
		var age:Int = 70;
		var name:String = 'Buck';

		trace("Haxe is great!");
	}

}
```

Now, let's change the trace call to use some of those variables!

```haxe
		trace('$name is $age years old.');
```

Did you notice how some of those words have a dollar sign before them? Haxe has a feature called _String Interpolation_ that allows you to access variables or use expressions within a String. This only works if the String is using 'single quotation marks' instead of "double".

### [Back to top](#programming-in-haxe)

---

## Part Four - Objects

An object is an _instance_ of a class. You could think of a class as the blueprints to make an object.

Let's organize all of that personal info into a class called **Person**. At the bottom of your code, add the following:

```haxe
class Person
{
	public var alive:Bool;
	public var age:Int;
	public var name:String;

	public function new(_alive:Bool, _age:Int, _name:String)
	{
		alive = _alive;
		age = _age;
		name = _name;
	}
}
```

Notice the **new()** function. Any class that can be instantiated as an Object should have a **new()** function - this is the constructor of the class, and runs the code to setup an object!

Now let's go back up to the **Test** class and clean things up a little bit:

```haxe
class Test 
{

	static function main()
	{
		var buck:Person = new Person(true, 70, 'Buck');
		trace('$name is $age years old.');
	}

}
```

If you try to run this code, you'll get an error:

`Unknown identifier : name`

This is because we've put the name variable inside the **Person** class! We're using that class to instantiate our variable **buck**, so we can get to those variables now by accessing **buck.name**. This is called _dot notation_, and it allows you to access all of the public members of the variable that you use the dot (**.**) on!

So let's fix that in our trace function!

```haxe
		trace('$buck.name is $buck.age years old.');
```

Press **Build + Run** and...uh...that looks weird.

```
"{ alive : true, age : 70, name : Buck }.name is { alive : true, age : 70, name : Buck }.age years old."
```

What is happening here? Well, there are some things you need to keep in mind when you do _String Interpolation_ in Haxe! Any time you need to add an expression or access variables in other classes, you'll have to wrap it in some **{ curly brackets }**!

```haxe
		trace('${buck.name} is ${buck.age} years old.');
```

Let's go ahead and add an expression so we know what that looks like! An expression is just a way of saying "do this" to your program, it could be a function, an equation, or an assignment!

```haxe
		trace('${buck.name} will be ${buck.age + 1} years old next year.');
```

You're going to be an expert in creating Strings in haxe! 💪

#### Extra Credit!

Make up your own class and add variables and functions to it! For instance, you could make a **Mario** class with variables like:

- **speed:Float**
- **lives:Int**
- **has_mushroom:Bool** 

and functions like 

- **jump()**
- **crouch()**
- **run()**

### [Back to top](#programming-in-haxe)

---

## Part Five - Visibility

Have you noticed that some of our variables are marked **public**? That means that other classes can access those variables if you're using an instance of the class in which that variable lives. That's how our **Test** class could access **buck.name**.

All members of a class can be either **public** or **private**. If a member isn't marked as public in Haxe, it's infered to be private. If you have a function or variable in a class that is only used within that class, it's best to keep it private. This encapsulates data nicely, and makes code way easier to maintain!

```haxe
class Human
{
	public var name:String;
	private var secret:String;

	public function new(_name:String, _secret:String)
	{
		name = _name;
		secret = _secret;
	}

}

class Test
{

	static function main()
	{
		var joe:Human = new Human('Joe', 'I like to dance in my underwear.');

		trace(joe.name)		// "Joe"
		trace(joe.secret)	// ⚠️ Error: "Cannot access private field secret"
	}

}
```

⚠️ We get an error with the above code, because **joe.secret** is private!

You can even have variables inside of functions and other blocks of code, but they will only be visible inside those blocks.

```haxe
class Foo
{

	function bar()
	{
		var example_one:Int = 1;		// Create example_one

		if (example_one > 0)
		{
			var example_two:Int = 2;	// Create example_two
			example_one = 3;			// We can still access example_one
		}

		trace(example_one)				// "3"
		trace(example_two)				// ⚠️ Error: "Unknown identifier : example_two"
	}

}
```

⚠️ We get an error with the above code because **example_two** is created within a block of code, and we try to access it after leaving that block!

If a variable or function is marked **static** it means that you don't have to instantiate an object using that class to access it. This is useful for things like constant values and functions that are accessible across your program!

```haxe
class Constants
{

	public static var max_speed:Int = 200;	// This is a constant number

}

class Util
{

	// This function will be accesible without having to instantiate an object!
	public static function cap_speed(_speed:Float):Float
	{
		if (_speed > Constants.max_speed) return Constants.max_speed;
		else return _speed;
	}

}

class RaceCar
{

	var speed:Float = 0;
	var acceleration: Float = 0;
	public var racecar_number:Int;

	public function new(_racecar_number:Int)
	{
		racecar_number = _racecar_number;
	}

	public function update()
	{
		speed = Util.cap_speed(speed * acceleration);
	}

}
```

See how we can access those constant variables and functions within other classes without having to create instances of **Constants** and **Util**? This is nice because if we want to change the **max_speed** across our entire program, we can just change it in one place!

### [Back to top](#programming-in-haxe)

---

## Part Six - Functions

We've been doing lots of code with functions already, but now we'll take a minute to learn how to write a function. Here's a basic example of a function:

```haxe
	function hello()
	{
		trace("hello world!");
	}
```

That's cool and all, but we can't really do anything with it yet. We could add it to our **Test** class, but first we'd have to change it to static so that the static function **main()** can access it:

```haxe
class Test 
{

	static function main()
	{
		hello();
	}

	static function hello()
	{
		trace("hello world!");
	}

}
```

Now that we can use it, let's personalize it a little bit!

```haxe
	static function hello(to_who:String = 'world')
	{
		trace('hello $to_who!');
	}
```

We just added a parameter for our function called **to_who**. A parameter is like a variable that you set when you call a function that is accessible from within the function. We also gave our parameter a default value of **'world'**, this way we don't break the behavior it already had if we don't update the call in **Test.main()**. But now if we wanted to, we could call our **hello()** function with your own name to have your program say hello to yourself!

```haxe
		hello('Will') // "hello Will" - also, the height of loneliness.
```

What if we wanted our function to just give us a String back instead of using the **trace()** function? That's where a **return** comes in handy. Functions can return a value when they are run, which can be very useful! Let's change our **hello()** function to return the text instead of tracing it to the console.

```haxe
	static function hello(to_who:String = 'world'):String
	{
		return 'hello $to_who!';
	}
```

You can see that we added what type of value or object we expect the function to return by adding **:String** to the end of our function declaration. It's similar to when we're specifying the type of a variable! Then, in our **hello()** function we use the keyword **return** to return a value. If you use **return** in a function, nothing below that return will be executed.

Let's also change the **main()** function to trace that returned value!

```haxe
	static function main()
	{
		trace(hello('Will')); // "hello Will"
	}
```

So let's quickly dissect the following function:

```haxe
	public static function get_random_number(min:Float, max:Float):Float
	{
		return min + Math.random() * (max - min);
	}
```

You don't have to worry about what that code does for now (although I'd give it a shot!) - let's just look at how it's put together.

- **public** - this means that this function is accessible from outside this class.
- **static** - this means you won't have to create an instance of the class containing this function in order to use it.
- **function** - because this is a function! 😜
- **get_random_number** - this is the name of the function, you should try to name your functions descriptively, so when you're reading your code and you see it being used, you won't have to dive into the actual function to see what it's actually accomplishing, it should be clear by its name and the context in which it's being used!
- **(min:Float, max:Float)** - these are the parameters this function needs to complete its task! They are two Floats, min and max.
- **:Float** - this is the type of value this function will return, so you can use this function anywhere that expects a Float!
- Then you have the function's body, encapsulated between two **{ curly brackets }**. Notice it includes the **return** keyword, followed by an equation that will always return a Float!

Let's move on to another kind of code block!

### [Back to top](#programming-in-haxe)

---

## Part Seven - If & Else

In most programs, you'll want to use some branching logic to give your program some added functionality! An **if** statement checks to see if something is **true**, and if it is, it runs a block of code.

```haxe
	function apply_senior_discount(customer:Person, sub_total:Float):Float
	{
		if (customer.age >= 65)
		{
			sub_total = sub_total * 0.90;
		} 

		return sub_total;
	}
```

In the code above, we want a function that checks to see if a customer is eligible for a senior discount, and if they are, apply the discount. To do this we use the if statement **if (customer.age >= 65)**. If the customer's age is greater than or equal to sixty-five, the program will execute the code in the following block (it will discount 10% off the sub total). If the customer's age is below sixty-five, the block is ignored and the program moves on to the next instruction (which returns the sub total).

You could also write the above code in another way:

```haxe
	function apply_senior_discount(customer:Person, sub_total:Float):Float
	{
		if (customer.age >= 65)
		{
			return sub_total * 0.90;
		} 
		else
		{
			return sub_total;
		}
	}
```

When an **if** statement has an accompanying **else** statement, the block below **else** will be executed if the expression with the **if** statement is false!

You can also use an **else if** statement, to check another expression. What if the manager of our hypothetical establishment wanted to give a 10% discount on Tuesdays, but they don't want to give senior customers the extra discount?

```haxe
	function apply_senior_discount(customer:Person, sub_total:Float, day:String):Float
	{
		if (customer.age >= 65)
		{
			sub_total = sub_total * 0.90;
		}
		else if (day == 'Tuesday')
		{
			sub_total = sub_total * 0.90;
		}

		return sub_total;
	}
```

Notice we're checking **day == 'Tuesday'** and not **day = 'Tuesday'**. If you want to check to see if something is equal to something else, use two equals signs (**==**), and if you want to assign a value to a variable, use one equals sign (**=**).

That works fine, but if you look at it, we're _duplicating_ the code **sub_total = sub_total * 0.9**! It will never run twice, but one of the fun things about programming is making our code elegant, and if you're writing redundant code, there's always a way to simplify things! We can use an or operator, two pipes (**||**), to check to see if one expression **or** the other is true!

```haxe
	function apply_senior_discount(customer:Person, sub_total:Float, day:String):Float
	{
		if (customer.age >= 65 || day == 'Tuesday')
		{
			sub_total = sub_total * 0.90;
		}

		return sub_total;
	}
```

The above code will check to see if the customer is elegible for a senior discount, _or_ if it's a Tuesday. In either case, it will apply the discount.

Now our code is looking nice and elegant! Let's imagine that the manager of our establishment is in a bad mood and want's to only give the senior discount on Tuesdays. we can use the and operator, two ampersands (**&&**), to check if both one expressing _and_ the other are true!

```haxe
	function apply_senior_discount(customer:Person, sub_total:Float, day:String):Float
	{
		if (customer.age >= 65 && day == 'Tuesday')
		{
			sub_total = sub_total * 0.90;
		}

		return sub_total;
	}
```

The code above will check to see if the customer is elegible for a senior discount **and** the day is Tuesday. Only if both are true will it apply the discount.

To check to see if something **isn't** true, you can use an exclamation mark (**!**) to indicate that you're checking to see if it is not true.

```haxe
	static function main()
	{
		var foobar:Bool = false;
		if (!foobar)
		{
			trace('foobar is false!');
		}

		var day:String = 'Tuesday';
		if (day != 'Friday')
		{
			trace('I can't wait til Friday!');
		}
	}
```

Notice that an if statement always expects a Bool. You can't write something like **if (1)** because **1** is an Int.

### [Back to top](#programming-in-haxe)

---

## Part Eight - Loops

Sometimes we want to execute a block of code many different times.

```haxe
	function ninety_nine_bottles()
	{
		trace('99 bottles of beer on the wall, 99 bottles of beer! Take one down, pass it around, 98 bottles of beer on the wall!');
		trace('98 bottles of beer on the wall, 98 bottles of beer! Take one down, pass it around, 97 bottles of beer on the wall!');
		trace('97 bottles of beer on the wall, 97 bottles of beer! Take one down, pass it around, 96 bottles of beer on the wall!');
		... I give up.
	}
```

Don't worry, you don't have to do [that](https://www.google.com/search?q=simpsons+intro+chalkboard&tbm=isch).

Let's use a **while()** loop to do it all!

```haxe
	function ninety_nine_bottles()
	{
		var i:Int = 99;
		while (i > 0)
		{
			trace('$i bottles of beer on the wall, $i bottles of beer! Take one down, pass it around, ${ i - 1 } bottles of beer on the wall!');
			i--;
		}
	}
```

Yay! Laziness can be a virtue if you use it correctly! Let's see what is going on here!

- **var i:Int = 99;** - First we set up a variable that we'll use as a counter. I like to use **i** in these situations, because i can be short for _iterator_.
- **while(i > 0)** - This is similar to saying "if (i > 0)", but it will continue doing the block of code _forever_ until the expression is not true. This can be dangerous if the expression you're checking has a chance to never be false!
- **trace('$i bottles of...on the wall!');** - We're using _String Interpolation_ with our **while()** loop to sing dumb songs!
- **i--;** - This is the most important part! We need to subtract one from our **i** variable so in the next loop we'll have less bottles (and our loop won't continue forever)! 
 
**++** and **--** are two handy shortcuts that add or subtract 1 from a value in place. We could have written it as **i -= 1**, which has the same effect. If our hypothetical bartender handed out two at a time, we could use **i -= 2**! Both of these shortcuts are just easier ways of saying **i = i - 1**.

There is another way to make loops in Haxe as well, the **for** loop!

```haxe
	function ninety_nine_bottles()
	{
		for (i in 0...99)
		{
			trace('${99 - i} bottles of beer on the wall, ${99 - i} bottles of beer! Take one down, pass it around, ${98 - i} bottles of beer on the wall!');
		}
	}
```

The **for** loop in Haxe is very elegant! Let's take a closer look!

**for (i in 0...99)** - This line sets up the whole thing! We're setting up our iterating variable **i** and then we give it a range of numbers to loop through with **0...99**. We don't have to change **i** within our code block, either! There's also no chance of a **for()** loop to go on forever! For these reasons I usually stick with **for()** instead of **while()**!

### [Back to top](#programming-in-haxe)

---

## Part Nine - Arrays

An **array** is a collection of values. Lots of times you'll want a list of numbers, strings, or objects that you can refer to! Let's learn how to use arrays!

```haxe
class Test
{

	static var fruits:Array< String > = [
		'apple',
		'banana',
		'tomato',
		'grape'
	];

	static function main()
	{

	}

}
```

- **fruits** is the name of our array.
- **:Array** tells us what our variable's type is. 
- **< String >** tells us what kind of array our variable is, in this case it will be a collection of Strings!
- **[ square brackets ]** are what house our collection!

You can see I've added 4 Strings to our array, you could also add them all on one line like this:

```haxe
	static var fruits:Array< String > = ['apple', 'banana', 'tomato', 'grape'];
```

I like to look at lists vertically, so I prefer the first one, but it's up to you!

You can access an item in an array by referring to its index in the array! To get the first element in an array, you'd type **array[0]**, because arrays in Haxe are _zero indexed_. You can see how many elements are in an array by checking **array.length**:

```haxe
class Test
{

	static var fruits:Array< String > = [
		'apple',
		'banana',
		'tomato',
		'grape'
	];

	static function main()
	{
		trace('the first fruit in the array is: ${fruits[0]}');
		trace('there are ${fruits.length} fruits in the array!');
	}

}
```

There are many ways to alter an array, but we're going to look at two methods:

- **push()** - this will _push_ an element into your array at the end of the array.
- **remove()** - this will _remove_ an element from your array!

```haxe
class Test
{

	static var fruits:Array< String > = [
		'apple',
		'banana',
		'tomato',
		'grape'
	];

	static function main()
	{
		trace(fruits.length);		// 4
		fruits.push('pineapple');	// 🍍
		trace(fruits.length);		// 5
		fruits.remove('tomato'); 	// for all the nutritionists out there 😜
		trace(fruits.length);		// 4
	}

}
```

You can use loops to iterate through each item in an array in a couple of cool ways! First, you would access the element like usual:

```haxe
class Test
{

	static var fruits:Array< String > = [
		'apple',
		'banana',
		'tomato',
		'grape'
	];

	static function main()
	{
		for (i in 0...fruits.length)
		{
			trace('I want one ${fruits[i]}!');
		}
	}

}
```

You can also create a **for()** loop specifically to loop through the elements in the array!

```haxe
class Test
{

	static var fruits:Array< String > = [
		'apple',
		'banana',
		'tomato',
		'grape'
	];

	static function main()
	{
		for (fruit in fruits)
		{
			trace('I want one $fruit!');
		}
	}

}
```

Look how clean that is! Then you can use the element in your **for()** block without having to access it using its index! If you want to know the index of the element when you're using a **for()** loop this way, you can check **fruits.indexOf(fruit)**! If an item is not indexed in an array, using **array.indexOf(item)** will return -1.

Arrays are an awesome way to store long lists of items! You can even store Arrays _inside_ arrays! 💥😲💥

```haxe
class Test
{

	static var seats:Array< Array< Int > > = [
		[ 0,  1,  2,  3],
		[ 4,  5,  6,  7],
		[ 8,  9, 10, 11],
		[12, 13, 14, 15],
	];

	static function main()
	{
		trace(find_seat(9));
	}

	static function find_seat(seat_number:Int):String
	{
		for (row in seats)
		{
			if (row.indexOf(seat_number) > 0)
			{
				return 'Your seat is in row ${seats.indexOf(row)}!';
			}
		}

		return 'Your seat does not exist!';
	}

}
```

You can see it gets pretty wacky, so be careful when nesting arrays inside of arrays!

### [Back to top](#programming-in-haxe)

---

## Part Ten - Inheritence

Finally, I'd like to tell you a little bit about inheritence. Like many Object Oriented languages, Haxe allows you to code using inheritence. Imagine you wanted to write a few classes, you want one for **Cat**, one for **Dog**, and one for **Monkey**. You might imagine that it would get tedious because they share so many traits. For instance, they all would have the following members:

- **name:String**
- **age:Int**
- **weight:Float**
- **eat()**
- **move()**
- **sleep()**

Like I mentioned earlier, I don't like writing redundant code. I wouldn't want to just copy and paste all of those members into all of those classes! That's where inheritence comes in handy! We can add all of those members to an **Animal** class and then extend that class with our other classes!

```haxe
class Animal
{

	public var name:String;
	public var age:Int;
	public var weight:Float;

	public function new(_name:String, _age:Int, _weight:Float)
	{
		name = _name;
		age = _age;
		weight = _weight;
	}

	public function eat(food:String)
	{
		// nom nom nom
	}

	public function move(dx:Float, dy:Float)
	{
		// move around
	}

	public function sleep(how_long:Float)
	{
		// zzz
	}
	
}

class Cat extends Animal { }

class Dog extends Animal { }

class Monkey extends Animal { }

class Test
{

	static function main()
	{
		var kitty = new Cat('Sprinkles', 500, 8);
		trace('${kitty.name} is ${kitty.age} years old!');
	}

}
```

Awesome! So much work saved! Now **Cat, Dog, and Monkey** are all sub-classes of **Animal**! That means they have all of the members of **Animal** without having to rewrite them.

What if we wanted to add **talk()** though? All of these animals should have a unique voice, right? In cases where we still want to extend functionality, but apply unique functionality on top of that, we can use **override** to override the method and add new code! When you override a function, it has to have all of the same parameter types and it has to return the same type of value (even if it's nothing)!

```haxe
class Animal
{

	public var name:String;
	public var age:Int;
	public var weight:Float;

	public function new(_name:String, _age:Int, _weight:Float)
	{
		name = _name;
		age = _age;
		weight = _weight;
	}

	public function eat(food:String)
	{
		// nom nom nom
	}

	public function move(dx:Float, dy:Float)
	{
		// move around
	}

	public function sleep(how_long:Float)
	{
		// zzz
	}

	public function talk()
	{
		trace('$name sez:');
	}
	
}

class Cat extends Animal 
{

	override public function talk()
	{
		super.talk();
		trace('meow');
	}

}
```

Now if we call **kitty.talk()** we'll get the message:

```
Sprinkles sez:
meow
```

Wait, where did that "Sprinkles sez:" come from? If you look in **Animal**, you can see we added that to the **talk()** function! Then, in **Animal**, even though we override **talk()**, we're calling **super.talk()**. The **super** keyword reaches up to the super-class of the current class, which for **Cat** is **Animal** - so we can use **super.talk()** to execute the code in **Cat.talk()**!

There's one function that behaves similarly but just different enough that we should touch on it further! Let's add something to our **Cat** class:

```haxe
class Cat extends Animal 
{

	public var wants_lasagna:Bool;

	public function new(_name:String, _age:Int, _weight:Float, _is_garfield:Bool)
	{
		super(_name, _age, _weight);
		wants_lasagna = _is_garfield;
	}

	override public function talk()
	{
		super.talk();
		trace('meow');
	}

}
```

Notice how we've written a new **new()** function for **Cat**, but we aren't overriding it. Like we learned earlier, any class that can be instantiated as an Object can have a **new()** function (or constructor), and if it doesn't have one your program will look to its super-class for a constructor. Also notice we've added a new parameter to **new()**! Since we're not overriding it, we can use different parameters! One thing we _need_ to do, that we don't have to do with other functions is call our super-class' **new()** function. You might think you would use **super.new()** to do so, but all you need to type is **super()**! Don't forget that you'll need values for any of the required parameters for your super-class' constructor!

### [Back to top](#programming-in-haxe)

---

## Epilogue

I hope this lesson has helped you in your adventures! Haxe is a really great programming language and compiler, and I am always learning something new! If you've found any errors in this lesson, please let me know! If you've found any part of this lesson to be confusing, please let me know! If you want to share your experience with Haxe with me, please let me know!

You can [email](mailto:will@01010111.com) me or hit me up on [twitter](https://twitter.com/x01010111)!

I also _highly_ recommend these resources:

- [The Haxe Manual](https://haxe.org/manual/introduction.html)
- [The Haxe Cookbook](https://code.haxe.org/)
- [The Haxe API](https://api.haxe.org/)
- [Haxe Videos](https://haxe.org/videos/)

Thank you to @orion_black for proof-reading this!

### [Back to top](#programming-in-haxe)