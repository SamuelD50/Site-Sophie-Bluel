// Etape 1 : Créez la page de présentation des travaux à partir du HTML existant

// Etape 1.1 : Récupération des travaux depuis le back-end

let works = [];

fetch('http://localhost:5678/api/works')
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('There was a problem with the fetch operation');
        }
    })
    .then(response => {
        works = response;
        loadingWorks(works);
        console.log(works);
    })

function loadingWorks(works) {
    const gallery = document.querySelector(".gallery");
    for (let i = 0; i < works.length; i++) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        img.src = works[i].imageUrl;
        figcaption.innerHTML = works[i].title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    }
}

// Etape 1.2 : Réalisation du filtre des travaux

const filterAllWorks = document.querySelector(".filter-all-works");
const filterObjects = document.querySelector(".filter-objects");
const filterApartments = document.querySelector(".filter-apartments");
const filterHotelsAndRestaurants = document.querySelector(".filter-hotels-and-restaurants");

filterAllWorks.addEventListener("click", function () {
    const categoryAllWorks = works.filter(function (allWorks) {
        return (
            allWorks.category.name === "Objets" ||
            allWorks.category.name === "Appartements" ||
            allWorks.category.name === "Hotels & restaurants"
        );
    });
    document.querySelector(".gallery").innerHTML ="";
    loadingWorks(categoryAllWorks)
});

filterObjects.addEventListener("click", function () {
    const categoryObjects = works.filter(function (objects) {
        return objects.category.name === "Objets";  
    });
    document.querySelector(".gallery").innerHTML ="";
    loadingWorks(categoryObjects);
});

filterApartments.addEventListener("click", function () {
    const categoryApartments = works.filter(function (apartments) {
        return apartments.category.name === "Appartements";  
    });
    document.querySelector(".gallery").innerHTML ="";
    loadingWorks(categoryApartments);
})

filterHotelsAndRestaurants.addEventListener("click", function () {
    const categoryHotelsAndRestaurants = works.filter(function (hAndR) {
        return hAndR.category.name === "Hotels & restaurants";  
    });
    document.querySelector(".gallery").innerHTML ="";
    loadingWorks(categoryHotelsAndRestaurants);
});