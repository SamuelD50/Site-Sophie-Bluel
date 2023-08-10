// Afficher la modale
function showModal() {
    const modal = document.querySelector('.modal');
    const modal1 = document.querySelector('.modal1');
    const modal2 = document.querySelector('.modal2');
    const returnButton = document.querySelector('.fa-arrow-left');
    modal.style.display = 'flex';
    modal1.style.display = 'flex';
    modal2.style.display = 'none';
    returnButton.style.display = 'none'
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
    const previewPicture = document.querySelector('.previewPicture')
    modal.style.display = 'none';
    formModal2.reset();
    previewPicture.src = '';
    spaceToHideAfterLoading.style.display = 'flex';
}

const closeModalButton = document.querySelector('.fa-xmark');
closeModalButton.addEventListener('click', hideModal);

// Fermer la modale si clic en dehors
window.addEventListener('click', function(event) {
    const modal = document.querySelector('.modal');
    const formModal2 = document.querySelector('.formModal2')
    const previewPicture = document.querySelector('.previewPicture')
    if (event.target == modal) {
        hideModal();
        formModal2.reset();
        previewPicture.src = '';
        spaceToHideAfterLoading.style.display = 'flex';
    }
});


// Se déconnecter
const filterBar = document.querySelector('.filter-bar ul');
const logIn = document.querySelector('.logIn')
const logOut = document.querySelector('.logOut')
const editionBar = document.querySelector('.edition-bar-wrapper')
const editionToolButton = document.querySelector('.edition-tool-button')

logOut.addEventListener("click", function(){
    filterBar.style.display = "flex";
    logIn.style.display = "flex";
    logOut.style.display = "none";
    editionBar.style.display = "none";
    editionToolButton.style.display = "none";
    localStorage.clear();
})
        
// Flèche pour revenir en arrière
const returnButton = document.querySelector('.fa-arrow-left');
const modal1 = document.querySelector('.modal1')
const modal2 = document.querySelector('.modal2')
const addingPhoto = document.querySelector('input[value="Ajouter une photo"]');

returnButton.style.display = "none"

returnButton.addEventListener('click', function() {
    modal2.style.display = "none";
    modal1.style.display = "flex";
    returnButton.style.display = "none"
})

addingPhoto.addEventListener("click", function() {
    returnButton.style.display = "flex"
})

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

    if (photoTitleValue === '' || selectCategoryValue === 'all-categories' || spaceToHideAfterLoadingDisplay !== 'none') {
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

// Appel fetch pour générer tous les travaux dans la galerie pr
let preview = [];

fetch('http://localhost:5678/api/works')
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Il y a eu un problème avec l\'opération fetch : ' + error.message);
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
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                })
                .then(response => {
                    if (response.ok) {
                        figure.remove();
                    } else {
                        console.error("La suppression n'a pas abouti");
                    }       
                })
            })
        })

        // Bouton Supprimer la galerie

        const deleteGallery = document.querySelector('input[value="Supprimer la galerie"]')
        deleteGallery.addEventListener("click", function() {
            fetch('http://localhost:5678/api/works', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            .then(response => {
                if (response.ok) {
                    galleryManagement.remove();
                } else {
                    console.error("La suppression de la galerie n'a pas abouti")
                }
            })
        })

        const firstFigure = document.querySelector('.gallery-management figure:first-child');
        const iconArrows = document.createElement("button");
        iconArrows.className = "fa-solid fa-arrows-up-down-left-right";
        firstFigure.appendChild(iconArrows);

        const addingPhoto = document.querySelector('input[value="Ajouter une photo"]');
        addingPhoto.addEventListener("click", function() {
            const modal1 = document.querySelector(".modal1")
            const modal2 = document.querySelector(".modal2")
            modal1.style.display = "none";
            modal2.style.display = "flex";
        })

        const fileToLoadingButton = document.querySelector('.fileToLoading');
        const spaceForAddingPhoto = document.querySelector('.space-for-adding-photo')
        const spaceToHideAfterLoading = document.querySelector('.space-to-hide-after-loading')
        const previewPicture = document.createElement('img')
        previewPicture.classList.add("previewPicture")
        spaceForAddingPhoto.appendChild(previewPicture)

        fileToLoadingButton.addEventListener("click", function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.jpg, .png';
            input.addEventListener('change', function(e) {
                const [picture] = e.target.files;
                console.log(picture.size)
                if (picture) {
                    if (picture.size > 4 * 1024 * 1024) {
                        alert('Image supérieure à 4 mo')
                        return;
                    }

                    const reader = new FileReader();
                    reader.onload = function (e) {
                        previewPicture.src = e.target.result;
                        previewPicture.style.height = "170px";
                        spaceToHideAfterLoading.style.display = "none"
                    }
                    reader.readAsDataURL(picture);
                }
            });
            input.click();
        });
                           
    })

    // 1 mo = 1024ko*1024=> 



    
    
    



        

