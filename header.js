// 헤더를 가져오는 함수 정의
function fetchHeader() {
    // 캐시된 헤더가 있는지 확인
    const cachedHeader = localStorage.getItem('cachedHeader');
    if (cachedHeader) {
        document.getElementById('header').innerHTML = cachedHeader;
    } else {
        // 헤더를 가져와서 캐시에 저장
        fetch('./header.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('header').innerHTML = html;
                localStorage.setItem('cachedHeader', html); // 헤더를 캐시에 저장
            })
            .catch(error => console.error('Error fetching header:', error));
    }
}

// 페이지 로드 시 헤더를 가져오기
document.addEventListener('DOMContentLoaded', function () {
    fetchHeader();

    // 검색 이벤트 리스너 추가
    const searchForm = document.querySelector('.searchForm');
    searchForm.addEventListener('submit', handleSearch);
});


// 검색 이벤트 핸들러 함수
function handleSearch(event) {
    event.preventDefault(); // 제출 이벤트의 기본 동작을 중지
    const searchInput = document.getElementById('search');
    const searchTerm = searchInput.value.toLowerCase().trim();

    console.log("Search Term:", searchTerm);

    if (searchTerm === '') {
        alert('검색어를 입력하세요!');
        return;
    }

    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchTerm}&page=1`;
    window.location.href = `search.html?query=${encodeURIComponent(searchTerm)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (!data.results || data.results.length === 0) {
                alert('검색 결과가 없습니다.');
                return;
            }
            // 검색 결과를 표시하는 함수 호출
            displaySearchResults(data.results);
        })
        .catch(error => {
            console.error('에러 파싱 데이터:', error);
        });
} 
