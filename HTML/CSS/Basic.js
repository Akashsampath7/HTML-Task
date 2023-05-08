const cars=["audi","bmw","swift","nexon","ford"];
console.log(cars);

//Add new value 
cars.push("nano");
console.log(cars);

//Display particular position
console.log(cars[2]);

//Replace values in particular position
cars[3]="tata";
console.log(cars);

//Using for loop displaying values.
for(let i=0; i<cars.length;i++)
{
    console.log(cars[i]);
}
//using for each loop displaying values.
cars.forEach((cars)=> {
    console.log(cars);
});
//concat
const arr1=[1,2,3,4];
const arr2=[4,5,6,7];
const arr3 =arr1.concat(arr2);
console.log(arr3);

//join
let x=cars.join(" and ");
console.log(x);

//reverse
const rev=["C","C++","Java","HTML","CSS","JavaScript"];
rev.reverse();
console.log(rev);

//map
const numbers = [10, 20, 30, 40];
const z = numbers.map((x)=>x*2);
console.log(z);

//filter
const num = [32, 33, 16, 40,12,56,5];
const number=num.filter((x) => x >= 18);
console.log(number);

//some
const ages = [3, 11, 15, 21];
const age=ages.some((x)=> x%2==0);
console.log(age);
