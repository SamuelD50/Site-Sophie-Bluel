// Afficher la modale
const modal = document.querySelector('.modal');
const modal1 = document.querySelector('.modal1');
const modal2 = document.querySelector('.modal2');

function showModal() {
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

const spaceToHideAfterLoading = document.querySelector('.space-to-hide-after-loading')

function hideModal() {
    modal.style.display = 'none';
    formModal2.reset();
    if (previewPicture !== null) {
        previewPicture.src = '';
    }
    spaceToHideAfterLoading.style.display = 'flex';
    validateForm.disabled = true;
    validateForm.style.backgroundColor = '#A7A7A7';
    checkValidity()
}

const closeModalButton = document.querySelector('.fa-xmark');
closeModalButton.addEventListener('click', hideModal);

// Fermer la modale si clic en dehors

window.addEventListener('click', function(event) {
    if (event.target == modal) {
        hideModal();
        formModal2.reset();
        if (previewPicture !== null) {
            previewPicture.src = '';
        }
        spaceToHideAfterLoading.style.display = 'flex';
        checkValidity()
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

returnButton.addEventListener('click', function() {
    modal2.style.display = "none";
    modal1.style.display = "flex";
    formModal2.reset();
    returnButton.style.display = "none"
    spaceToHideAfterLoading.style.display = "flex"
    if (previewPicture !== null) {
        previewPicture.src = '';
    }
    checkValidity()
})

// "Champ requis" 
const tooltip1 = document.querySelector('.tooltip1')
const tooltip2 = document.querySelector('.tooltip2')
const tooltip3 = document.querySelector('.tooltip3')
const photoTitle = document.querySelector('.photo-title')
const selectCategory = document.querySelector('.select-category')
const validateForm = document.querySelector('input[value="Valider"]')

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

    // Si chaque champ n'est pas rempli, le message "* Champ requis" apparait

    if (spaceToHideAfterLoading !== "none") {
        tooltip1.style.display = "flex";
    } else {
        tooltip1.style.display = "none";
    }

    if (photoTitleValue !== '') {
        tooltip2.style.display = "none";
    } else {
        tooltip2.style.display = "flex";
    }

    if (selectCategory.value !== "0") {
        tooltip3.style.display = "none";
    } else {
        tooltip3.style.display = "flex";
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
            iconTrashCan.addEventListener("click", function(event) {
                event.preventDefault();
                fetch('http://localhost:5678/api/works/' + element.id, {
                    method: 'DELETE',
                    headers: {
                        'Accept': '*/*',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        console.error("Deletion failed");
                    }     
                })
            })

            // Bouton pour supprimer la galerie à la fois dans la modale et dans "Mes projets"
            const deleteGallery = document.querySelector('input[value="Supprimer la galerie"]')

            deleteGallery.addEventListener("click", function(event) {
                event.preventDefault()
                fetch('http://localhost:5678/api/works/' + element.id, {
                    method: 'DELETE',
                    headers: {
                        'Accept': '*/*',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        console.error("Deletion failed");
                    }     
                })
            })
        })
        // Ajout du bouton flèche haut/bas/droite/gauche
        
        if (preview.length !== 0) {
            const firstFigure = document.querySelector('.gallery-management figure:first-child');
            const iconArrows = document.createElement("button");
            iconArrows.className = "fa-solid fa-arrows-up-down-left-right";
            firstFigure.appendChild(iconArrows);
        }
    })

// Bouton Ajouter une photo qui renvoie sur la modale 2

const addingPhoto = document.querySelector('input[value="Ajouter une photo"]');
        
addingPhoto.addEventListener("click", function() {
    modal1.style.display = "none";
    modal2.style.display = "flex";
    returnButton.style.display = "flex";
})

// // Bouton pour ajouter la photo, ouvre l'explorateur de fichiers
const fileToLoadingButton = document.querySelector('label[for="fileToLoading"]')
const inputForLoadingImage = document.querySelector('input[class="fileToLoading"]')
const spaceForAddingPhoto = document.querySelector('.space-for-adding-photo')

const previewPicture = document.createElement('img')
previewPicture.classList.add("previewPicture")
spaceForAddingPhoto.appendChild(previewPicture)

let picture = []

fileToLoadingButton.addEventListener("click", () => {
    inputForLoadingImage.click();
            
    inputForLoadingImage.addEventListener('change', (event) => {
        event.preventDefault();
        // Ici je récupére le poids de l'image
        const picture = inputForLoadingImage.files[0]
        console.log(picture.name)
        if (picture.size > 4 * 1024 * 1024) {
            alert('Image larger than 4 mb')
            return;
        }

        const fileReader = new FileReader()
        fileReader.addEventListener("load", function() {
            previewPicture.setAttribute("src", fileReader.result)
            spaceToHideAfterLoading.style.display = "none"
        });
        fileReader.readAsDataURL(picture)
    })
})
        
// Bouton pour ajouter un projet à la modale

const formModal2 = document.querySelector('.formModal2')

formModal2.addEventListener("submit", (event) => {
    event.preventDefault()

    const photoTitleValue = photoTitle.value;
    const selectCategoryValue = selectCategory.value;

    console.log(selectCategoryValue)
    console.log(photoTitleValue)

    const formData = new FormData();
    formData.append("image", inputForLoadingImage.files[0])
    formData.append("title", photoTitleValue)
    formData.append("category", selectCategoryValue)
    console.log(formData)

    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: formData,
    })
    .then(res => res.json())
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('There was a problem with the fetch operation');
        }
    })
})