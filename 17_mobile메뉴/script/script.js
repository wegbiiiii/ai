$(function(){
    //햄버거 버튼을 클릭하면 모바일 메뉴 보이기

    $("button").click(function(){
        $(".cover").fadeIn(300);
        $(".mobile-menu").animate({ right: 0 },300);
    });

    //x 버튼을 클릭하면 모바일 메뉴를 브라우저 바깥으로

    $(".closebtn").click(function(){
        $(".mobile-menu").animate({ right: "-100%" },300);
        $(".cover").fadeOut(300);
    });


});