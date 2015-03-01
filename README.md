# js-inherit
Simple JavaScript Inheritance by John Resig with our improvements.

Classes can be created by calling `Class.extend(name,{ .. })`. The main things **js-inherit** get you are easy inheritance, a constructor method called `init()`, dynamic addition of a `this._super` method when a method is overloaded (be careful with this as it adds some overhead to method calls.) Calls to `instanceof` also all work as you'd hope.

By convention, classes should be capitalized, so if you wanted to create a new class, you'd write:

    Class.extend("MyClass",{ ... });
    

# Using js-inherit
Basic usage:

    Class.extend("Animal", {
        init: function (name) {
            this.name = name;
        },
        speak: function () {
            console.log(this.name);
        },
        fly: function () {
            console.log("Can't fly");
        }
    });

    Animal.extend("Butterfly", {
        speak: function () {
            console.log(this.name + " the Butterfly");
        },
        fly: function () {
            console.log("Flying");
        }
    });

    var Noname = Animal.extend({
        speak: function () {
            console.log(this.name + " the Noname");
        },
        fly: function () {
            console.log("Not sure...");
        }
    });

    var randomAnimal = new Animal("John");
    var io = new Butterfly("Io");
    var noname = new Noname("Creature");

    randomAnimal.fly(); // Logs "Can't fly"
    io.fly();           // Logs "Flying"
    noname.fly();       // Logs "Not sure..."

    randomAnimal.speak(); // Logs "John"
    io.speak();           // Logs "Io the Butterfly"
    noname.speak();       // Logs "Creature the Noname"

    console.log(randomAnimal instanceof Animal);    // true
    console.log(randomAnimal instanceof Butterfly); // false
    console.log(io instanceof Animal);              // true
    console.log(io instanceof Butterfly);           // true
    console.log(noname instanceof Animal);          // true

    console.log(randomAnimal.isA("Animal"));        // true
    console.log(io.isA("Butterfly"));               // true
    console.log(io.isA("Animal"));                  // false
    console.log(noname.isA("Noname"));              // false
    console.log(noname.isA("Animal"));              // true

If you wanted to call a super-classes’ constructor you could do that with this technique:

    Class.extend("Person", {
        init: function(isDancing){
            this.dancing = isDancing;
        }
    });

    Person.extend("Ninja", {
        init: function(){
            this._super(false);
        }
    });

    var p = new Person(true);
    console.log(p.dancing); // true

    var n = new Ninja();
    console.log(n.dancing); // false


# Requirements

* [Underscore JS](http://underscorejs.org/)


# Changelog

### v0.1 

* Initial Release