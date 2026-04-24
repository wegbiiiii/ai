//햄버거 버튼을 클릭하면

let btn = document.getElementById('btn');

let mobile_menu = document.getElementById('mobile-menu');

let cover = document.getElementById('cover');

let closebtn = document.getElementById('closebtn');


console.log(btn, cover, closebtn);
console.log(mobile_menu);


btn.addEventListener('click', function(){
    mobile_menu.classList.add('on');
    cover.classList.add('on');
});





closebtn.addEventListener('click', function(){
    mobile_menu.classList.remove('on');
    cover.classList.remove('on');
});