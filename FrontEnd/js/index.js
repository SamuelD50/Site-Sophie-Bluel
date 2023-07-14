// Etape 1.1 : Récupération des travaux depuis le back-end

fetch('http://localhost:5678/api/works')
    .then(res => res.json())
    .then(data => {
        const gallery = document.querySelector(".gallery");
        for (let i = 0; i < data.length; i++) {
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            const figcaption = document.createElement("figcaption");
            img.src = data[i].imageUrl;
            figcaption.innerHTML = data[i].title;
            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
        }
    })
    
// Etape 1.2 : Réalisation du filtre des travaux



