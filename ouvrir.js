
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

let listeBoosters = document.querySelector("#liste-boosters");

let boostersAchetes = localStorage.getItem("boostersAchetes");

let zonecartes = document.querySelector('#ouv-cart')

if (boostersAchetes === null || boostersAchetes === "") {

    listeBoosters.innerHTML = `
        <div class="flex flex-col items-center gap-4 p-6">
            <img src="img/pack-k.jpg" alt="Booster" class="w-48 h-64 object-cover rounded-lg">

            <p class="text-gray-300 text-center">
                Tu n'as aucun booster à ouvrir pour le moment.
            </p>

            <a href="boutique.html"
               class="bg-amber-500 text-black p-3 rounded-lg hover:bg-orange-500">
                DÉCOUVRIR LES BOOSTERS
            </a>
        </div>
    `;
} else {
    let boosters = boostersAchetes.split("|")
    let nomsAffiches = []
    for (let i = 0; i < boosters.length; i++) {
        let nom = boosters[i]
        if (nomsAffiches.includes(nom)) {
            continue;
        }
        nomsAffiches.push(nom)


        let quantite = 0
        for (let j = 0; j < boosters.length; j++) {
            if (boosters[j] == nom) {
                quantite++
            }
        }


        let content = document.createElement("div")
        content.className = "flex flex-col items-center gap-3 w-56 p-4 bg-[#171923] border border-amber-400 rounded-xl";

        let image = document.createElement("img")
        if (nom == "shinobi-starter") {
            image.src = "img/shinobi-starter.jpg"
        } else if (nom === "akatsuki-pack") {
            image.src = "img/akatsuki-pack.jpg"
        } else if (nom === "Legendary Shinobi") {
            image.src = "img/legent-pack.jpg"
        } else if (nom === "shakra-Mastry") {
            image.src = "img/shakra-Mastry.jpg"
        }
        image.className = "w-full h-64 object-cover rounded-lg"

        let titre = document.createElement("h3")
        titre.className = "text-amber-400 text-lg font-bold text-center"
        titre.textContent = nom;

        let number = document.createElement("p")
        number.className = "text-red-800 font-bold text-lg"
        number.textContent = "x" + quantite;

        let btn = document.createElement("button")
        btn.className = "block bg-amber-500 text-black p-3 mt-4 rounded-lg text-center hover:bg-orange-500"
        btn.textContent = "OUVRIR"
        btn.addEventListener("click", function () {
            let cartesobtenues = generecartes(nom);
            // ========localstorage de carte : 
            let cartessave = localStorage.getItem("cartesCollection")
            if (cartessave === null || cartessave === ""){
                cartessave = "";
            }
            for(let carte of cartesobtenues){
                cartessave += carte.nom + "|";
            }
            localStorage.setItem("cartesCollection" , cartessave)


            zonecartes.innerHTML = "";
            for (let carte of cartesobtenues) {
                let bloc = document.createElement("div");
                bloc.className = "flex flex-col items-center gap-3 w-48 p-4 bg-[#171923] border border-amber-400 rounded-xl";
                let imagecarte = document.createElement("img");
                imagecarte.src = carte.src;
                imagecarte.alt = carte.nom;
                imagecarte.className = "w-full h-64 object-cover rounded-lg";

                let nomcarte = document.createElement("h3");
                nomcarte.textContent = carte.nom;
                nomcarte.className = "text-amber-400 font-bold text-center"

                let raretecarte = document.createElement("p");
                raretecarte.textContent = carte.rarete;
                raretecarte.className = "text-amber-400 font-bold text-center"

                bloc.appendChild(imagecarte);
                bloc.appendChild(nomcarte);
                bloc.appendChild(raretecarte);
                zonecartes.appendChild(bloc)
            }

            // ====supprimer le boostres open;
            let boostersActuals = localStorage.getItem("boostersAchetes")

            let liste = boostersActuals.split("|")

            let index = liste.indexOf(nom)
            if (index !== -1) {
                liste.splice(index, 1)
            }
            localStorage.setItem("boostersAchetes", liste.join("|"))
            let quantiteRestante = liste.filter(function(booster){
                return booster === nom ;
            }).length;
            number.textContent = "x" + quantiteRestante;
            if(quantiteRestante === 0 ){
                content.remove()
            }

        })

        content.appendChild(image)
        content.appendChild(titre)
        content.appendChild(number)
        content.appendChild(btn)
        listeBoosters.appendChild(content)
    }
}
// ===================ouverir-cart====

let reglesBoosters = {
    "shinobi-starter": {
        nombreCartes: 5,
        probabilites: {
            Commun: 60,
            Rare: 25,
            Épique: 12,
            Légendaire: 3
        }
    },

    "akatsuki-pack": {
        nombreCartes: 5,
        probabilites: {
            Commun: 40,
            Rare: 35,
            Épique: 20,
            Légendaire: 5
        }
    },

    "shakra-Mastry": {
        nombreCartes: 5,
        probabilites: {
            Commun: 30,
            Rare: 35,
            Épique: 25,
            Légendaire: 10
        }
    },

    "Legendary Shinobi": {
        nombreCartes: 5,
        probabilites: {
            Commun: 20,
            Rare: 30,
            Épique: 30,
            Légendaire: 20
        }
    }
};
function choisirrarete(probabilites) {
    let nombre = Math.random() * 100;
    let total = 0;
    for (let rarete in probabilites) {
        total += probabilites[rarete]
        if (nombre < total) {
            return rarete
        }
    }
}


function choisircart(rarete) {
    let cartesdispo = cartes.filter(function (cartes) {
        return cartes.rarete === rarete
    })
    let index = Math.floor(Math.random() * cartesdispo.length)
    return cartesdispo[index];
}


function generecartes(nombooster) {
    let cartesobtenues = [];
    let regle = reglesBoosters[nombooster]
    for (let i = 0; i < regle.nombreCartes; i++) {
        let rarete = choisirrarete(regle.probabilites);
        let carte = choisircart(rarete);
        cartesobtenues.push(carte)
    }
    return cartesobtenues;
}




