// Etape 2.2 : Authentification de l'utilisateur

// Si l'utilisateur a accès à cette page, cela veut dire qu'il est déconnecté
localStorage.setItem("userId", false)

const formInput = document.querySelector('.form-input')

// Au clic sur le bouton Se connecter, vérification des identifiants de connexion
formInput.addEventListener("submit", (event) => {
    event.preventDefault()

    const user = {
    email: document.querySelector('input[name="email"]').value,
    password: document.querySelector('input[name="password"]').value,
    };

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
        if(data.userId >= 0) {
            // 2 info pour rester connecter
            window.localStorage.setItem("userId", true);
            window.localStorage.setItem("token", data.token);
            window.location.href = "index.html";
            // Enregistrer userId et son token en local
        } else {
            alert('Error in username or password');
        }
    })
    .catch(error => {
        alert('Error in username or password');
        console.error(error);
    })
})