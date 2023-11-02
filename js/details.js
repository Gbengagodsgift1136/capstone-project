window.addEventListener("load", function () {
  const loaderContainer = document.querySelector(".loader-container");
  loaderContainer.style.display = "none";
   document.body.classList.add("loaded"); 
});

document.addEventListener("DOMContentLoaded", function () {
    // Your JavaScript code here

    const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const movie_id = urlParams.get('id')
const API_KEY = "?api_key=74cde2b11fd1edfaf29eea68eaf8a923";
const BASE_URL = "https://api.themoviedb.org/3/";
const API_URL = BASE_URL + `movie/${movie_id}` + API_KEY+'&append_to_response=credits'+'&append_to_response=videos';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const trailer_path = `https://www.youtube.com/watch?v=`
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
const main = document.getElementById('main');
const form = document.getElementById('form')
const TRAILER_URL ='https://api.themoviedb.org/3/movie/507089/videos?language=en-US'
const search = document.getElementById('search')
const cast = `http://api.tmdb.org/3/search/person?api_key=KEY&query=tom%20hanks`
getDetails(API_URL);
function add_click_effect_to_card(card) {
    card.forEach(card => {
        card.addEventListener('click', () => show_popup(card))
    })
}
function getDetails(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data)
        showDetails(data)
    })
}
function fetchAndDisplayCastInfo(movieId) {
    const CAST_URL = BASE_URL + `movie/${movieId}/credits` + API_KEY;
  
    fetch(CAST_URL)
      .then((res) => res.json())
      .then((castData) => {
        const castMembers = castData.cast;
        const validCastMembers = castMembers.filter((member) => member.profile_path);
        const castInfoContainer = document.getElementById("castInfoContainer");
        
        validCastMembers.forEach((member) => {
          const characterName = member.character;
          const originalName = member.name;
          const profilePath = IMG_URL + member.profile_path;
          const castMemberHTML = `
          
            <div class="cast-member">
              <img src="${profilePath}" alt="${characterName}">
              <p class="original-name">Actor: ${originalName}</p>
              <p class="character-name">as: ${characterName}</p>
              
            </div>
          `;
          castInfoContainer.innerHTML += castMemberHTML;
        });
      })
      .catch((error) => {
        console.error('Error fetching cast data:', error);
      });
  }
  fetchAndDisplayCastInfo(movie_id);
function showDetails(card) {
    main.innerHTML = '';
    const { title, poster_path, vote_average, release_date, id, original_language, overview,tagline,genres,backdrop_path} = card;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.style.background=  `linear-gradient(rgba(0, .0, .0, .9), rgba(0, .0, .0, .1)), url(${IMG_URL+poster_path})`
    movieEl.style.backgroundRepeat= `no-repeat`
    movieEl.style.backgroundSize= `cover`
    movieEl.style.header = `${backdrop_path}`;
     console.log(IMG_URL + poster_path);
    movieEl.innerHTML = `
     <div class="popup_container">
        <div class="popup">
            <div class="image">
                <img src="${IMG_URL+poster_path}" id="card">
               
            </div>
         <div class="right">
            <h1>${title}</h1>
            <h3>${tagline}</h3>
            <div class="single-info-container">
                <div class="single-info">
                    <span>Language:</span>
                    <span id="lang">${original_language}</span>
                </div>
                <div class="single-info">
                    <span>Length:</span>
                    <span id="duration">${length}</span>
                </div>
                <div class="single-info">
                    <span>Rate:</span>
                    <span>${vote_average}/ 10</span>
                </div>
                <div class="single-info">
                    <span>Release Date:</span>
                    <span>${release_date}</span>
                </div>
            </div>
            <div class="genres">
                <h2>Genres</h2>
                <ul>
                    <li>${genres.map(e => `<li>${e.name}</li>`).join('')}</li>
                </ul>
            </div>
            <div class="overview">
                <h2>overview</h2>
                <p>${overview}</p>
                
            </div>
            <div class="EMPTY">
            
            </div>
            
        </div>
    </div>
</div>
        </div>
        </div>
        
      `
    movieEl.setAttribute('href', `./pages/movie_details.html?id=${id}&title=${title}`);

    main.appendChild(movieEl);
    movieEl.addEventListener('click', () => {
        getDetails(id)
    }
    )

}

  
    // Function to fetch trailers for a movie
    function fetchTrailers(movieId) {
      const TRAILER_URL = BASE_URL + `movie/${movieId}/videos` + API_KEY;
  
      fetch(TRAILER_URL)
        .then((res) => res.json())
        .then((trailerData) => {
          // Access the list of videos
          const videos = trailerData.results;
  
          // Get the container where you want to display the trailer
          const trailerContainer = document.getElementById("trailerContainer");
  
          // Find the first YouTube trailer in the list
          const youtubeVideo = videos.find((video) => video.site === "YouTube");
  
          if (youtubeVideo) {
            const videoKey = youtubeVideo.key;
  
            // Create an iframe to embed the YouTube video
            const iframe = document.createElement("iframe");
            iframe.src = `https://www.youtube.com/embed/${videoKey}`;
            iframe.allowFullscreen = true;
  
            // Append the iframe to the trailerContainer
            trailerContainer.appendChild(iframe);
          }
        })
        .catch((error) => {
          console.error('Error fetching trailer data:', error);
        });
    }
  
    // Call the function to fetch trailers and display the embedded trailer
    fetchTrailers(movie_id);
  });
  
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 