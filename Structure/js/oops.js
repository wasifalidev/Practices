/**
 * ============================================================================
 * 🏫 WELCOME TO THE ULTIMATE GUIDE TO OBJECT-ORIENTED PROGRAMMING (OOP) IN TYPESCRIPT! 🏫
 * ============================================================================
 *
 * Hello Student! 🍎
 * Today, we are going to explore Object-Oriented Programming (OOP) from the very basics
 * to advanced techniques using TypeScript. OOP is a programming paradigm that organizes
 * software design around data, or "objects," rather than functions and logic.
 *
 * Think of it as mapping real-world entities (like a Car, a Person, or a Bank Account)
 * into computer code.
 *
 * ----------------------------------------------------------------------------
 * 🗺️ TABLE OF CONTENTS:
 * 1. The Core Building Blocks (Classes & Objects)
 * 2. Access Modifiers & Parameter Properties (Public, Private, Protected, Readonly)
 * 3. The 4 Pillars of OOP:
 *    🎓 Pillar I: Encapsulation (Getters/Setters & Safe State)
 *    🎓 Pillar II: Inheritance (Code Reuse & Customization)
 *    🎓 Pillar III: Polymorphism (Different Shapes, Same Interface)
 *    🎓 Pillar IV: Abstraction (Abstract Classes vs. Interfaces)
 * 4. Advanced Concepts:
 *    🚀 Static Members (Shared State)
 *    🚀 Composition vs. Inheritance (Flexible Designs)
 *    🚀 Singleton Pattern (Advanced Design Pattern)
 * ============================================================================
 */
// ============================================================================
// 1. THE CORE BUILDING BLOCKS: CLASSES & OBJECTS
// ============================================================================
/**
 * 💡 TEACHER'S NOTE:
 * - A CLASS is a "blueprint" or "recipe". It defines what properties (data) and
 *   methods (behavior) an object will have.
 * - An OBJECT is an "instance" of that class. If 'House' is the blueprint,
 *   your physical house is the object.
 */
class SimpleCar {
    // 1. Properties (State of the object)
    brand;
    model;
    year;
    // 2. Constructor: The special initialization function called when we run 'new SimpleCar(...)'
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    // 3. Method (Behavior of the object)
    displayInfo() {
        console.log(`🚗 ${this.brand} ${this.model} (${this.year})`);
    }
}
// Creating (instantiating) objects:
const myCar = new SimpleCar("Tesla", "Model S", 2024);
const friendsCar = new SimpleCar("Toyota", "Camry", 2022);
console.log("--- 1. Classes & Objects ---");
myCar.displayInfo(); // Output: 🚗 Tesla Model S (2024)
friendsCar.displayInfo(); // Output: 🚗 Toyota Camry (2022)
// ============================================================================
// 2. ACCESS MODIFIERS & PARAMETER PROPERTIES
// ============================================================================
/**
 * 💡 TEACHER'S NOTE:
 * Access modifiers control who can see and modify our object's internal properties:
 * - public (default): Accessible from anywhere (inside and outside the class).
 * - private: ONLY accessible within the class that defines it.
 * - protected: Accessible within the class AND any child (derived) classes.
 * - readonly: Can only be set during initialization (in the constructor) and cannot be changed later.
 *
 * 💡 TYPESCRIPT PRO-TIP: Parameter Properties
 * Instead of declaring variables at the top and writing `this.x = x` inside the constructor,
 * you can use access modifiers directly in the constructor arguments! TypeScript compiles it
 * to the exact same javascript code automatically.
 */
class SmartCar {
    brand;
    engineCode;
    safetyRating;
    vin;
    // Look at how clean this constructor is! 
    // It declares, registers, and initializes these properties all in one go!
    constructor(brand, // Anyone can read or change this
    engineCode, // Only SmartCar methods can access this
    safetyRating, // SmartCar and subclasses can access this
    vin // Read-only, set only once
    ) {
        this.brand = brand;
        this.engineCode = engineCode;
        this.safetyRating = safetyRating;
        this.vin = vin;
    }
    showSecretEngineCode() {
        // Private property access is totally fine inside its own class!
        console.log(`Engine Code is: ${this.engineCode}`);
    }
}
const tesla = new SmartCar("Tesla", "P100D-992X", "5-Star", "1YV1HP87B398201");
console.log("\n--- 2. Access Modifiers ---");
console.log(tesla.brand); // Works fine (public)
// console.log(tesla.engineCode); // ❌ ERROR: Property 'engineCode' is private.
// console.log(tesla.safetyRating); // ❌ ERROR: Property 'safetyRating' is protected.
// tesla.vin = "NEW-VIN"; // ❌ ERROR: Cannot assign to 'vin' because it is a read-only property.
tesla.showSecretEngineCode(); // Works fine! Exposes the code safely via a public method.
// ============================================================================
// 3. PILLAR I: ENCAPSULATION
// ============================================================================
/**
 * 💡 TEACHER'S NOTE:
 * Encapsulation is the practice of bundling data and methods inside a class,
 * and restricting direct access to the state (variables).
 * We do this to prevent external code from corrupting our data.
 * We use Getters and Setters to provide a safe "control valve" for reading and writing data.
 */
class BankAccount {
    owner;
    _balance = 0; // The underscore (_) is a standard convention for private backing fields
    constructor(owner) {
        this.owner = owner;
    }
    // GETTER: Allows reading the balance like a normal property, but we can format or control access!
    get balance() {
        return this._balance;
    }
    // SETTER: Allows modifying the balance, but with custom validation checks!
    set balance(newAmount) {
        if (newAmount < 0) {
            console.log("⚠️ Teacher warning: Balance cannot be negative!");
            return;
        }
        this._balance = newAmount;
    }
    // A method to deposit money safely
    deposit(amount) {
        if (amount > 0) {
            this._balance += amount;
            console.log(`💰 Deposited $${amount}. New Balance: $${this._balance}`);
        }
    }
}
console.log("\n--- 3. Encapsulation ---");
const account = new BankAccount("Wasif");
account.balance = 500; // Calls the setter!
console.log(`Current Balance: $${account.balance}`); // Calls the getter!
account.balance = -100; // Triggers validation: ⚠️ Teacher warning: Balance cannot be negative!
account.deposit(250);
// ============================================================================
// 4. PILLAR II: INHERITANCE
// ============================================================================
/**
 * 💡 TEACHER'S NOTE:
 * Inheritance allows you to create a parent class (Base Class) and then make
 * child classes (Derived Classes) that inherit all properties and methods from it.
 * This prevents copy-pasting code!
 *
 * - Use 'extends' to inherit.
 * - Use 'super()' in the child constructor to run the parent's constructor first!
 * - You can override methods (redefine them) in child classes to specialize behavior.
 */
// Parent Class
class Animal {
    name;
    constructor(name) {
        this.name = name;
    }
    makeSound() {
        console.log("Some generic animal sound...");
    }
}
// Child Class
class Dog extends Animal {
    breed;
    // We can add dog-specific properties!
    constructor(name, breed) {
        super(name); // Call parent class constructor with the name parameter!
        this.breed = breed;
    }
    // METHOD OVERRIDING: We redefine 'makeSound' specifically for a Dog
    makeSound() {
        console.log(`🐶 ${this.name} the ${this.breed} says: Woof! Woof!`);
    }
    fetchBall() {
        console.log(`🎾 ${this.name} is fetching the ball happily!`);
    }
}
console.log("\n--- 4. Inheritance ---");
const myDog = new Dog("Buddy", "Golden Retriever");
myDog.makeSound(); // Call overridden method: Buddy the Golden Retriever says: Woof! Woof!
myDog.fetchBall(); // Call dog-specific method
// ============================================================================
// 5. PILLAR III: POLYMORPHISM
// ============================================================================
/**
 * 💡 TEACHER'S NOTE:
 * "Polymorphism" literally means "many shapes".
 * It allows different objects to respond to the *same* method call in their own custom way.
 *
 * If a program is looking for an 'Animal' and expects a 'makeSound' method, we can pass it
 * a Dog, a Cat, or a Bird. They all conform to 'Animal', but each produces a unique sound!
 */
class Cat extends Animal {
    makeSound() {
        console.log(`🐱 ${this.name} says: Meow!`);
    }
}
// A function that demonstrates polymorphism:
// It takes any Animal, but behavior is resolved dynamically at runtime!
function makeAnimalSpeak(animal) {
    animal.makeSound();
}
console.log("\n--- 5. Polymorphism ---");
const genericAnimal = new Animal("Generic Beast");
const rex = new Dog("Rex", "German Shepherd");
const whiskers = new Cat("Whiskers");
makeAnimalSpeak(genericAnimal); // Output: Some generic animal sound...
makeAnimalSpeak(rex); // Output: 🐶 Rex the German Shepherd says: Woof! Woof!
makeAnimalSpeak(whiskers); // Output: 🐱 Whiskers says: Meow!
// ============================================================================
// 6. PILLAR IV: ABSTRACTION
// ============================================================================
/**
 * 💡 TEACHER'S NOTE:
 * Abstraction means hiding complex background details and only showing the essential features.
 * We do this using:
 * 1. ABSTRACT CLASSES: Classes that cannot be instantiated directly. They are templates
 *    that force subclasses to implement specific "abstract methods".
 * 2. INTERFACES: Pure blueprints. They contain only signatures of fields and methods
 *    with absolutely zero implementation details. A class 'implements' an interface.
 */
// --- 6.1 Abstract Class Example ---
class Appliance {
    brand;
    constructor(brand) {
        this.brand = brand;
    }
    // Concrete method: all appliances have this implementation automatically
    turnOn() {
        console.log(`${this.brand} appliance is now ON.`);
    }
}
class WashingMachine extends Appliance {
    // Implementing the abstract method is mandatory here!
    doWork() {
        console.log("🧺 Washing clothes in progress...");
    }
}
// A class can implement interfaces to promise it will follow a certain structure!
class Airplane {
    altitudeLimit;
    aircraftModel;
    constructor(altitudeLimit, aircraftModel) {
        this.altitudeLimit = altitudeLimit;
        this.aircraftModel = aircraftModel;
    }
    fly() {
        console.log(`✈️ ${this.aircraftModel} is flying up to ${this.altitudeLimit} feet!`);
    }
}
console.log("\n--- 6. Abstraction ---");
// const app = new Appliance("Samsung"); // ❌ ERROR: Cannot create an instance of an abstract class.
const washer = new WashingMachine("LG");
washer.turnOn(); // Shared method from abstract class
washer.doWork(); // Subclass-defined abstract method implementation
const boeing = new Airplane(35000, "Boeing 747");
boeing.fly();
// ============================================================================
// 7. ADVANCED OOP: STATIC MEMBERS
// ============================================================================
/**
 * 💡 TEACHER'S NOTE:
 * Static properties and methods belong to the class itself, not to individual instances.
 * They are useful for configuration settings, utility helpers, or keeping track of global
 * data (e.g., counting how many objects of a class have been created).
 */
class MathHelper {
    // Static constant
    static PI = 3.14159265359;
    // Static helper method
    static calculateCircumference(radius) {
        return 2 * this.PI * radius;
    }
}
class UserTracker {
    username;
    static activeUsersCount = 0;
    constructor(username) {
        this.username = username;
        UserTracker.activeUsersCount++; // Increment the global class counter whenever a new user is created!
    }
}
console.log("\n--- 7. Static Members ---");
// No need to call 'new MathHelper()' to use static features:
console.log(`Pi constant: ${MathHelper.PI}`);
console.log(`Circumference (r=5): ${MathHelper.calculateCircumference(5)}`);
const user1 = new UserTracker("Alice");
const user2 = new UserTracker("Bob");
console.log(`Total active users in system: ${UserTracker.activeUsersCount}`); // Output: 2
// ============================================================================
// 8. ADVANCED OOP: COMPOSITION VS INHERITANCE
// ============================================================================
/**
 * 💡 TEACHER'S NOTE:
 * Inheritance is "IS-A" relationship (e.g., a Dog IS-A Animal).
 * Composition is a "HAS-A" relationship (e.g., a Car HAS-A Engine).
 *
 * ⚠️ Design Tip: "Favor Composition over Inheritance".
 * Inheritance can couple your classes too tightly, making it hard to change later.
 * Composition builds complex behaviors by combining small, independent, specialized pieces.
 */
// Let's create reusable components (Behaviors)
class Engine {
    start() {
        console.log("🔥 Engine vroom vroom!");
    }
}
class GPS {
    findRoute(destination) {
        console.log(`🗺️ Routing to: ${destination}`);
    }
}
// We compose our LuxuryCar class using other class instances!
class LuxuryCar {
    brand;
    engine;
    gps;
    constructor(brand) {
        this.brand = brand;
        this.engine = new Engine(); // LuxuryCar HAS an Engine
        this.gps = new GPS(); // LuxuryCar HAS a GPS
    }
    driveTo(destination) {
        console.log(`Starting trip in ${this.brand}...`);
        this.engine.start();
        this.gps.findRoute(destination);
    }
}
console.log("\n--- 8. Composition ---");
const myLuxuryRide = new LuxuryCar("Porsche");
myLuxuryRide.driveTo("New York City");
// ============================================================================
// 9. ADVANCED OOP: SINGLETON PATTERN
// ============================================================================
/**
 * 💡 TEACHER'S NOTE:
 * A Design Pattern is a standardized solution to a common programming problem.
 * The SINGLETON pattern guarantees that a class has only ONE single instance
 * globally, and provides a global access point to it.
 *
 * How we achieve it:
 * 1. Make the constructor private so no one can write 'new DatabaseConnection()' externally.
 * 2. Store the single instance in a private static variable.
 * 3. Provide a public static method (often called 'getInstance') to get that single instance.
 */
class DatabaseConnection {
    static instance = null;
    // 1. Private Constructor
    constructor() {
        console.log("🔌 Connecting to database...");
    }
    // 2. Public Static Accessor
    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }
    query(sql) {
        console.log(`⚡ Executing query: "${sql}"`);
    }
}
console.log("\n--- 9. Singleton Pattern ---");
// const dbErr = new DatabaseConnection(); // ❌ ERROR: Constructor of class 'DatabaseConnection' is private.
const db1 = DatabaseConnection.getInstance(); // Prints "Connecting to database..."
const db2 = DatabaseConnection.getInstance(); // Reuses existing connection, prints nothing!
db1.query("SELECT * FROM users;");
console.log(`Are both instances identical? ${db1 === db2}`); // Output: true (They are the exact same instance!)
export {};
// ============================================================================
// 🎉 CONGRATULATIONS! You have completed the tour of OOP in TypeScript! 🎉
// Feel free to modify, run, and experiment with this file.
// ============================================================================
//# sourceMappingURL=oops.js.map