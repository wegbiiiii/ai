$(function ( ){
    // 서버에서 영화 data 가져오는 배열변수


    let movieData = [];

    


    // 이미지 가져오기 url 주소
    let imgUrl = "https://image.tmdb.org/t/p/original"

    // api 서버에 data를 요청해서 data를 json파일형식으로 가져오기
    // 가져오는 함수
    //async 비동기식 방법

    const getMovieData = async () => {
        // api 서버를 호출
        let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=0bda5d6b5a7917e8209f970a2db952ee&language=ko&page=1&region=KR`

        console.log(url);

        // 데이터 가져오기 서버에 요청

        let response = await fetch(url);
        // 요청한 data를 json 파일 형식으로 가져옴
        let data = await response.json();
        console.log(data);
        // 서버에서 가져온 data를 내 변수에 기억
        movieData = data;
        console.log(movieData);

        //render 함수 호출
        render();
    };

    // getMovieData 함수를 호출
    getMovieData();

    // card UI반복문 함수
    const render = () => {
        // li를 계속 추가하는 변수
        let movieCard = '';

        movieData.results.map((item)=> {
            movieCard = movieCard + `<li>
                    <a href="#">
                        <div class="imgbox">
                            <img src= ${imgUrl + item.poster_path} alt="영화1">
                        </div>
                        <div class="textbox">
                            <h3>${item.title}</h3>
                            <p>
                                <span>평점:${item.vote_average}</span>
                                <span>개봉일:${item.release_date}</span>
                            </p>
                            <div class="btn_wrap">
                                <button class="btn_like">♥${item.vote_count}</button>
                                <button class="btn_date">예매</button>
                                <button class="btn_cinema">CINEMA</button>
                            </div>
                        </div>
                    </a>
                </li>`;

                //자바스크립트에서 작업한 변수를 ul 안에 넣기
                let list = document.getElementById('list')
                list.innerHTML = movieCard;
        });
    };

});