let btn1 = document.getElementById("btn1");

console.log(btn1);

let fadebox = document.getElementById("fadebox");

console.log(fadebox);

btn1.addEventListener("click", function(){
    fadebox.style.transition = "all 1s";
    fadebox.style.opacity=0;
    
});

let btn2 = document.getElementById("btn2");

btn2.addEventListener("click", function(){
    fadebox.style.transition = "all 1s";
    fadebox.style.opacity=1;
});


//btn3를 클릭하면 
let btn3 = document.getElementById("btn3");

let fadetogglebox = document.getElementById("fadetogglebox");

btn3.addEventListener("click", function(){
    fadetogglebox.classList.toggle("fade-hidden");

});

let btn4 = document.getElementById("btn4");

let upbox = document.getElementById("upbox");

btn4.addEventListener("click", function(){
    upbox.classList.add("slide-hidden");
});

let btn5 = document.getElementById("btn5");

btn5.addEventListener("click", function(){
    upbox.classList.remove("slide-hidden");
});


let btn6 = document.getElementById("btn6");

let slidetogglebox = document.getElementById("slidetogglebox");

btn6.addEventListener("click", function(){
    slidetogglebox.classList.toggle("slide-hidden");
});


let btn7 = document.getElementById("btn7");

let animationbox = document.getElementById("animationbox");

btn7.addEventListener("click", function(){
    animationbox.classList.add("animove");
});


let btn8 = document.getElementById("btn8");

btn8.addEventListener("click", function(){
    animationbox.classList.remove("animove");
});