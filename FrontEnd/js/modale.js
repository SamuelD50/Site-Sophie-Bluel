// Afficher la modale
function showModal() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'flex';
}

const openModalButton1 = document.querySelector('.publish-changing');
const openModalButton2 = document.querySelector('.edition-tool-button');
openModalButton1.addEventListener("click", showModal);
openModalButton2.addEventListener("click", showModal);

// Fermer la modale

function hideModal() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
}

const closeModalButton = document.querySelector('.fa-xmark');
closeModalButton.addEventListener('click', hideModal);

// Fermer la modale si clic en dehors
window.addEventListener('click', function(event) {
    const modal = document.querySelector('.modal');
    if (event.target == modal) {
        hideModal();
    }
});

// Affichage du mode édition
const filterBar = document.querySelector('.filter-bar ul');
const logIn = document.querySelector('.logIn')
const logOut = document.querySelector('.logOut')
const editionBar = document.querySelector('.edition-bar-wrapper')
const editionToolButton = document.querySelector('.edition-tool-button')

logIn.addEventListener("click", function() {
    filterBar.style.display = "none";
    logIn.style.display = "none";
    logOut.style.display = "flex";
    editionBar.style.display = "flex";
    editionToolButton.style.display = "flex";
})

logOut.addEventListener("click", function(){
    filterBar.style.display = "flex";
    logIn.style.display = "flex";
    logOut.style.display = "none";
    editionBar.style.display = "none";
    editionToolButton.style.display = "none";
    sessionStorage.clear();
})
        
// Flèche pour revenir en arrière
// const comingBack = document.querySelector('.come-back');

// function returnToPreviousWindow

// comingBack.addEventListener('click', )




const deleteGallery = document.querySelector('input[value="Supprimer la galerie"]');
deleteGallery.addEventListener("click", function() {
    fetch('http://localhost:5678/api/works/{id}', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': sessionStorage.getItem('token')
        }
    })
})
      

let preview = [];

fetch('http://localhost:5678/api/works')
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Il y a eu un problème avec l\'opération fetch : ' + error.message);
        }
    })
    .then(response => {
        preview = response;
        loadingPreview(preview);
        console.log(preview);

    function loadingPreview(preview) {
        const galleryManagement = document.querySelector(".gallery-management");
        for (let i = 0; i < preview.length; i++) {
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            const figcaption = document.createElement("figcaption");
            const input = document.createElement("input");
            input.type = "text";
            input.className = "inputGallery";
            input.placeholder = "éditer";
            img.src = preview[i].imageUrl;
            figure.appendChild(img);
            figcaption.appendChild(input);
            figure.appendChild(figcaption);
            galleryManagement.appendChild(figure);

        const iconTrashCan = document.createElement("button");
        iconTrashCan.className = "fa-solid fa-trash-can";
        figure.appendChild(iconTrashCan);

        iconTrashCan.addEventListener("click", function() {
            fetch('http://localhost:5678/api/works/${preview[i].id}', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': sessionStorage.getItem('token')
                }
            })
            .then(response => {
                if (response.ok) {
                    figure.remove();
                } else {
                    console.error("La suppression n'a pas abouti")                    }
                })
            })
    

        if (preview[i].id === 0) {
        const iconArrows = document.createElement("button");
        iconArrows.className = "fa-solid fa-arrows-up-down-left-right";
        figure.appendChild(iconArrows);
        }

        if(preview.userId>=0) {
            
        }else{
            
        }
        

        const addingPhoto = document.querySelector('input[value="Ajouter une photo"]');
        addingPhoto.addEventListener("click", function() {
            fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        })
    }}})