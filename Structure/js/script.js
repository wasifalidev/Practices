console.log("Hello World");
console.log("Hello World");
var myname = "wasif ali";
var somemath = 5 + 5;
console.log(somemath);
console.log(myname);
var numb = 10;
var numb = 20;
var numb = 30;
var sum = numb + numb + numb;
console.log(`your answer is ${sum}`);
var oper1 = sum * 5;
console.log(`your answer is ${oper1}`);
var oper2 = sum / 5;
console.log(`your answer is ${oper2}`);
var oper3 = sum - 5;
console.log(`your answer is ${oper3}`);
var oper4 = sum + 5;
oper4++;
console.log(`your answer is ${oper4}`);
var value = 10;
var value2 = 10;
var compare = value === value2;
console.log(compare);
var sum = value + value2;
console.log(`your answer is ${sum}`);
// sigle equal assign value double equal check the value eqaulity like LHS is equal 
// to RHS and triple equal check the value eqaulity like LHS is equal 
// to RHS and type is also equal
var value4 = 10;
var value3 = 10;
var compare2 = value4 == value3;
console.log(compare2);
var value5 = 10;
var value6 = 10;
var compare3 = value5 !== value6;
console.log(compare3);
var value7 = 10;
var value8 = 10;
var compare4 = value7 !== value8;
console.log(compare4);
var value9 = 10;
var value10 = 9;
var compare5 = value9 > value10;
console.log(compare5);
var value11 = 10;
var value12 = 9;
var compare6 = value11 < value12;
console.log(compare6);
var value13 = 10;
var value14 = 9;
var compare7 = value13 >= value14;
console.log(compare7);
var value15 = 10;
var value16 = 9;
var compare8 = value15 <= value16;
console.log(compare8);
var value17 = 10;
var value18 = 9;
var compare9 = value17 >= value18;
console.log(compare9);
var value19 = 10;
var value20 = 12;
var compare10 = value19 <= value20;
console.log(compare10);
if (value19 > value20) {
    console.log("value19 is greater than value20");
}
else {
    console.log("value19 is less than value20");
}
var units = 201;
if (units > 0 && units <= 200) {
    var pricePerUnit = 20;
    var Bill = units * pricePerUnit;
    var Tax = Bill * 0.1;
    var TotalBill = Bill + Tax;
    console.log("Total Bill= ", TotalBill);
}
else if (units > 200 && units <= 300) {
    var units2 = units - 200;
    var units1 = units - units2;
    var pricePerUnit = 20;
    var Bill = units1 * pricePerUnit;
    var Tax = Bill * 0.1;
    var BillUnit1 = Bill + Tax;
    var pricePerUnit2 = 30;
    var Bill2 = units2 * pricePerUnit2;
    var Tax2 = Bill2 * 0.2;
    var BillUnit2 = Bill2 + Tax2;
    var TotalBill = BillUnit1 + BillUnit2;
    console.log("Total Bill= ", TotalBill);
}
console.log("Hello World in TS folder");
console.log("Hello World in TS folder");
function name() {
    prompt("Enter your name");
}
document.getElementById("btn")?.addEventListener("click", name);
//alert("Hello World 4th time in TS folder");
// prompt("Enter your name");
//confirm("Are you sure you want to delete this file?");
var myName = prompt("Enter your name");
// console.log(myName?.trim());
// console.log(myName?.trimStart());
// console.log(myName?.trimEnd());
// console.log(myName.toLowerCase());
// console.log(myName.toUpperCase());
// console.log(myName?.length);
// console.log(myName?.replace("  ",""))
// console.log(myName?.replaceAll("  ",""))
console.log(myName);
//console.log(myName?.charAt(0))
// 33100-1000000-1
//tsc --init 
//tsc --watch
document.getElementById("btn2").addEventListener("click", () => {
    var username = document.getElementById("password").value;
    document.getElementById("username-display").innerText = username;
});
document.getElementById("btn").addEventListener("click", () => {
    document.getElementById("password").type = "text";
});
export {};
//# sourceMappingURL=script.js.map