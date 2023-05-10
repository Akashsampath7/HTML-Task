const student ={
    firstname:"Jon",
    lastname:"snow",
    gender:"male",
    dob:"07-05-2000",
    age:23,
    department:["BCA","MSC","BTECH","MCA"]
};
console.log(student);
console.log("");

console.log("Student department is "+student.department);
console.log("");

console.log("Student age is "+student["age"]);
console.log("");

//using THIS keyword
const employee={
    firstName:"Arya",
    lastName:"stark",
    fullName: function() {
        return this.firstName + " " + this.lastName;
      }
};
console.log(employee.fullName());
console.log("");

//Iterating Over a String
const name="JavaScript";
let text=""
for (const x of name){
    text = text + x+"<br>";
    console.log(x);
}
console.log("");

//Iterating Over a Array
const colour =["black", "blue", "purple"];
let colortext=""
for (const y of colour){
    colortext = colortext + y+"<br>";
    console.log(y);
}
console.log("");

//Iterating Over a Map
const students = new Map();
students.set("logaraj", 10);
students.set("diwakar", 30);
students.set("lokesh", 20);

console.log("displaying particular value using get: "+students.get("diwakar"));
console.log("");

console.log("Displaying size of values "+students.size);
console.log("");

students.delete("lokesh");
console.log("after deleting one value: "+ students.size);
console.log("");

//check whether value is present or not using has.
console.log(students.has("logaraj"));
console.log("");

//using for loop
    let studentstext=""
    for (const z of students){
        studentstext = studentstext + z+"<br>";
        console.log(z);
    }
    console.log("");

//Iterating Over a Set

const words = new Set(["a","b","c"]);
let wordtext = "";
for (const a of words) {
  wordtext = wordtext + a + "<br>";
  console.log(a);
}
console.log("");
console.log("Displaying size of values "+words.size);
console.log("");
