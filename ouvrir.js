
let listeBoosters = document.querySelector("#liste-boosters");

let boostersAchetes = localStorage.getItem("boostersAchetes");

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
        content.appendChild(image)
        content.appendChild(titre)
        content.appendChild(number)
        content.appendChild(btn)
        listeBoosters.appendChild(content)
    }
}
