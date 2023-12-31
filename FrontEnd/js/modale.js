// Etape 3.1 ; Ajout de la fenêtre modale

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

const closeModalButton = document.getElementById("closeModal");
closeModalButton.addEventListener('click', hideModal);

// Fermer la modale si clic en dehors
modal.addEventListener('click', function(event) {

    if (event.target === modal) {
        hideModal();
        formModal2.reset();
        if (previewPicture !== null) {
            previewPicture.src = '';
        }
        spaceToHideAfterLoading.style.display = 'flex';
        checkValidity()
    }
});

// Affichage lorsque l'utilisateur se connecte
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
    filterBar.style.display = "flex";
    localStorage.clear();
})
        
// Flèche pour revenir en arrière. Disponible uniquement sur modale 2
const returnButton = document.getElementById("return");

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

// "Champ requis" du formulaire d'ajout
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

// Fonction pour supprimer 1 projet
function deleteProject(element, figure) {
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
        } else {
            figure.remove();
            
            const gallery = document.querySelectorAll('.gallery figure[data-id="' + element.id + '"]');
            gallery.forEach(figure => {
                figure.remove();
            });
        }    
    })
    .catch(error => {
        console.error(error);
    })
}

// Fonction pour supprimer toute la galerie
function deleteAllGallery(element, figure) {
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
        } else {
            figure.remove();

            const gallery = document.querySelectorAll('.gallery figure[data-id="' + element.id + '"]');
            gallery.forEach(allFigures => {
               allFigures.remove()
            })
        } 
    })
    .catch(error => {
        console.error(error);
    })
}

// Générer tous les travaux dans l'espace de prévisualisation de la modale 1
const galleryManagement = document.querySelector(".gallery-management");

fetch('http://localhost:5678/api/works')
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('There was a problem with the fetch operation');
        }
    })
    .then(preview => {
        
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

            // Etape 3.2 : Suppression de travaux existants
            // Icone poubelle pour supprimer un projet
            iconTrashCan.className = "fa-solid fa-trash-can";
            iconTrashCan.addEventListener("click", function(event) {
                event.preventDefault();
                deleteProject(element, figure)
            })

            // Bouton pour supprimer la galerie à la fois dans la modale et dans "Mes projets"
            const deleteGallery = document.querySelector('input[value="Supprimer la galerie"]')
            deleteGallery.addEventListener("click", function(event) {
                event.preventDefault()
                deleteAllGallery(element, figure)
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
    .catch(error => {
        console.error(error);
    })

// Bouton Ajouter une photo qui renvoie sur la modale 2

const addingPhoto = document.querySelector('input[value="Ajouter une photo"]');
        
addingPhoto.addEventListener("click", function() {
    modal1.style.display = "none";
    modal2.style.display = "flex";
    returnButton.style.display = "flex";
})

// Etape 3.3 : Envoi d'un nouveau projet au back-end via le formulaire de la modale

// Bouton pour ajouter la photo, ouvre l'explorateur de fichiers
const fileToLoadingButton = document.querySelector('label[for="fileToLoading"]')
const inputForLoadingImage = document.querySelector('input[class="fileToLoading"]')
const spaceForAddingPhoto = document.querySelector('.space-for-adding-photo')

const previewPicture = document.createElement('img')
previewPicture.classList.add("previewPicture")
spaceForAddingPhoto.appendChild(previewPicture)

fileToLoadingButton.addEventListener("click", () => {
    inputForLoadingImage.click();
            
    inputForLoadingImage.addEventListener('change', (event) => {
        event.preventDefault();
        // Ici je récupére le poids de l'image
        const picture = inputForLoadingImage.files[0]
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
const gallery = document.querySelector('.gallery')
const formModal2 = document.querySelector('.formModal2')

formModal2.addEventListener("submit", (event) => {
    event.preventDefault()

    const photoTitleValue = photoTitle.value;
    const selectCategoryValue = selectCategory.value
    
    const formData = new FormData();
    formData.append("image", inputForLoadingImage.files[0])
    formData.append("title", photoTitleValue)
    formData.append("category", selectCategoryValue)

    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: formData,
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('There was a problem with the fetch operation');
        } else {
            return res.json();
        }
    })
    // Etape 3.4 : Traitement de la réponse de l'API pour affichier dynamiquement la nouvelle image de la modale
    .then(response => {
        const newFigureGallery = document.createElement('figure');
        const newImageGallery = document.createElement('img');
        const newFigcaptionGallery = document.createElement('figcaption')

        newImageGallery.src = response.imageUrl;
        newFigcaptionGallery.innerHTML = response.title;
        newFigureGallery.setAttribute('data-id', response.id)
        
        newFigureGallery.appendChild(newImageGallery);
        newFigureGallery.appendChild(newFigcaptionGallery)
        gallery.appendChild(newFigureGallery)

        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        const input = document.createElement("input");
        const iconTrashCan = document.createElement("button");

        iconTrashCan.className = "fa-solid fa-trash-can";
        iconTrashCan.addEventListener("click", function(event) {
            event.preventDefault();
            element = response;
            deleteProject(element, figure)
        })

        const deleteGallery = document.querySelector('input[value="Supprimer la galerie"]')
        deleteGallery.addEventListener("click", function(event) {
            event.preventDefault()
            element = response
            deleteAllGallery(element, figure)
        })

        input.type = "text";
        input.className = "inputGallery";
        input.placeholder = "éditer";
        img.src = response.imageUrl;

        figure.appendChild(img);
        figcaption.appendChild(input);
        figure.appendChild(figcaption);
        figure.appendChild(iconTrashCan);
        galleryManagement.appendChild(figure);
    })
    .catch(error => {
        console.error(error);
    })
})
