// Etape 2.2 : Authentification de l'utilisateur

// Ecouter le submit du formulaire
document.addEventListener("submit", (event) => {
    event.preventDefault();
    const user = {
    email : document.querySelector('input[name="email"]').value,
    password : document.querySelector('input[name="password"]').value,
    };

    // Test pour savoir si je récupère bien les infos entrées
    console.log(user.email);
    console.log(user.password);

    // Token Bearer

    function logIn() {
        const filterBar = document.querySelector('.filter-bar ul');
        const logIn = document.querySelector('.logIn')
        const logOut = document.querySelector('.logOut')
        const editionBar = document.querySelector('.edition-bar-wrapper')
        const editionToolButton = document.querySelector('.edition-tool-button')                                                                                                        
        filterBar.style.display = "none";
        logIn.style.display = "none";
        logOut.style.display = "flex";
        editionBar.style.display = "flex";
        editionToolButton.style.display = "flex";
    }

    // Utilisation de fetch avec la méthode Post
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data) 
        if(data.userId>=0) {
            // 2 info pour rester connecter
            window.localStorage.setItem("userId", data.userId);
            window.localStorage.setItem("token", data.token);
            console.log(data.userId)
            console.log(data.token)
            window.location.href='index.html';
            return logIn()
            // Enregistrer userId et son token en local
        } else {
            console.log(data.userId)
            console.log(data.token)
            return alert('Not authorized/User not found');  
        }
    })
});




// logIn.addEventListener("click", function() {
//     filterBar.style.display = "none";
//     logIn.style.display = "none";
//     logOut.style.display = "flex";
//     editionBar.style.display = "flex";
//     editionToolButton.style.display = "flex";
// })

