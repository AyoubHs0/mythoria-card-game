
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
let listeCartes = document.querySelector("#list-cartes");
let filterrarete = document.querySelector("#filter-rarete")

let cartessave = localStorage.getItem("cartesCollection")
let macollection = [];
if (cartessave !== null && cartessave !==""){
    let noms = cartessave.split("|")
    for (let nom of noms){
        let carte = cartes.find(function(element){
            return element.nom === nom
        });
        if (carte !== undefined){
            macollection.push(carte);

        }
    }
}

function affichercartes(collection){
    listeCartes.innerHTML = ""

    if (collection.length === 0){
    listeCartes.innerHTML = `
    <p class="text-gray-400 text-center w-full">
        aucun carte a afficher
    </p>
    `;
    return;
    }
    for (let cart of collection){
        let bloc = document.createElement("div")
        bloc.className = "flex flex-col items-center gap-3 w-48 p-4 bg-[#171923] border border-amber-400 rounded-xl";

        let image = document.createElement("img")
        image.src = cart.src
        image.className = "w-full h-64 object-cover rounded-lg";

        let titre = document.createElement("h3")
        titre.textContent = cart.nom
        titre.className = "text-amber-400 font-bold text-center";

        let rarete = document.createElement("p")
        rarete.textContent = cart.rarete
        rarete.className = "text-amber-400 font-bold"

        let boutton = document.createElement("button");
        boutton.textContent = "ajouter au deck"
        boutton.className = "bg-amber-400 text-black p-2 rounded-lg"
        boutton.addEventListener("click",function(){
            let decksave = localStorage.getItem("monDeck")
            let nomsdeck = [];
            if(decksave !== null && decksave !== ""){
                nomsdeck = decksave.split("|").filter(function(nom){
                    return nom !== "";
                })

            }
            if (nomsdeck.length >= 20){
                alert("votre deck est complet (20/20)");
                return ;

            }
            nomsdeck.push(cart.nom);
            localStorage.setItem("monDeck" , nomsdeck.join("|"))
            alert ("carte ajouter au deck")
        })

        bloc.appendChild(image)
        bloc.appendChild(titre)
        bloc.appendChild(rarete)
        bloc.appendChild(boutton)

        listeCartes.appendChild(bloc)

    }
}
affichercartes (macollection)
filterrarete.addEventListener("change" , function(){
    let choix = filterrarete.value
    if(choix === "toutes"){
        affichercartes(macollection)
    }else{
        let resultet = macollection.filter(function(cart){
            return cart.rarete === choix
        })
    affichercartes(resultet)
    }
})
