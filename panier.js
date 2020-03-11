function ajouterPanier(id, price) {
	var panier = JSON.parse(localStorage.getItem('panier'));
	if (id===null) {
		JSON.parse(localStorage.setItem('panier'));
	} else {
		push
	}
}



const mongoose = require('mongoose');

const formulaireSchema = mongoose.Schema({
	id: { type: Number, required: true },
  	name: { type: String, required: true },
  	username: { type: String, required: true },
  	address: { type: String, required: true },
  	town: { type: [String], required: true },
  	email: { type: String, required: true } 
});

module.exports = mongoose.model('formulaire', formulaireSchema);




// Contrôle du courriel en fin de saisie
document.getElementById("courriel").addEventListener("blur", function (e) {
    // Correspond à une chaîne de la forme xxx@yyy.zzz
    var regexCourriel = /.+@.+\..+/;
    var validiteCourriel = "";
    if (!regexCourriel.test(e.target.value)) {
        validiteCourriel = "Adresse invalide";
    }
    document.getElementById("aideCourriel").textContent = validiteCourriel;
});
