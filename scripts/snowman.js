console.log("hello");

const platno = document.getElementById("snow");
const context = platno.getContext("2d");

context.strokeStyle = "#000";
context.fillStyle = "#f54";

context.beginPath();
context.arc(100,150,40,0,Math.PI*2, true);
context.closePath();
context.stroke();
context.fill();

context.beginPath();
context.arc(100,100,30,0,Math.PI*2, true);
context.closePath();
context.stroke();
context.fill();

context.beginPath();
context.arc(100,60,20,0,Math.PI*2, true);
context.closePath();
context.stroke();
context.fill();

context.beginPath();
context.rect(120,60,10,10)


