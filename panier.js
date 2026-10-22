let panier = JSON.parse(localStorage.getItem("panier")) || [];
let boutons = document.querySelectorAll(".ajouter-panier");
let listepanier = document.querySelector("#liste-panier")
let totalpanier = document.querySelector("#total-panier")
let boutonVider = document.querySelector("#vider-panier");
let boutonCommander = document.querySelector("#commander");


boutons.forEach(function (bouton) {
    bouton.addEventListener("click", function () {
        let produit = {
            nom: bouton.dataset.name,
            prix: Number(bouton.dataset.price),
            quantite: 1
        };

        let existe = false;
        for (let i = 0; i < panier.length; i++) {
            if (panier[i].nom === produit.nom) {
                panier[i].quantite++;
                existe = true;
                break

            }


        }
        if (existe === false) {
            produit.quantite = 1;
            panier.push(produit)
        }
        afficherpanier();
        savepanier()
    })

})
function afficherpanier() {
    listepanier.innerHTML = "";
    if (panier.length === 0) {
        listepanier.innerHTML = '<p class="text-center text-gray-400 p-6">Votre panier est vide.</p>'
        totalpanier.textContent = "0.00 $"
        return;
    }
    let total = 0
    panier.forEach(function (produit) {
        let element = document.createElement("div");
        element.className = "flex justify-between items-center p-4 border-b border-gray-600";
        element.innerHTML = `
        <div> 
            <p class="font-bold">${produit.nom} <span class="text-red-800"> x ${produit.quantite}</span></p>
            <p class="text-amber-400">${(produit.prix * produit.quantite).toFixed(2)} $</p>
        </div>
        <button class ="supprimer-produit bg-red-600 text-white px-3 py-2 rounded">
        Supprimer 
        </button>`;
        listepanier.appendChild(element)
        let boutonSupprimer = element.querySelector(".supprimer-produit");
        boutonSupprimer.addEventListener("click", function () {
            panier = panier.filter(function (p) {
                return p.nom !== produit.nom;

            });
            afficherpanier();
            savepanier()
        })

        total += produit.prix * produit.quantite

    });
    totalpanier.textContent = total.toFixed(2) + "$";

}

boutonVider.addEventListener("click", function () {
    panier = [];
    afficherpanier();
    savepanier()

})
boutonCommander.addEventListener("click", function () {
    if (panier.length === 0) {
        alert("votre panier est vide !");

    } else {
        let total = 0
        panier.forEach(function (produit) {
            total += produit.prix * produit.quantite

        })
        alert("Commande confirmée ! Total : " + total.toFixed(2) + "$");
        panier = []
        afficherpanier();
        savepanier()
    }
})
function savepanier() {
    localStorage.setItem("panier", JSON.stringify(panier));
}

afficherpanier();