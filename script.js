let searchBox = document.querySelector(".search");
let searchInput = document.getElementById("searchInput");
let suggBox = searchBox.querySelector(".autocom-box");

const nameSearch_apiUrl =
    "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const urlID = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";


let suggestions = [];

fetch(nameSearch_apiUrl).then((res) => res.json()).then((data) => data.meals.map((meal) => {
    suggestions.push(meal.strMeal)
}))

console.log(suggestions)


searchInput.onkeyup = (e) => {
    let userData = e.target.value;
    console.log(userData)
    let emptyArr = [];
    if (userData) {
        emptyArr = suggestions.filter((data) => {
            return data
              .toLocaleLowerCase()
              .startsWith(userData);
        })
        emptyArr = emptyArr.map((data) => {
            return data = '<li>'+ data +'</li>';
        })
        console.log(emptyArr);
        searchBox.classList.add('active');
        showSuggestions(emptyArr);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++){
            allList[i].setAttribute("onclick", "select(this)");
        }
    } else {
        searchBox.classList.remove("active");
    }
}

function select(list) {
    let userSelect = list.textContent;
    searchInput.value = userSelect;
}

function showSuggestions(list) {
    let listData;
    if (!list.length) {
        userVal = searchInput.value;
        listData = "<li>" + userVal + "</li>";
    } else {
        listData = list.join('');
    }
    suggBox.innerHTML = listData
}


function toggleFavorite(mealData) {
    console.log(mealData);

  var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
  // Check if the meal is already in favorites
  var index = favorites.findIndex(function (meal) {
    return meal.strMeal === mealData.strMeal;
  });
    

  if (index === -1) {
    // If not in favorites, add it
    favorites.push(mealData);
  } else {
    // If already in favorites, remove it
    favorites.splice(index, 1);
  }

  // Save the updated favorites to local storage
  localStorage.setItem("favorites", JSON.stringify(favorites));
}


function searchMeal() {
    window.location.href = "#meals";
  var s_meal = document.getElementById("search-result");
    s_meal.innerHTML = ""; // Clear previous content
    
    fetch(nameSearch_apiUrl + searchInput.value)
      .then((res) => res.json())
      .then((data) =>
          data.meals.map((meal) => {
              
          var col = document.createElement("div");
          col.classList.add("col");

          var mealCard = document.createElement("div");
          mealCard.classList.add("card");

          var mealImg = document.createElement("img");
          mealImg.classList.add("card-img-top");
          mealImg.src = meal.strMealThumb;

          var mealCardBody = document.createElement("div");
          mealCardBody.classList.add("card-body");

          // Meal title
          var mealTitle = document.createElement("h5");
          mealTitle.classList.add("card-title");
            mealTitle.textContent = meal.strMeal;
            
        // icons-btn
            var buttons = document.createElement("div");
              buttons.classList.add("fav-btn");
              
            var addBtn = document.createElement("button");
            addBtn.classList.add("btn");
            addBtn.classList.add("btn-fav");
            addBtn.innerHTML +=
              '<i class="fa-solid fa-plus fa-xl" style="color: #ff5900;"></i>';

            var favBtn = document.createElement('button');
            favBtn.classList.add("btn");
            favBtn.classList.add("btn-fav");
            favBtn.innerHTML +=
                  '<i class="fa-solid fa-heart fa-xl" style="color: #ff5900;"></i>';
              favBtn.onclick = () => {
                toggleFavorite(meal)
            }

            var infoBtn = document.createElement("button");
            infoBtn.classList.add("btn");
            infoBtn.classList.add("btn-fav");
            infoBtn.innerHTML +=
                  '<i class="fa-solid fa-ellipsis-vertical fa-xl" style="color: #ff5900;"></i>';
              infoBtn.onclick = () => {
                  window.location.href = `details.html?mealID=${meal.idMeal}`;
              }
            
              mealCardBody.appendChild(mealTitle);
              buttons.appendChild(addBtn);
              buttons.appendChild(favBtn);
              buttons.appendChild(infoBtn);
              mealCardBody.appendChild(buttons);
              mealCard.appendChild(mealImg);
              mealCard.appendChild(mealCardBody);
          col.appendChild(mealCard);
          s_meal.appendChild(col);
        })
      );

}

// Display the searched meals on page load
searchMeal();