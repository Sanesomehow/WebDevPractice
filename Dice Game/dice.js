

var randomNumber1 = Math.floor((Math.random() * 5) + 1);

var randomNumber2 = Math.floor((Math.random() * 5) + 1);

var add1 = "images/dice" + randomNumber1 + ".png";

var add2 = "images/dice" + randomNumber2 + ".png";


if (randomNumber1 === randomNumber2)
{
    document.querySelector("h1").innerText = "Draw!";
}
else if (randomNumber1 > randomNumber2)
{
    document.querySelector("h1").innerText = "Player 1 Wins!"
}
else if (randomNumber1 < randomNumber2) 
{
    document.querySelector("h1").innerText = "Player 2 Wins!"
}

document.querySelector(".img1").setAttribute("src", add1);

document.querySelector(".img2").setAttribute("src", add2);


