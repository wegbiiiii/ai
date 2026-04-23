// jquery 사용시 준비사항

$(function(){
    //버튼을 손모양으로 표시
    $("button").css({cursor : "pointer"})

    // btn1를 클릭하면 .box1에 첫번째박스 부드럽게 사라지기
    $("#btn1").click(function(){
        $(".box1 div:first-child").fadeOut(1000);
    })
    // btn2를 클릭하면 .box1에 첫번째박스 부드럽게 보이기
    $("#btn2").click(function(){
        $(".box1 div:first-child").fadeIn(1000);
    })

    // btn3를 클릭하면 .box1에 두번째 박스 부드럽게 보이기/숨기기
    $("#btn3").click(function(){
        $(".box1 div:last-child").fadeToggle(1000);
    })

    // btn4를 클릭하면 .box2에 첫번째박스 높이 0
    $("#btn4").click(function(){
        $(".box2 div:first-child").slideUp(500);
    })

    // btn5를 클릭하면 .box2에 첫번째박스 높이를 요소크기만큼
    $("#btn5").click(function(){
        $(".box2 div:first-child").slideDown(500);
    })

    // btn6를 클릭하면 .box2에 두번째박스 높이0/ 높이 요소크기만큼
    $("#btn6").click(function(){
        $(".box2 div:nth-child(2)").slideToggle(500);
    })

    // btn7를 클릭하면 .box2에 세번째박스 애니메이션
    $("#btn7").click(function(){
        $(".box2 .ani").animate({left : "880px"});
    })

    // btn8를 클릭하면 .box2에 세번째박스 애니메이션2
    $("#btn8").click(function(){
        $(".box2 .ani").animate({left : "440px"});
    })

    // btn9를 클릭하면 .box3에 첫번째박스 class추가(.bg)
    $("#btn9").click(function(){
        $(".box3 div:first-child").addClass("bg");
    })

    // btn10를 클릭하면 .box3에 첫번째박스 class삭제(.bg)
    $("#btn10").click(function(){
        $(".box3 div:first-child").removeClass("bg");
    })
});