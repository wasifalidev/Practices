// loops
// while, for, do while

// While loop syntax:
// while (Condition){
//      code
// }
// var i = 0

// while (i < students.length ){
//     console.log(students[i])
//     i++
// }

// for loop syntax:
// for (initialization; condition; increment){
//      code
// }


//  node js\loops.js
 console.log("Hello after while loop")


//  print 1st 10 integers
 //var start = 0
 //while (start<10){
 //    console.log(start)
 //    start++
 //}



// print 1st 5 odd numbers

// var start = 1
// while (start<10){
//     console.log(start)
//     start = start + 2
// }


 // print 1st 100 natural numbers from 100 to 1
 //var start = 100
 //while (start>0){
 //    console.log(start)
 //    start--
 //}


 var start = 1
 //var start2 = 100
 //while (start<=100){
 //    console.log(`${start2}${start}`)
 //    start++
 //    start2--
 //}


 //var start = 1
 while (start<=10){
     console.log(`2 x ${start} = ${2*start}`)
     start++
 }


 
var start=10;
while(start>=1){
    console.log(`${start} x 5 = ${start*5}`)
    start=start-2
}

var start = 1
while (start<=5){
    console.log(`${start} ${start} ${start} ${start} ${start}`)
    start++
}


var nums2 = [-9,-5,78,54,56,32,-98,-100,45,32,-33,15]

for(var start = 0; start < nums2.length;){
    let current = nums2[start];
    if(current !== undefined && current < 0){
        nums2.splice(start, 1);
    }else{
        start++;
    }
}
console.log(nums2)

// *
// * *
// * * *
// * * * *
// * * * * *

// console.log("* ")
// console.log("* * ")
// console.log("* * * ")
// console.log("* * * * ")
// console.log("* * * * * ")


var printable = "* "
 var i = 1
 while(i<=5){
     console.log(printable)
   printable = printable + "* " // * + * = * * 
    i++
 }

var abc = 1
 while(abc<=5){
     var def = 1
     var printable = ""
     while(def<=abc){        
         printable = printable + def + " "
         def++
     }
     console.log(printable)
     abc++
 }

 var abc = 0
var arr = ["a","b","c","d","e"]
while(abc<=4){
    var def = 0
    var printable = ""
    while(def<=abc){
        printable = printable + arr[abc] + " "
        def++
    }
    console.log(printable)
    abc++
}

// --- Learning Arrow Functions & Array Methods ---

// 1. Create an array with irregular numbers
const irregularNumbers: number[] = [42, 7, 15, 89, 3, 21];
console.log("Original Array:", irregularNumbers);

// 2. Simple Arrow Function
// Arrow functions are a concise way to write functions.
// Syntax: (parameters) => expression
const square = (n: number): number => n * n;

// 3. Using .map() to transform the array
// .map() takes each element, applies a function, and returns a NEW array.
const squaredNumbers = irregularNumbers.map((num) => square(num));
console.log("Squared Numbers (Transformed):", squaredNumbers);

// 4. Using .sort() and .map() to create a sequence
// To put numbers in a "sequence" (order), we use .sort()
// Then we can use .map() to format them.
const sequence = [...irregularNumbers]
  .sort((a, b) => a - b) // Sort in ascending order
  .map((num, index) => `Position ${index + 1}: ${num}`);

console.log("Ordered Sequence of Numbers:");
console.log(sequence);








