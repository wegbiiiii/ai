// 준비작업(바인딩)


// list box 숨김
$(function(){
    $("footer .inner .family .list").hide()
    // button을 클릭하면 리스트박스 보이기/숨기기
    $("button").click(function(){
        $(".list").slideToggle()
    })

});

