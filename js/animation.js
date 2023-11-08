const API_KEY = "api_key=74cde2b11fd1edfaf29eea68eaf8a923";
const BASE_URL = "https://api.themoviedb.org/3/";
//const API_URL = BASE_URL + '/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
//const API_URL = BASE_URL + '/discover/movie?api_key=74cde2b11fd1edfaf29eea68eaf8a923&language=pt-BR&page=1&with_genres=35,37,80  '
const API_URL = BASE_URL + '/discover/movie?api_key=74cde2b11fd1edfaf29eea68eaf8a923&with_genres=16'
const searchURL = BASE_URL + '/search/movie?'+ API_KEY;
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
getMovies(API_URL);

function add_click_effect_to_card (card) {
    card.forEach(card =>{
        card.addEventListener('click', () => show_popup(card))
    })
}

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data.results)
        showMovies(data.results)
    })
}
function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {       
        const {title, poster_path,vote_average,release_date, id} = movie;
        const movieEl = document.createElement('a');
        movieEl.style.textDecoration = `none`
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${IMG_URL+poster_path}" alt="${title}">
        <div id="hard" class="hard">
        <div class="tle">
            <h3 class="tit">${title}</h3>
            <p id="date">${release_date}</p>
        </div>
        <div class="movie-info">
        
        <span class="${getclassbyrate(vote_average)}">${vote_average}</span>
    </div>     
  </div>
        `
        movieEl.setAttribute('href', `/pages/movie_details.html?id=${id}&title=${title}`)
        main.appendChild(movieEl);
        movieEl.addEventListener('click', () => {
                getMovieDetails(id)
        })

})

    function getclassbyrate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
   }

//console.log (getColor)
   

  
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value
  if(searchTerm) {
    getMovies(searchURL + '&query=' + searchTerm)
  }
})
};

function getMovieDetails(id){
    console.log(id)
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NGNkZTJiMTFmZDFlZGZhZjI5ZWVhNjhlYWY4YTkyMyIsInN1YiI6IjY1MDA1N2IzZWZlYTdhMDEzN2QyNjBiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-nPsjMn8Gh-cd2K7SSf0X-RNcAJHUgKvr4wZ58IL6jg'
        }
      };
      
      fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
        .then(response => response.json())
        .then(data =>{
            console.log(data)
            // let d = document.getElementById("duration")
            
        })
        .catch(err => console.error(err));
}
