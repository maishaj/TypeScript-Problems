"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function filterEvenNumbers(arr) {
    const evenArray = arr.filter((a) => a % 2 === 0);
    return evenArray;
}
function reverseString(str) {
    let reverse = "";
    for (let i = str.length - 1; i >= 0; i--) {
        reverse = reverse + str[i];
    }
    return reverse;
}
function checkType(input) {
    if (typeof input === "string")
        return "String";
    else
        return "Number";
}
function getProperty(value, key) {
    return value[key];
}
function toggleReadStatus(book) {
    return {
        ...book,
        isRead: true,
    };
}
class Person {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
class Student extends Person {
    grade;
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }
    getDetails() {
        return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
    }
}
function getIntersection(arr1, arr2) {
    const common = arr1.filter((p) => arr2.includes(p));
    return common;
}
//# sourceMappingURL=solutions.js.map