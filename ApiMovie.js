// recuperer liste film
// Attribuer les results à un constructeur ou un objet (attribTitle)
// Récupérer les results au besoin (recupTitle)


const apiKey = "2a11b00251e61d1666619faf2ce150cc"
const apiUrl = "https://api.themoviedb.org/3/"

var filmList = [];
var currentFetch = [];
var currentTitles = [];
var currentBackdropPath = [];
var currentPosterPath = [];
var currentOverview = [];
var currentPopularity = [];
divTarget = ".startdiv";
var currentArrayTosearch;
movieFetch = [];

// variables section / films
var topRated;
var topRatedMovies = [];
var trendMoviesWeek;
var trendMoviesWeekMovies = [];
var action;
var actionMovies = [];
var adventure;
var adventureMovies = [];

var startdiv = document.querySelector('.startdiv');
var blured = document.querySelector('.blured');
var infosBorderWrapper = document.querySelector('.infos-border-wrapper');
var infosPoster = document.querySelector('#poster');
var infosBackdrop = document.querySelector('#backdrop');
var infosTitle = document.querySelector('#title');
var infosDescription = document.querySelector('#description');
var infosPopularity = document.querySelector('#popularity');
var infosGenre = document.querySelector('#genre');
var movieContainer = document.querySelector('.infos-movie-container');

function hideDescription(e){
  blured.style.display = "none";
  infosBorderWrapper.style.display = "none";
  setClassName(startdiv, 'startdiv');


  //item.innerHTML ="";
}
function hide(e){
  e.style.display = "none";
}

hide(infosBorderWrapper);
hide(blured);

function reveal(e){
  e.style.display = "block";
}

function Categorie(categorieName, categorieTitle, items){
  this.categorieName = categorieName;
  this.categorieTitle = categorieTitle;
  this.items = items;
}

function Movie(title, overview, popularity, backdrop_path, poster_path, id, media_type){
  this.title = title;
  this.overview = overview;
  this.popularity = popularity;
  this.backdrop_path = backdrop_path;
  this.poster_path = poster_path;
  this.id = id;
  this.media_type = media_type;
}

const fetchMovies = async(categorie, genre = "") => {
  currentFetch = "";
  if (categorie == "discover/movie") {
    currentFetch = await fetch(apiUrl + "discover/movie" + "?api_key=" + apiKey + "&language=fr-FR" + "&with_genres=" + genre).then((response) => response.json());
  }
  else {
  currentFetch = await fetch(apiUrl + categorie + "?api_key=" + apiKey + "&language=fr-FR").then((response) => response.json()); 
  }
  attribCategorie(categorie, genre); 
}

// pour chaque catégorie dans arrayCategorie = faire un fetchMovies et attribuer à une new Categorie

//https://dev.to/kiranmantha/usestate-without-react-2c7i


async function attribCategorie(categorie, genre = ""){
    if (categorie == "movie/top_rated"){
      topRated = new Categorie("top-rated", "Mieux notés", currentFetch.results);
      createMovies(topRated);
      //createMoviesSection(topRated, topRatedMovies);
      //addMoviesInSection(topRatedMovies);
      //console.log(topRated.items[0].title);
    }
    else if (categorie == "trending/movie/week"){
      trendMoviesWeek = new Categorie("trending/movie/week", "Films tendance", currentFetch.results);
      createMovies(trendMoviesWeek);
      //console.log(trendMoviesWeek.items[0].title);
    }
    else if (categorie == "discover/movie" && genre == "28"){
      action = new Categorie("action", "Action", currentFetch.results);
      createMovies(action);
      //console.log(action.items[0].title);
    }
    else if (categorie == "discover/movie" && genre == "12"){
      adventure = new Categorie("adventure", "Aventure", currentFetch.results);
      createMovies(adventure);
      //console.log(action.items[0].title);
    } 
  }



  function addToArrays(categorieToAdd, length = categorieToAdd.items.length){
    for (i = 0; i < length; i++) {
      currentTitles.splice(i, 1, categorieToAdd.items[i].title);
      currentBackdropPath.splice(i, 1, "https://image.tmdb.org/t/p/w300/" + categorieToAdd.items[i].backdrop_path);
      currentPosterPath.splice(i, 1, "https://image.tmdb.org/t/p/w300/" + categorieToAdd.items[i].poster_path);
      currentOverview.splice(i, 1, categorieToAdd.items[i].overview);
      currentPopularity.splice(i, 1, categorieToAdd.items[i].popularity);
      };
    }

  function createMovies(categorieToAdd, length = categorieToAdd.items.length){
    var x;
    if (categorieToAdd == topRated){
      var x = topRatedMovies;
    }
    else if (categorieToAdd == trendMoviesWeek){
      var x = trendMoviesWeekMovies;
    }
    else if (categorieToAdd == action){
      var x = actionMovies;
    }
    else if (categorieToAdd == adventure){
      var x = adventureMovies;
    }

    for (i = 0; i < length; i++) { //x.splice(i, 1, 
      x.push(new Movie(categorieToAdd.items[i].title, categorieToAdd.items[i].overview, categorieToAdd.items[i].popularity, "https://image.tmdb.org/t/p/w300/" + categorieToAdd.items[i].backdrop_path, "https://image.tmdb.org/t/p/w300/" + categorieToAdd.items[i].poster_path, categorieToAdd.items[i].id, categorieToAdd.items[i].media_type));
    };

    if (categorieToAdd == topRated){
      topRatedMovies = x;
    }
    else if (categorieToAdd == trendMoviesWeek){
      trendMoviesWeekMovies = x;
      divTarget = ".thumbSection";
    }
    else if (categorieToAdd == action){
      actionMovies = x;
      divTarget = ".thumbSection";
    }
    else if (categorieToAdd == adventure){
      adventureMovies = x;
      divTarget = ".thumbSection";
    }
    
    // Creation Section
    let divBefore = document.querySelector(divTarget);
    let section = document.createElement('section');
    section.className = "thumbSection";
    appendInside(section, divBefore);

    // Creation SectionName
    divBefore = document.querySelector(divTarget);
    let sectionNamediv = document.createElement('h2');
    sectionNamediv.className = "thumbTitle";
    sectionNamediv.textContent = categorieToAdd.categorieTitle;
    appendInside(sectionNamediv, section);

    // Creation div swiper-container
    let swiperContainer = document.createElement('div');
    swiperContainer.className = "swiper-container";
    appendInside(swiperContainer, section); 
    
    // Creation div swiper-wrapper
    let swiperWrapper = document.createElement('div');
    swiperWrapper.className = "swiper-wrapper";
    appendInside(swiperWrapper, swiperContainer); 
    
    
    // Creation contenu section (ajout des films)
    for (let index = 0; index < topRatedMovies.length; index++) {

      // Creation div swiper-slide
      let swiperSlide = document.createElement('div');
      swiperSlide.className = "swiper-slide";
      swiperSlide.id = x[index].id;
      swiperSlide.addEventListener("click", createInfosMovieContainer);
      appendInside(swiperSlide, swiperWrapper); 

      // Creation img
      let img = document.createElement("img");
      img.className = "thumbTile__image";
      img.src = x[index].poster_path;
      img.alt = x[index].title;
      img.id = x[index].id;
      img.type = x[index].media_type;
      appendInside(img, swiperSlide);
      //img.addEventListener("click", createInfosMovieContainer);
    }
    createSwipperContainer();
    mySwiper.init();

  }

  async function createInfosMovieContainer(e){
    id = e.target.id;

    // https://api.themoviedb.org/3/movie/238?api_key=2a11b00251e61d1666619faf2ce150cc&language=fr-FR
    // https://api.themoviedb.org/3/tv/236?api_key=2a11b00251e61d1666619faf2ce150cc&language=fr-FR

    // movieFetch = await fetch(apiUrl + "movie/" + id + "?api_key=" + apiKey + "&language=fr-FR").then((response) => response.json(),
    // type = 'tv');
    
    let index;
    
    index = await findById(id);
    console.log(currentArrayTosearch);
    var arraySet;
    if (currentArrayTosearch == 'topRatedMovies'){
      arraySet = topRatedMovies;
    }
    else if (currentArrayTosearch == 'trendMoviesWeekMovies'){
      arraySet = trendMoviesWeekMovies;
    }
    else if (currentArrayTosearch == 'actionMovies'){
      arraySet = actionMovies;
    }
    else if (currentArrayTosearch == 'adventureMovies'){
      arraySet = adventureMovies;
    }

    if (index[0] == -1){
      console.log("Erreur, film ou série non identifié(e).");
    }
    else {

      
      console.log(arraySet);

      infosPoster.src = arraySet[index].poster_path;
      infosBackdrop.src = arraySet[index].backdrop_path;
      infosTitle.textContent = arraySet[index].title;
      infosDescription.textContent = arraySet[index].overview;
      //infosPopularity.textContent = arraySet[index].popularity;
      infosGenre.textContent = arraySet[index].genre;

      if (infosDescription.textContent == ""){
        infosDescription.textContent = "Pas de description pour le moment, revenez plus tard.";
      }
      
    }

    reveal(blured);
    setClassName(startdiv, 'blured');
    reveal(infosBorderWrapper);
    infosBorderWrapper.addEventListener("click", hideDescription);

  }


  function setClassName(target, classNameToSet){
    target.className = classNameToSet;
  }


  function findById(id){
    index = -1;
    console.log('id to find :' + id);
    index = findIndexInArray(id, topRatedMovies);
    currentArrayTosearch = "topRatedMovies";
    if (index == -1){
      index = findIndexInArray(id, trendMoviesWeekMovies);
      currentArrayTosearch = "trendMoviesWeekMovies";
        if (index == -1){
          index = findIndexInArray(id, actionMovies);
          currentArrayTosearch = "actionMovies";
        }
        if (index == -1){
          index = findIndexInArray(id, adventureMovies);
          currentArrayTosearch = "adventureMovies";
        }
    }
    if (index == -1){
      // si toujours égal a -1
      currentArrayTosearch = "";
    }
    console.log("index : " + index);
    return index;
  }
  
  function findIndexInArray(valueToFind, arrayToSearch){
    indexFound = -1;
    console.log("id to find : " + valueToFind + " array de recherche : " + arrayToSearch.length );
    for (let i = 0; i < arrayToSearch.length; i++) {
      if(arrayToSearch[i].id == valueToFind){
        indexFound = i;
      }
      }
    
    //indexFound = arrayToSearch.indexOf(valueToFind);
    if (indexFound > -1){
      return indexFound
    }
    else {
      return -1;
    }
  }

  function createSwipperContainer(){

    var mySwiper = new Swiper('.swiper-container', {
      // Param optionels
      initialSlide: 4,
      spaceBetween: 5,
      slidesPerView: 2,
      loop: true,
      freeMode: true,
      loopAdditionalSlides: 10,
      speed: 500,
      
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
      breakpoints: {
          // Si >= 570
          570: {
            slidesPerView: 3,
            slidesPerGroup: 5,
            freeMode: false
              },
          740: {
            slidesPerView: 4,
            slidesPerGroup: 5,
            freeMode: false
              },          
          920: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            freeMode: false
              },
          1115: {
              slidesPerView: 6,
              slidesPerGroup: 5,
              freeMode: false
                },
          1315: {
              slidesPerView: 7,
              slidesPerGroup: 5,
              freeMode: false
                },
          1495: {
            slidesPerView: 8,
            slidesPerGroup: 5,
            freeMode: false
                },
          1675: {
            slidesPerView: 9,
            slidesPerGroup: 5,
            freeMode: false
                },
          1880: {
            slidesPerView: 10,
            slidesPerGroup: 5,
            freeMode: false
                },
          2100: {
            slidesPerView: 11,
            slidesPerGroup: 5,
            freeMode: false
                },
          2215: {
            slidesPerView: 12,
            slidesPerGroup: 5,
            freeMode: false
                },
          2575: {
            slidesPerView: 13,
            slidesPerGroup: 5,
            freeMode: false
                },
          2755: {
            slidesPerView: 14,
            slidesPerGroup: 5,
            freeMode: false
                },
          2935: {
            slidesPerView: 15,
            slidesPerGroup: 5,
            freeMode: false
                },
          3100: {
            slidesPerView: 16,
            slidesPerGroup: 5,
            freeMode: false
                },
          3300: {
            slidesPerView: 17,
            slidesPerGroup: 5,
            freeMode: false
                },
          3500: {
            slidesPerView: 18,
            slidesPerGroup: 5,
            freeMode: false
                },
          3700: {
            slidesPerView: 19,
            slidesPerGroup: 5,
            freeMode: false
                }
      }
  })

  }

  function appendAfter(divToAppend, siblingBefore){
    siblingBefore.parentNode.appendChild(divToAppend, siblingBefore);
  }

  function appendNext(divToAppend, siblingBefore){
    siblingBefore.parentNode.insertBefore(divToAppend, siblingBefore);
  }


  function appendInside(divToAppend, siblingBefore){
    siblingBefore.appendChild(divToAppend, siblingBefore);

  }
  
  




async function fetchAll() {
await fetchMovies("movie/top_rated");
await fetchMovies("trending/movie/week");
await fetchMovies("discover/movie", "28");
await fetchMovies("discover/movie", "12");
}

fetchAll();


// arrayCategories = [
//   "movie/top_rated",
//   "trending/all/week",
//   "discover/movie?with_genres=28",
//   "movie/upcoming",
// ];


//--------------------------------
// results[X].backdrop_path  Image
// results[X].poster_path    Poster
// results[X].title          TITRE
// results[X].genre_ids      GENRES (tableau)
// results[X].overview       RESUMé
// results[X].popularity     Popularité
//--------------------------------

// GENRES 
// {"genres":[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]}