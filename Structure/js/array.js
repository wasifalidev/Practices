var student1 = "wasif ali";
var student2 = "wasif ali";
var student3 = "moazzam ali";
var student4 = "wasif ";
console.log(student1);
console.log(student2, student3, student4);
var students = ["wasif ali", "wasif ali", "moazzam ali", "wasif "];
console.log(students);
console.log(students[0]);
console.log(students[1]);
console.log(students[2]);
console.log(students[3]);
console.log(students.length);
// the push command is used to add more names like at the end of the array
console.log(students.push("wasif ali", "ahmad", "hamza"));
console.log(students);
// the pop command is used to remove the last name from the array
console.log(students.pop());
console.log(students);
// the unshift command is used to add more names like at the beginning of the array
console.log(students.unshift("Hassan", "Ali", "Ahmed", "Hamza"));
console.log(students);
// the shift command is used to remove the first name from the array
console.log(students.shift());
console.log("After shift", students);
// the slice command is used to get the names from the array
console.log(students.slice(1, 3)[0]);
// the splice command is used to add or remove names from the array
console.log(students.splice(1, 3, "wasif ali", "ahmad", "hamza"));
console.log(students);
// the splice command is used to add or remove names from the array
var cars = ["Toyota", "Honda", "Ford", "Chevrolet"];
console.log(cars.splice(3, 0, "bmw", "audi", "ferrari"));
console.log(cars);
// var students: string[] = ["Abu Hurairah","Anas","Bilal","Zahid"]
var mixedStudents = ["Abu Hurairah", "Anas", "Bilal", "Zahid", 23];
var anotherMixedStudents = ["Abu Hurairah"];
var studentTuple = ["Abu Hurairah", 23, "abuhurairah127@gmail.com"];
studentTuple = ["Abu Hurairah", 23, "abuhurairah127@gmail.com"];
studentTuple[0] = "Anas";
var singleStudent = "Abu Hurairah";
// split() divides a string into an array of substrings based on a given separator (like "H" or "").
console.log(singleStudent.split("H"));
var email = "stock/pre-order + seller1@gmail.com";
var output = email.split("");
console.log(output);
// join() joins all elements of an array into a string.
console.log(output.join("*"));
const function1 = (a, b) => {
    console.log(a);
    var num1 = 10;
    var num2 = 20;
    b(num1, num2);
};
const function2 = (a, b) => {
    console.log(a + b);
};
var number = 10;
function1(number, function2);
var arr = [1, 2, 3, 4, 5, 7, 8, 10, 11, 15, 6, 2, 5, 1, 57];
// [odd,even,odd,even,odd,odd,even,even.....]
const function1_v2 = (num, ind) => {
    return num * ind;
};
var outputArr = arr.map(function1_v2);
console.log("🚀 ~ outputArr:", outputArr);
var students2 = ["Abu Hurairah", "Anas", "Bilal", "Zahid"];
const lengthFunction1 = (student) => {
    return student.length;
};
const lengthFunction2 = (student) => {
    if (student.length >= 5) {
        return true;
    }
};
var outputArr2 = students2.map(lengthFunction2);
console.log("🚀 ~ outputArr2:", outputArr2);
var arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for (var x of arr2) {
    console.log(x);
}
var arr3 = [9, 78, 55, 88, 88, 77, 45, 12, 21, 23, 52, 52, 45, 55, 5, 55, 55, 74, 48, 89, 56];
const oddEven = (num) => num % 2 === 0 ? "Even" : "Odd";
var outputArr3 = arr3.map(oddEven);
console.log("🚀 ~ outputArr3:", outputArr3);
var students3 = ["Abu Hurairah", "Anas", "Bilal", "Zahid", "Ali", "Ahmed", "Hamza", "Hassan"];
const abc1 = (student, ind) => {
    if (ind % 2 === 0) {
        return student.length;
    }
};
var studentsLength = students3.map(abc1);
console.log("🚀 ~ studentsLength:", studentsLength);
var students4 = ["Abu Hurairah", "Anas", "Bilal", "Zahid", "Ali", "Ahmed", "Hamza", "Hassan", ""];
const abc2 = (student, ind) => ind % 2 === 0;
var studentsnew = students4.filter(abc2);
console.log("🚀 ~ studentsnew:", studentsnew);
var num = 20;
if (num % 2) {
    console.log("Even");
}
else {
    //     console.log("Odd")
}
var students5 = ["Abu Hurairah", "Anas", "Bilal", "Zahid", "Ali", "Ahmed", "Hamza", "Hassan", ""];
const abc3 = (student) => {
    console.log(student);
    return student.length;
};
var studentsnew2 = students5.forEach(abc3);
console.log("🚀 ~ studentsnew2:", studentsnew2);
var arr4 = [9, 78, 55, 88, 88, 77, 45, 12, 21, 23, 52, 52, 45, 55, 5, 55, 55, 74, 48, 89, 56];
var check = (num, ind) => {
    function numEvenOdd(num) {
        if (num % 2 === 0) {
            return "even";
        }
        else {
            return "odd";
        }
    }
    if (ind % 2 === 0) {
        return `${numEvenOdd(num)} num at even index`;
    }
    else {
        return `${numEvenOdd(num)} num at odd index`;
    }
};
var outputArr4 = arr4.map(check);
console.log("🚀 ~ outputArr4:", outputArr4);
export {};
//# sourceMappingURL=array.js.map