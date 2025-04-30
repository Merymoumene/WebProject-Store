import { produits } from './data.js';
import { categories } from './data.js';

function afficherProduits(produitsAAfficher) {
    const container = document.getElementById('produits-container');
    container.innerHTML = '';
    produitsAAfficher.forEach(produit => {
        const produitHTML = `
            <div class="produit" id="${produit.id}">
                <div class="imgDiv">
                    <img src="${produit.image}" alt="" class="imgProduit ${produit.categorie}">
                </div>
                <div class="NameProd">
                    <p class="titreProduit">${produit.titre}</p>
                    <button class="buttonInfo" onclick="ouvrirPopup(this)">Savoir plus</button>
                </div>
                <div class="prix">
                    <p>$${produit.prix.toFixed(2)}</p>
                    <input type="button" value="Ajouter au panier" onclick="ajouterAuPanier(this)">
                </div>
            </div>
        `;
        container.innerHTML += produitHTML;
    });
}

function afficherCategorie(Categories) {
    const filtreContainer = document.getElementById('filtre');
    if (filtreContainer) { 
        filtreContainer.innerHTML = '';
        Categories.forEach(Categorie => {
            const optionHTML = `
                <option value="${Categorie}">${Categorie}</option>
            `;
            filtreContainer.innerHTML += optionHTML;
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    afficherProduits(produits);
    afficherCategorie(categories);
});

document.getElementById("filtre").addEventListener("change", function() {
    const categorieChoisie = this.value;
    const produits = document.querySelectorAll(".produit");

    produits.forEach(produit => {
        const imageProduit = produit.querySelector(".imgProduit");

        if (categorieChoisie === "Categories") {
            produit.style.display = "block";
        } else if (imageProduit && imageProduit.classList.contains(categorieChoisie)) {
            produit.style.display = "block";
        } else {
            produit.style.display = "none";
        }
    });
});


document.getElementById("search").addEventListener("input", function() {
    const valeurRecherche = this.value.toLowerCase(); 
    const produits = document.querySelectorAll(".produit");

    produits.forEach(produit => {
        const nomProduit = produit.querySelector(".titreProduit").textContent.toLowerCase();

        if (nomProduit.includes(valeurRecherche)) {
            produit.style.display = "block";
        } else {
            produit.style.display = "none";
        }
    });
});

document.getElementById("triPrix").addEventListener("change", function () {
    const tri = this.value;
    const conteneur = document.querySelector(".Produits");
    const produits = Array.from(document.querySelectorAll(".produit"));

    produits.sort((a, b) => {
        const prixA = parseFloat(a.querySelector(".prix p").textContent.replace('$', ''));
        const prixB = parseFloat(b.querySelector(".prix p").textContent.replace('$', ''));

        if (tri === "asc") {
            return prixA - prixB;
        } else if (tri === "desc") {
            return prixB - prixA;
        } else {
            return 0;
        }
    });

    produits.forEach(produit => conteneur.appendChild(produit)); 
});

function afficherPopup(produit) {
    const container = document.getElementById('popup');
    container.innerHTML = '';
    let produitExistant = produits.find(p => p.id === produit.id);
    const produitHTML = `
        <div class="popup">
            <div class="product-image">
                <img src="${produitExistant.image}">
            </div>
            <div class="product-details">
                <h1>${produitExistant.titre}</h1>
                <p class="price">$${produitExistant.prix.toFixed(2)}</p>
                <p class="description">
                    ${produitExistant.description}
                </p>
            </div>
            <button class="close-btn" onclick="fermerPopup()">Fermer</button>
        </div>
    `;
    container.innerHTML += produitHTML;
    console.log(produitExistant)

}

window.ouvrirPopup =function(bouton) {
    let produitElement = bouton.closest('.produit');
    document.getElementById("popup").style.display = "flex";
    afficherPopup(produitElement);
}

window.fermerPopup = function() {
    document.getElementById("popup").style.display = "none";
}   

let panier = JSON.parse(localStorage.getItem('panier')) || [];
afficherPanier(); 


window.ajouterAuPanier = function (bouton) {
    let produitElement = bouton.closest('.produit');
    let nomProduit = produitElement.querySelector('.titreProduit').textContent;
    let prixTexte = produitElement.querySelector('.prix p').textContent;
    let prix = parseFloat(prixTexte.replace('$', ''));
    
    let produitExistant = panier.find(p => p.nom === nomProduit);
    if (produitExistant) {
        produitExistant.quantite++;
    } else {
        panier.push({ nom: nomProduit, prix: prix, quantite: 1 });
    }
    
    afficherPanier();
}

function afficherPanier() {
    const cartContainer = document.querySelector('.cart-item');
    const cartFooter = document.querySelector('.cart-footer strong');
    cartContainer.innerHTML = ''; 

    let total = 0;
    
    localStorage.setItem('panier', JSON.stringify(panier));
    panier.forEach((item, index) => {
        total += item.prix * item.quantite;

        const produitHTML = `
            <div class="cart-product">
                <p><strong>${item.nom}</strong></p>
                <p>Prix: $${item.prix.toFixed(2)}</p>
                <p>Quantité: ${item.quantite}</p>
                <button onclick="supprimerDuPanier(${index})">Supprimer</button>
            </div>
        `;

        cartContainer.innerHTML += produitHTML;
    });
    document.getElementById('open-cart').textContent = `🛒 ${panier.reduce((sum, item) => sum + item.quantite, 0)}`;
    cartFooter.textContent = `$${total.toFixed(2)}`;
}

window.supprimerDuPanier = function(index) {
    panier.splice(index, 1);
    afficherPanier();
}

document.getElementById('open-cart').addEventListener('click', () => {
    document.getElementById('cart').classList.remove('hidden');
});
document.getElementById('close-cart').addEventListener('click', () => {
    document.getElementById('cart').classList.add('hidden');

});

window.addEventListener('DOMContentLoaded', afficherPanier);







