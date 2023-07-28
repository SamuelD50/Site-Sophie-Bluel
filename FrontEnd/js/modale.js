// Afficher la modale
function showModal() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'block'
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


// Modale 1


// function showEditionWay() {

//     if(data.userId>0) {
//         showEditionWay()
//     }
// }

// if(data.userId>0) {
//     logIn.style.display = 'flex'
//     logOut.style.display = 'none'
// } else {
//     logIn.style.display = 'none'
//     logOut.style.display = 'flex'
// }

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
    })

function loadingPreview(preview) {
    const galleryManagement = document.querySelector(".gallery-management");
    for (let i = 0; i < preview.length; i++) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        img.src = preview[i].imageUrl;
        figcaption.innerHTML = preview[i].title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        galleryManagement.appendChild(figure);
    }
}

// const iconTrashCan = document.createElement('button');

// iconTrashCan.addEventListener("click", function() {
//     fetch()
//     method: 'DELETE',
//         headers: {
//             'Accept': 'application/json',
// })
// function GalleryManagement(){