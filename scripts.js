const api_key = 'c1894df1'; // replace with your OMDB API key
const BASE_URL = `http://www.omdbapi.com/?apikey=${api_key}`;

function searchmovie(){
    const searchInput = document.querySelector("#searchInput").value;
    if(searchInput.trim() === ""){
        alert('Please enter a movie name!');
        return;
    }
    fetch(`${BASE_URL}&s=${encodeURIComponent(searchInput)}`)
    .then((Response) => Response.json())
    .then((data) => {
        if(data.Response === 'True'){
            displayMovies(data.Search);
        } else {
            alert(data.Error);
        }
    })
    .catch((error) => {
        console.log("Error fetching data", error);
    });
}

function displayMovies(movies){
    const movieResults = document.querySelector("#movieResult");
    movieResults.innerHTML = "";
    movies.forEach((movie) => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        const moviePoster = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/50x75';

        movieElement.innerHTML = `
            <img src="${moviePoster}" alt="${movie.Title}" >
            <div class="info">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
            </div>
        `;
        movieResults.appendChild(movieElement);
    });
}
