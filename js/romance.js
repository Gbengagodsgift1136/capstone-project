//TMBD

// const API_KEY = "api_key=74cde2b11fd1edfaf29eea68eaf8a923";
// const BASE_URL = "https://api.themoviedb.org/3/";
// const API_URL = BASE_URL + '/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&'+API_KEY;
// const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

// const searchURL = BASE_URL + '/search/movie?'+ API_KEY;
// const main = document.getElementById('main');
// const form = document.getElementById('form');
// const search = document.getElementById('search');
// getMovies(API_URL);
const API_KEY = "api_key=74cde2b11fd1edfaf29eea68eaf8a923";
const BASE_URL = "https://api.themoviedb.org/3/";
//const API_URL = BASE_URL + '/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const API_URL = BASE_URL + '/discover/movie?api_key=74cde2b11fd1edfaf29eea68eaf8a923&language=pt-BR&page=1&with_genres=35,37,80  '
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
       /* const posterImage = document.getElementById("poster-image");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("close-popup");

poster-containerImg.addEventListener("click", () => {
    popup.style.display = "block";
});

closePopup.addEventListener("click", () => {
    popup.style.display = "none";
});*/


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
   

    //popup
    /*async function get_movie_by_id (id) {
      const resp = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      const respData = await resp.json()
      console.log(respData);
      return respData
    }
    async function get_movie_trailer (id) {
      const resp = await fetch(`https://api.themoviedb.org/3/movie/157336?api_key=74cde2b11fd1edfaf29eea68eaf8a923`)
      const respData = await resp.json()
      return respData.results[0].key
    }
    async function show_popup (card) {
      popup_container.classList.add('show-popup');
      const movie_id = card.getAttribute('data-id')
      const movie = await get_movie_by_id(movie_id)
      const movie_trailer = (movie_id)
      console.log(movie_trailer);
      //console.log(image_path + movie.poster_path)
      popup_container.style.background =  `linear-gradient(rgba(0, .0, .0, .9), rgba(0, .0, .0, .1)), url(${image_path + movie.poster_path})`
      popup_container.innerHTML = `
      <span class="x-icon">&#10006;</span>
        <div class="content">
            <div class="left">
                <div class="poster-img">
                    <img class="image" src="${IMG_URL + poster_path}">
                </div>
                <div class="single-info">
                    <span>Add to favorites:</span>
                    <span class="heart-icon">&#9829;</span>
                </div>
            </div>
            <div class="right">
                <h1>${movie.title}</h1>
                <h3>${movie.tagline}</h3>
                <div class="single-info-container">
                    <div class="single-info">
                        <span>Language:</span>
                        <span>${spoken_languages[0].name}</span>
                    </div>
                    <div class="single-info">
                        <span>Length:</span>
                        <span>${runtime}</span>
                    </div>
                    <div class="single-info">
                        <span>Rate:</span>
                        <span>${vote_average} / 10</span>
                    </div>
                    <div class="single-info">
                        <span>Budget:</span>
                        <span>$ ${movie.budget}</span>
                    </div>
                    <div class="single-info">
                        <span>Release Date:</span>
                        <span>${movie.release_date}</span>
                    </div>
                </div>
                <div class="genres">
                    <h2>Genres</h2>
                    <ul>
                        ${movie.genres.map(e => `<li>${e.name}</li>`).join('')}
                    </ul>
                </div>
                <div class="overview">
                    <h2>overview</h2>
                    <p>${movie.overview}</p>
                </div>
                <div class="trailer">
                    <h2>trailer</h2>
                    <iframe width="560" height="315" 
                    src="https://www.youtube.com/embed/${movie_trailer}" 
                    frameborder="0" allowfullscreen></iframe>
                </div>
            </div>
        </div>
      `




;
}*/
//const x_icon = document.querySelector('.x-icon')
//x_icon.addEventListener('click',() => popup_container.classList.remove('show-popup'))
//const poster = document.getElementById("movie-poster");
//const popup = document.getElementById("popup");
//const closePopup = document.getElementById("close-popup");

/*poster.addEventListener("click", () => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("movie-title").textContent = data.title;
            document.getElementById("movie-overview").textContent = data.overview;
            document.getElementById("movie-rating").textContent = `Rating: ${data.vote_average}`;
            document.getElementById("movie-genres").textContent = `Genres: ${data.genres.map(genre => genre.name).join(", ")}`;
            document.getElementById("movie-trailer").textContent = "Watch Trailers:";
            document.getElementById("trailer-length").textContent = `Length of Trailer: ${data.runtime} minutes`;

            // Adjust the YouTube video link as per TMDB API response
            const youtubeTrailerKey = data.videos.results.find(video => video.site === "YouTube")?.key;
            if (youtubeTrailerKey) {
                document.getElementById("movie-trailer").innerHTML = `<a href="https://www.youtube.com/watch?v=${youtubeTrailerKey}" target="_blank">Watch Trailer</a>`;
            }

            popup.style.display = "block";
        })
        .catch(error => console.error(error));
});

closePopup.addEventListener("click", () => {
    popup.style.display = "none";
});

*/

//function show_popup(data) {
    //Selection.innerHTML = '';
    //data.forEach(_movie => {
    //})
//}
/*const posterImage = document.getElementById('movie-poster-image');
const popup = document.getElementById('popup-container');

// Function to open the popup
function openPopup() {
    popup.style.display = 'block';
}

// Function to close the popup
function closePopup() {
    popup.style.display = 'none';
}
*/
// Attach the openPopup function to the poster image click eventposterImage.getElementById("movie-poster-image").addEventListener('click', openPopup);
//popup
/*function add_click_effect_to_card (card) {
    card.forEach(card => {
      card.addEventListener('click', () => show_popup(card))
    })
}*/
//btn.addEventListener('click', add_searched_movies_to_dom)
/*async function add_searched_movies_to_dom () {
  const data = await get_movie_by_search(input.value)
 

  main_grid_title.innerText = `Search Results...`
  main_grid.innerHTML = data.map(e => {
    return `
    <div class="card" data-id = "${e.id}">
                <div class="img">
                    <img src="${image_path + e.poster_path}">
                </div>
                <div class="info">
                    <h2>${e.title}</h2>
                    <div class="single-info">
                        <span>Rate: </span>
                        <span>${e.vote_average} / 10</span>
                    </div>
                    <div class="single-info">
                        <span>Release Date: </span>
                        <span>${e.release_date}</span>
                    </div>
                </div>
    </div>
    
    `

  }).join('')
  
const card = document.querySelectorAll('.card')
add_click_effect_to_card(card)

}
*/


  
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value
  if(searchTerm) {
    getMovies(searchURL + '&query=' + searchTerm)
  }
})

//fetch(`${BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}`)
//.then(response => response.json())
//.then(data => {
 //   trailers.innerHTML = '';
   // data.results.forEach(trailer => {
     //   const iframe = document.createElement('iframe');
       // iframe.src = `https://www.youtube.com/embed/${trailer.key}`;
       //iframe.width = '560';
       //iframe.height = '315';
       //trailer.appendChild(iframe);
   // });
//})
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
