
let cartes = [
    { nom: "Carte 1", src: "img/cartes/cart1.jpg", type: "Héros", rarete: "Commun" },
    { nom: "Carte 2", src: "img/cartes/cart2.jpg", type: "Créature", rarete: "Rare" },
    { nom: "Carte 3", src: "img/cartes/cart3.jpg", type: "Serviteur", rarete: "Commun" },
    { nom: "Carte 4", src: "img/cartes/cart4.jpg", type: "Sort", rarete: "Épique" },
    { nom: "Carte 5", src: "img/cartes/cart5.jpg", type: "Héros", rarete: "Légendaire" },
    { nom: "Carte 6", src: "img/cartes/cart6.jpg", type: "Créature", rarete: "Commun" },
    { nom: "Carte 7", src: "img/cartes/cart7.jpg", type: "Héros", rarete: "Rare" },
    { nom: "Carte 8", src: "img/cartes/cart8.jpg", type: "Sort", rarete: "Commun" },
    { nom: "Carte 9", src: "img/cartes/cart9.jpg", type: "Serviteur", rarete: "Épique" },
    { nom: "Carte 10", src: "img/cartes/cart10.jpg", type: "Héros", rarete: "Rare" },
    { nom: "Carte 11", src: "img/cartes/cart11.jpg", type: "Créature", rarete: "Commun" },
    { nom: "Carte 12", src: "img/cartes/cart12.jpg", type: "Sort", rarete: "Rare" },
    { nom: "Carte 13", src: "img/cartes/cart13.jpg", type: "Héros", rarete: "Légendaire" },
    { nom: "Carte 14", src: "img/cartes/cart14.jpg", type: "Serviteur", rarete: "Commun" },
    { nom: "Carte 15", src: "img/cartes/cart15.jpg", type: "Créature", rarete: "Épique" },
    { nom: "Carte 16", src: "img/cartes/cart16.jpg", type: "Héros", rarete: "Rare" },
    { nom: "Carte 17", src: "img/cartes/cart17.jpg", type: "Sort", rarete: "Commun" },
    { nom: "Carte 18", src: "img/cartes/cart18.jpg", type: "Créature", rarete: "Épique" },
    { nom: "Carte 19", src: "img/cartes/cart19.jpg", type: "Serviteur", rarete: "Rare" },
    { nom: "Carte 20", src: "img/cartes/cart20.jpg", type: "Héros", rarete: "Légendaire" }
];

let cartesdeck = document.querySelector("#cartes-deck");
let nombreCartes = document.querySelector("#nombre-cartes")

let decksave = localStorage.getItem("monDeck");
let monDeck = [];

if (decksave !== null && decksave !== "") {
    let nomsdeck = decksave.split("|");

    for (let nom of nomsdeck) {
        let carte = cartes.find(function (element) {
            return element.nom === nom;
        })

        if (carte !== undefined) {
            monDeck.push(carte)
        }
    }
}
function afficherdeck() {
    cartesdeck.innerHTML = ""
    nombreCartes.textContent = monDeck.length;

    if (monDeck.length === 0) {
        cartesdeck.innerHTML = `
         <p class="text-gray-400 text-center w-full">
                Votre deck est vide. Ajoutez des cartes depuis Mon Grimoire.
            </p>
        `;
        return
    }
    for (let i = 0; i < monDeck.length; i++) {
        let carte = monDeck[i]

        let bloc = document.createElement("div")
        bloc.className = "flex flex-col items-center gap-3 w-48 p-4 bg-[#171923] border border-amber-400 rounded-xl"
        let image = document.createElement("img")
        image.src = carte.src;
        image.className = "w-full h-64 object-cover rounded-lg";

        let titre = document.createElement("h3")
        titre.textContent = carte.nom
        titre.className = "text-amber-400 fond-bold text-center"

        let rarete = document.createElement("p")
        rarete.textContent = carte.rarete
        rarete.className = "text-amber-400 font-bold"

        let bouton = document.createElement("button")
        bouton.textContent = "Retirer"
        bouton.className = "bg-red-600 text-white p-2 rounded-lg"

        bouton.addEventListener("click", function () {
            monDeck.splice(i, 1)
            let nomsdeck = [];
            for (let cart of monDeck) {
                nomsdeck.push(cart.nom)
            }
            localStorage.setItem("monDeck", nomsdeck.join("|"));
            afficherdeck()
        })
        bloc.appendChild(image)
        bloc.appendChild(titre)
        bloc.appendChild(rarete)
        bloc.appendChild(bouton)
        
        cartesdeck.appendChild(bloc)

    }
}
afficherdeck();