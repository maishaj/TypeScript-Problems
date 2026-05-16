function filterEvenNumbers(arr: number[]): number[] {
  const evenArray = arr.filter((a) => a % 2 === 0);
  return evenArray;
}

function reverseString(str: string): string {
  let reverse: string = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reverse = reverse + str[i];
  }
  return reverse;
}

type StringOrNumber = string | number;
function checkType(input: StringOrNumber): string {
  if (typeof input === "string") return "String";
  else return "Number";
}

function getProperty<T, K extends keyof T>(value: T, key: K): T[K] {
  return value[key];
}

interface Book {
  title: string;
  author: string;
  publishedYear: number;
}
function toggleReadStatus(book: Book) {
  return {
    ...book,
    isRead: true,
  };
}

class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
class Student extends Person {
  grade: string;

  constructor(name: string, age: number, grade: string) {
    super(name, age);
    this.grade = grade;
  }

  getDetails() {
    return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
  }
}

function getIntersection(arr1: number[], arr2: number[]): number[] {
  const common = arr1.filter((p) => arr2.includes(p));
  return common;
}
