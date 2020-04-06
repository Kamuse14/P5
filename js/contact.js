// données Formulaire
class Contact {
	constructor(data, target){
		this.contact = {};
		this.firstName = document.getElementById("firstName").value;
		this.lastName = document.getElementById("lastName").value;
		this.address = document.getElementById("address").value;
		this.city = document.getElementById("city").value;
		this.email = document.getElementById("email").value;
		this.dom = document.createElement("formulaire");
		this.dom.id = "formulaire";
		window.mvp.contact = this;

		// this.contact= {
		// 	"firstName": this.firstName,
		// 	"lastName": this.lastName,
		// 	"address": this.address,
		// 	"city": this.city,
		// 	"email": this.email
		// }

		this.renderContact();
	}
	//sauvegarde des données dans le sessionStorage => même en changeant ou en rafraichissant la page
	saveContact() {
		if(typeof sessionStorage!='undefined') {
  			if('prenom' && 'nom' && 'adresse' && 'ville' && 'electronique' in sessionStorage) {//pas certaine que ce soit utile
    		this.firstName = sessionStorage.getItem('prenom');//essayer les différentes écritures
    		this.lastName = sessionStorage.getItem('nom');
    		this.address = sessionStorage.getItem('adresse');
    		this.city = sessionStorage.getItem('ville');
    		this.email = sessionStorage.getItem('electronique');
    		 swal("données sauvegardées",  'success');
 			 }
		} else {
		  alert("données non sauvegardées", "error");
		}
	}

	renderContact() {
		this.dom.innerHTML = `
			<h2>Vos coordonnées</h2>
			<form id= "inscription" method="post" action="http://localhost:3000/api/furniture/order">
				<div class="form-group">
					<label for="firstName">
						Prénom : 
					</label>
					<input id="firstname" class="form-control" type="text" pattern="[A-Z][a-z]{1,}" placeholder="Prénom" name="prenom" onchange="sessionStorage.prenom=this.value" required />
				</div>
				<div class="form-group">
					<label for="lastName">
						Nom : 
					</label>
					<input id="lastName" class="form-control" type="text" pattern="[A-Z][a-z]+" placeholder="Nom" name="nom" onchange="sessionStorage.nom=this.value" required />
				</div>
				<div class="form-group">
					<label for="address">
						Adresse : 
					</label>
					<input id="address" class="form-control" name="adresse" onchange="sessionStorage.adresse=this.value" required />
				</div>
				<div class="form-group">
					<label for="city">
						Ville : 
					</label>
					<input id="city" class="form-control" name="ville" onchange="sessionStorage.ville=this.value" required />
				</div>
				<div class="form-group">
					<label for="email">
						Email : 
					</label>
					<input id="email" class="form-control" type="email" pattern="^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$" placeholder="utilisateur@domaine.fr" name="electronique" onchange="sessionStorage.electronique=this.value" required />
				</div>
				<div id=validation onclick="initPage('validation')">
					<button id="btn-envoyer" onclick="" type="submit"><i class="far fa-paper-plane"></i> Envoyer</button>
				</div>
			</form>
		`;
	}

	validation() {
		document.getElementById("inscription").addEventListener("submit", () {
			swal('Commande validée !', 'Vous allez recevoir un identifiant de commande.', 'success');
			initPage('validation');
			validationPage();
		})
	}

	validationPage() {
		this.dom = createElement("confirmation");
		this.dom.innerHTML = `
			<h2>Vous avez enregistré votre panier avez succès !</h2>
			<p>Le montant de votre commande est de ${this.totalPanier()}€</p>
			<p>Votre numéro de commande est       </p>
		`;
	}
}
// forme de l'objet à renvoyer à l'API pour obtenir un identifiant de commande
// { 
// "contact": {
// 			"firstName": "premon",
// 			"lastName": "nom",
// 			"address": "adresse",
// 			"city": "ville",
// 			"email": "user@mail.fr"
// 		},
// "products": ["5be9cc611c9d440000c1421e"]
// }