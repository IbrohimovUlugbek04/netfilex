// querySelector start 
var elForm = document.querySelector(".hero__form");
var elInput = document.querySelector(".hero__input");
var elList = document.querySelector(".hero__list");
var elSelect = document.querySelector(".hero__select")
// querySelector finish 

var moviesFragment = document.createDocumentFragment();

function netflix(movie) {
  elList.innerHTML = null;
  for (var netMovie of movie) {
   // time function start 
    function getTime(time) {
      var hour = Math.floor(time / 60);
      var minut = Math.floor(time % 60);
      return `${hour} Hrs ${minut} Min`;
    }; 
    // time function finish 
    // netflix createElement start 
    var movieItem = document.createElement("li");
    movieItem.classList.add("hero__item");
    var netflixImg = document.createElement("img");
    netflixImg.classList.add("hero__item__img");
    netflixImg.height = "250";
    // netflixImg.src = `https://i3.ytimg.com/vi/${netMovie.ytid}/maxresdefault.jpg`;
    // netflixImg.src = `http://img.youtube.com/vi/${netMovie.ytid}/0.jpg`;
    netflixImg.alt = netMovie.Title;
    var netflixTitle = document.createElement("h3");
    netflixTitle.classList.add("hero__item__heading")
    netflixTitle.textContent = netMovie.Title;
    netflixTitle.title = netMovie.Title;
    var netflixTimeBox = document.createElement("div");
    netflixTimeBox.classList.add("hero__item__time-box");
    var netflixRating = document.createElement("span");
    netflixRating.classList.add("hero__item__text");
    netflixRating.title = netMovie.imdb_rating;
    netflixRating.textContent = netMovie.imdb_rating;
    var netflixYear = document.createElement("time");
    netflixYear.classList.add("hero__item__text");
    netflixYear.dateTime = `${netMovie.movie_year}-08-16`;
    netflixYear.title = netMovie.movie_year;
    netflixYear.textContent = netMovie.movie_year;
    var netflixTime = document.createElement("span");
    netflixTime.classList.add("hero__item__text");
    netflixTime.title = getTime(netMovie.runtime);
    netflixTime.textContent = getTime(netMovie.runtime);
    netflixTimeBox.append(netflixRating, netflixYear, netflixTime);
    var netflixParagrph = document.createElement("p");
    netflixParagrph.classList.add("hero__item__paragrph");
    netflixParagrph.title = `Categories: ${netMovie.Categories}`
    netflixParagrph.textContent = `Categories: ${netMovie.Categories}`
    var netflixLink = document.createElement("a");
    netflixLink.classList.add("hero__item__link");
    netflixLink.title = "More info";
    netflixLink.textContent = "More info";
    netflixLink.href = (`https://www.youtube.com/watch?v=${netMovie.ytid}`);
    netflixLink.target = "blank";
    movieItem.append(netflixImg, netflixTitle, netflixTimeBox, netflixParagrph, netflixLink);
    moviesFragment.appendChild(movieItem)
    // netflix createElement finish
  };
  elList.appendChild(moviesFragment);
};
netflix(movies);
var serchArr = [];
movies.forEach(elements => {
  var arr = elements.Categories.split('|');
  arr.forEach(element => {
    if (!element == serchArr.includes(element)) {
      serchArr.push(element)
    }
  });
});

serchArr.forEach(netOption => {
  var netoption = document.createElement("option");
  netoption.value = netOption
  netoption.textContent = netOption
  elSelect.append(netoption)
});

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  var optionValu = elSelect.value;
  var searchValue = elInput.value.trim();
  var newRegex = new RegExp(searchValue, "gi")
  var searchRes = movies.filter(item => {
    return typeof item.Title === 'string' && item.Title.match(newRegex) && (item.Categories.includes(optionValu));
  });

  if (searchRes.length > 0) {
    netflix(searchRes);
    elList.classList.remove("error")
  } else {
    elList.textContent = `${searchValue} bu haqida ma'lumot topilmadi!`
    elList.classList.add("error")
  };
});