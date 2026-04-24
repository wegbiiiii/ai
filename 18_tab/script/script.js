$(function(){
    // tab메뉴를 클릭하면 해당하는 버튼에 on class 추가

    $('.tab li').click(function(){

        //index는 개발자에게 값을 알려줌
        let num = $(this).index();
        console.log(num);
        // 기존의 on class는 삭제
        $('.tab li').removeClass('on');
        $(this).addClass('on');

        // 기존의 list wrap은 숨김
        $('.list_wrap').hide();
        $('.list_wrap').eq(num).show();

    })



})

