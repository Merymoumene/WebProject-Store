import { produits, categories, saveProduits, saveCategories } from './data.js';

function afficherProduits(produitsAAfficher) {
    const container = document.getElementById('produits-container');
    container.innerHTML = '';
    produitsAAfficher.forEach(produit => {
        const produitHTML = `
            <div class="cart-prod " id="${produit.id}">
            
                <div class="cart-prod-image">
                    <img src="${produit.image}" class="imgProduit ${produit.categorie}">
                </div>
                <div class="cart-prod-details">
                    <div class="cart-prod-header">
                        <span class="cart-prod-title">${produit.titre}</span>
                        <button class="cart-prod-delete" onclick="supprimerProduit(this)">Supprimer</button>
                    </div>
                    <div class="cart-prod-header">
                        <div class="cart-prod-price">$${produit.prix.toFixed(2)}</div>
                        <input type="button" class="cart-prod-modif" value="Modifier" onclick="ouvrirPopupmodif(this)">
                    </div>
                    <div class="cart-prod-categorie">${produit.categorie}</div>
                </div>
            </div>
        `;
        container.innerHTML += produitHTML;
    });
}

function afficherCategorie(Categories) {
    const catNameContainer = document.getElementById('catName');
    if (catNameContainer) {  
        catNameContainer.innerHTML = '';
        Categories.forEach(Categorie => {
            const labelHTML = `
                <label>${Categorie}</label>
            `;
            catNameContainer.innerHTML += labelHTML;
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    afficherProduits(produits);
    afficherCategorie(categories);
});

window.ajouterProduits = function(){
    const titre = document.getElementById('titreProduit').value;
    const image = document.getElementById('imageProduit').value;
    const prix = parseFloat(document.getElementById('prixProduit').value);
    const categorie = document.getElementById('categorieProduit').value;
    const description = document.getElementById('descriptionProduit').value;
    
    let dernierId = 0;
    produits.forEach(produit => {
        if (produit.id && produit.id.startsWith('p')) {
            const num = parseInt(produit.id.substring(1));
            if (num > dernierId) {
                dernierId = num;
            }
        }
    });
    const newId = `p${dernierId + 1}`;
    const newProduit = {
        id: newId,
        titre,
        image,
        prix,
        categorie,
        description
    };
    
    produits.push(newProduit);
    saveProduits();
    alert('Produit ajouté avec succès !');
    console.log(produits);
    location.reload();
};

window.supprimerProduit = function(bouton){
    let produitElement = bouton.closest('.cart-prod');
    const id = produitElement.id;

    const index = produits.findIndex(p => p.id === id);

    if (index !== -1) {
        produits.splice(index, 1);
        saveProduits();
        alert('Produit supprimé avec succès !');
    } else {
        alert('Produit non trouvé.');
    }
    console.log(id);
    location.reload();
};

window.ouvrirPopupmodif = function(bouton) {
    let produitElement = bouton.closest('.cart-prod');
    const produitId = produitElement.id;
    document.getElementById("popup").style.display = "flex";
    const container = document.getElementById('popup');
    container.innerHTML = '';

    // Recherche du produit à modifier
    const produit = produits.find(p => p.id === produitId);

    if (!produit) {
        alert('Produit non trouvé.');
        return;
    }

    const categorieOptions = categories.map(categorie => {
        return `<option value="${categorie}" ${produit.categorie === categorie ? 'selected' : ''}>${categorie}</option>`;
    }).join("");

    
    const produitHTML = `
        <div class="popup">
            <section>
                <h2>Modifier un Produit</h2>
                <form class="forms" id="modifProduitForm">
                    <input class="formInput" type="text" id="titreProduit" placeholder="Titre" value="${produit.titre}" required>
                    <input class="formInput" type="text" id="imageProduit" placeholder="Lien de l'image" value="${produit.image}" required>
                    <input class="formInput" type="number" id="prixProduit" placeholder="Prix" value="${produit.prix}" required>
                    <select class="formInput" id="categorieProduit" required>
                        <option value="">Sélectionner une catégorie</option>
                        ${categorieOptions} <!-- Ajout des options dynamiques avec la catégorie sélectionnée -->
                    </select>
                    <input class="formInput" type="text" id="descriptionProduit" placeholder="Description" value="${produit.description}" required>
                    <input class="formButton" type="button" value="Modifier Produit" onclick="modifierProduit('${produit.id}')">
                </form>
            </section>
            <button class="close-btn" onclick="fermerPopup()">Fermer</button>
        </div>
    `;
    container.innerHTML += produitHTML;
};

window.modifierProduit = function(produitId) {
    const titre = document.getElementById('titreProduit').value;
    const image = document.getElementById('imageProduit').value;
    const prix = parseFloat(document.getElementById('prixProduit').value);
    const categorie = document.getElementById('categorieProduit').value;
    const description = document.getElementById('descriptionProduit').value;

    
    const produit = produits.find(p => p.id === produitId);

    if (produit) {
        produit.titre = titre;
        produit.image = image;
        produit.prix = prix;
        produit.categorie = categorie;
        produit.description = description;

        saveProduits();
        alert('Produit modifié avec succès !');
        location.reload();
    } else {
        alert('Produit non trouvé.');
    }
};

window.ajoutCategorieForm = function(){
    const nouvelleCategorie = document.getElementById('nomCategorie').value;

    if (!categories.includes(nouvelleCategorie)) {
        categories.push(nouvelleCategorie);
        saveCategories();
        alert('Catégorie ajoutée avec succès !');
    } else {
        alert('Catégorie existe déjà.');
    }
    console.log(categories);
    location.reload();
};

window.supprimerCategorieForm = function(){
    const categorieASupprimer = document.getElementById('nomCategorieSupprimer').value;
    const index = categories.indexOf(categorieASupprimer);

    if (index !== -1) {
        categories.splice(index, 1);
        saveCategories();
        alert('Catégorie supprimée avec succès !');
    } else {
        alert('Catégorie non trouvée.');
    }
    console.log(categories);
    location.reload();
};

window.ouvrirPopupAjoutCat =function() {
    document.getElementById("popup").style.display = "flex";
    const container = document.getElementById('popup');
    container.innerHTML = '';
    const produitHTML = `
        <div class="popup">
            <section>
                <h2>Ajouter une Catégorie</h2>
                <form class="forms" id="ajoutCategorieForm">
                    <input class="formInput" type="text" id="nomCategorie" placeholder="Nom de la catégorie" required>
                    <input class="formButton" type="button" value="Ajouter Catégorie" onclick="ajoutCategorieForm()">
                </form>
            </section>
            <button class="close-btn" onclick="fermerPopup()">Fermer</button>
        </div>
    `;
    container.innerHTML += produitHTML;
    console.log(produits)
};

window.ouvrirPopupSupprimCat =function() {
    document.getElementById("popup").style.display = "flex";
    const container = document.getElementById('popup');
    container.innerHTML = '';
    const produitHTML = `
        <div class="popup">
            <section>
                <h2>Supprimer une Catégorie</h2>
                <form class="forms" id="supprimerCategorieForm">
                    <input class="formInput" type="text" id="nomCategorieSupprimer" placeholder="Nom de la catégorie" required>
                    <input class="formButton" type="button" value="Supprimer Catégorie" onclick="supprimerCategorieForm()">
                </form>
            </section>
            <button class="close-btn" onclick="fermerPopup()">Fermer</button>
        </div>
    `;
    container.innerHTML += produitHTML;
};

window.ouvrirPopupAjoutProduit = function() {
    document.getElementById("popup").style.display = "flex";
    const container = document.getElementById('popup');
    container.innerHTML = '';

   
    const categorieOptions = categories.map(categorie => {
        return `<option value="${categorie}">${categorie}</option>`;
    }).join(""); 

    
    const produitHTML = `
        <div class="popup">
            <section>
                <h2>Ajouter un Produit</h2>
                <form class="forms" id="ajoutProduitForm">
                    <input class="formInput" type="text" id="titreProduit" placeholder="Titre" required>
                    <input class="formInput" type="text" id="imageProduit" placeholder="Lien de l'image" required>
                    <input class="formInput" type="number" id="prixProduit" placeholder="Prix" required>
                    <select class="formInput" id="categorieProduit" required>
                        <option value="">Sélectionner une catégorie</option>
                        ${categorieOptions} <!-- Ajout des options dynamiques -->
                    </select>
                    <input class="formInput" type="text" id="descriptionProduit" placeholder="Description" required>
                    <input class="formButton" type="button" value="Ajouter Produit" onclick="ajouterProduits()">
                </form>
            </section>
            <button class="close-btn" onclick="fermerPopup()">Fermer</button>
        </div>
    `;
    container.innerHTML += produitHTML;
};


window.ouvrirPopupModifProd =function() {
    document.getElementById("popup").style.display = "flex";
    const container = document.getElementById('popup');
    container.innerHTML = '';
    const produitHTML = `
        <div class="popup">
            <section>
                <h2>Ajouter un Produit</h2>
                <form class="forms" id="ajoutProduitForm">
                    <input class="formInput" type="text" id="titreProduit" placeholder="Titre" required>
                    <input class="formInput" type="text" id="imageProduit" placeholder="Lien de l'image" required>
                    <input class="formInput" type="number" id="prixProduit" placeholder="Prix" required>
                    <input class="formInput" type="text" id="categorieProduit" placeholder="Catégorie" required>
                    <input class="formInput" type="text" id="descriptionProduit" placeholder="description" required>
                    <input class="formButton" type="button" value="Ajouter Produit" onclick="ajouterProduits()">
                    
                </form>
            </section>
            <button class="close-btn" onclick="fermerPopup()">Fermer</button>
        </div>
    `;
    container.innerHTML += produitHTML;
}; 

window.fermerPopup = function() {
    document.getElementById("popup").style.display = "none";
};  

document.getElementById("search").addEventListener("input", function() {
    const valeurRecherche = this.value.toLowerCase(); 
    const produits = document.querySelectorAll(".cart-prod");

    produits.forEach(produit => {
        const nomProduit = produit.querySelector(".cart-prod-title").textContent.toLowerCase();

        if (nomProduit.includes(valeurRecherche)) {
            produit.style.display = "block";
        } else {
            produit.style.display = "none";
        }
    });
});
