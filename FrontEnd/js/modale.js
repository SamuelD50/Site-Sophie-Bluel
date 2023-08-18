// Afficher la modale
function showModal() {
    const modal = document.querySelector('.modal');
    const modal1 = document.querySelector('.modal1');
    const modal2 = document.querySelector('.modal2');
    const returnButton = document.querySelector('.fa-arrow-left');
    const validateForm = document.querySelector('input[value="Valider"]')
    modal.style.display = 'flex';
    modal1.style.display = 'flex';
    modal2.style.display = 'none';
    returnButton.style.display = 'none'
    validateForm.disabled = true;
    validateForm.style.backgroundColor = '#A7A7A7';
}

const openModalButton1 = document.querySelector('.publish-changing');
const openModalButton2 = document.querySelector('.edition-tool-button');
openModalButton1.addEventListener("click", showModal);
openModalButton2.addEventListener("click", showModal);

// Fermer la modale

function hideModal() {
    const modal = document.querySelector('.modal');
    const spaceToHideAfterLoading = document.querySelector('.space-to-hide-after-loading')
    const formModal2 = document.querySelector('.formModal2')
    const previewPicture = document.querySelector('.preview-picture')
    const validateForm = document.querySelector('input[value="Valider"]')
    modal.style.display = 'none';
    formModal2.reset();
    previewPicture.src = '';
    spaceToHideAfterLoading.style.display = 'flex';
    validateForm.disabled = true;
    validateForm.style.backgroundColor = '#A7A7A7';
}

const closeModalButton = document.querySelector('.fa-xmark');
closeModalButton.addEventListener('click', hideModal);

// Fermer la modale si clic en dehors
window.addEventListener('click', function(event) {
    const modal = document.querySelector('.modal');
    const formModal2 = document.querySelector('.formModal2')
    const previewPicture = document.querySelector('.preview-picture')
    if (event.target == modal) {
        hideModal();
        formModal2.reset();
        previewPicture.src = '';
        spaceToHideAfterLoading.style.display = 'flex';
    }
});

// Affichage par défaut
const editionBar = document.querySelector('.edition-bar-wrapper');
const logIn = document.querySelector('.logIn')
const logOut = document.querySelector('.logOut')
const editionToolButton = document.querySelector('.edition-tool-button')
const filterBar = document.querySelector('.filter-bar ul')

function login() {
    editionBar.style.display = "flex"
    logOut.style.display = "flex"
    editionToolButton.style.display = "flex"
    logIn.style.display = "none"
    filterBar.style.display = "none"
}

const userId = localStorage.getItem("userId")
if(userId === "true") {
    login()
}

// Déconnexion
logOut.addEventListener("click", function() {
    editionBar.style.display = "none"
    logOut.style.display = "none"
    editionToolButton.style.display = "none"
    logIn.style.display = "flex"
    filterBar.style.display = "flex"
    localStorage.clear();
})
        
// Flèche pour revenir en arrière. Disponible uniquement sur modale 2
const returnButton = document.querySelector('.fa-arrow-left');
const modal1 = document.querySelector('.modal1')
const modal2 = document.querySelector('.modal2')
returnButton.style.display = "none"

returnButton.addEventListener('click', function() {
    modal2.style.display = "none";
    modal1.style.display = "flex";
    returnButton.style.display = "none"
})

// Déverouillage du bouton Valider uniquement si tous les champs sont remplis
const photoTitle = document.querySelector('.photo-title')
const selectCategory = document.querySelector('.select-category')
const validateForm = document.querySelector('input[value="Valider"]')
const spaceToHideAfterLoading = document.querySelector('.space-to-hide-after-loading')

console.log(photoTitle.value)
console.log(selectCategory.value)

// Fonction pour que tous les champs soient remplis pour déverouiller le bouton Valider

function checkValidity() {
    const photoTitleValue = photoTitle.value;
    const selectCategoryValue = selectCategory.value;
    const spaceToHideAfterLoadingDisplay = spaceToHideAfterLoading.style.display;


    if (photoTitleValue === '' || selectCategoryValue === '0' || spaceToHideAfterLoadingDisplay === 'flex') {
        validateForm.disabled = true;
        validateForm.style.backgroundColor = '#A7A7A7';
    } else {
        validateForm.disabled = false;
        validateForm.style.backgroundColor = '#1D6154';
    }
}

checkValidity()
photoTitle.addEventListener('keyup', checkValidity)
selectCategory.addEventListener('change', checkValidity)
spaceToHideAfterLoading.addEventListener('click', checkValidity)

// Générer tous les travaux dans l'espace de prévisualisation de la modale 1
let preview = [];

fetch('http://localhost:5678/api/works')
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('There was a problem with the fetch operation');
        }
    })
    .then(preview => {
        const galleryManagement = document.querySelector(".gallery-management");
        
        preview.forEach(element => {
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            const figcaption = document.createElement("figcaption");
            const input = document.createElement("input");
            const iconTrashCan = document.createElement("button");

            input.type = "text";
            input.className = "inputGallery";
            input.placeholder = "éditer";
            img.src = element.imageUrl;

            figure.appendChild(img);
            figcaption.appendChild(input);
            figure.appendChild(figcaption);
            figure.appendChild(iconTrashCan);
            galleryManagement.appendChild(figure);
        
            // Icone poubelle pour supprimer un projet

            iconTrashCan.className = "fa-solid fa-trash-can";
            iconTrashCan.addEventListener("click", function() {
                fetch('http://localhost:5678/api/works/${element.id}', {
                    method: 'DELETE',
                    headers: {
                        'Accept': '*/*',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {
                    if (response.ok) {
                        figure.remove();
                    } else {
                        console.error("Deletion failed");
                    }      
                })
            })
        })

        // Bouton Supprimer la galerie
        const deleteGallery = document.querySelector('input[value="Supprimer la galerie"]');
        const allFigure = document.querySelectorAll('.gallery-management figure');

        deleteGallery.addEventListener("click", function() {
            allFigure.forEach(figure => {
                fetch('http://localhost:5678/api/works/${element.id}', {
                    method: 'DELETE',
                    headers: {
                        'Accept': '*/*',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {
                    if (response.ok) {
                        figure.remove();
                    } else {
                        console.error("Failed to delete gallery")
                    }
                })
            })
        })
        
        // Ajout du bouton flèche haut/bas/droite/gauche
        const firstFigure = document.querySelector('.gallery-management figure:first-child');
        const iconArrows = document.createElement("button");
        iconArrows.className = "fa-solid fa-arrows-up-down-left-right";
        firstFigure.appendChild(iconArrows);

        // Bouton Ajouter une photo qui renvoie sur la modale 2
        const addingPhoto = document.querySelector('input[value="Ajouter une photo"]');
        
        addingPhoto.addEventListener("click", function() {
            const modal1 = document.querySelector(".modal1")
            const modal2 = document.querySelector(".modal2")
            const returnButton = document.querySelector('.fa-arrow-left');
            modal1.style.display = "none";
            modal2.style.display = "flex";
            returnButton.style.display = "flex";
        })

        // Bouton pour ajouter la photo, ouvre l'explorateur de fichiers
        const fileToLoadingButton = document.querySelector('.fileToLoading');
        const spaceForAddingPhoto = document.querySelector('.space-for-adding-photo')
        const spaceToHideAfterLoading = document.querySelector('.space-to-hide-after-loading')
        const previewPicture = document.createElement('img')
        previewPicture.classList.add("previewPicture")
        spaceForAddingPhoto.appendChild(previewPicture)

        // https://www.akilischool.com/cours/javascript-previsualiser-une-image-avant-lupload

        fileToLoadingButton.addEventListener("click", function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.jpg, .png';
            input.addEventListener('change', function(e) {
                const [picture] = e.target.files;
                console.log(picture.size)
                if (picture) {
                    previewPicture.src = URL.createObjectURL(picture)

                    if (previewPicture.size > 4 * 1024 * 1024) {
                        alert('Image larger than 4 mb')
                        return;
                    }
                }

                previewPicture.style.height = "170px";
                spaceToHideAfterLoading.style.display = "none"
            });
            input.click();
        });
        // Bouton pour ajouter un projet à la modale

        const formModal2 = document.querySelector('.formModal2')

        formModal2.addEventListener("submit", (event) => {
            event.preventDefault()

            const previewPictureSrc = previewPicture.src
            const photoTitleValue = photoTitle.value;
            const selectCategoryValue = selectCategory.value;

            console.log(selectCategoryValue)
            console.log(previewPictureSrc)
            console.log(photoTitleValue)

            const formData = new FormData();
            formData.append("imageUrl", previewPictureSrc)
            formData.append("title", photoTitleValue)
            formData.append("categoryId", selectCategoryValue)

            fetch('http://localhost:5678/api/works', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => res.json())
            .then(response => {
                console.log(photoTitleValue)
                console.log(selectCategoryValue)
                if (response.ok) {
                    return response.json()
                } else {
                    console.log(response.json)
                    throw new Error('There was a problem with the fetch operation');
                }
            })
        })
    })