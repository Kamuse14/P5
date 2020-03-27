// page Formulaire
class Contact {
	constructor(data, target){
		this.contact = {};
		this.firstName = "";
		this.lastName = "";
		this.address = "";
		this.city = "";
		this.email = "";
		//this.dom = document.createElement("formulaire");
		//this.dom.id = "formulaire";
		window.mvp.contact = this;

		this.saveContact();
	}
	//sauvegarde des données dans le sessionStorage => même en changeant ou en rafraichissant la page
	saveContact() {
		if(typeof sessionStorage!='undefined') {
  			if('prenom' && 'nom' && 'adresse' && 'ville' && 'electronique' in sessionStorage) {
    		swal("données sauvegardées",  'success');
    		document.getElementById("firstName").value = sessionStorage.getItem('prenom');
    		document.getElementById("lastName").value = sessionStorage.getItem('nom');
    		document.getElementById("address").value = sessionStorage.getItem('adresse');
    		document.getElementById("city").value = sessionStorage.getItem('ville');
    		document.getElementById("email").value = sessionStorage.getItem('electronique');
 			 }
		} else {
		  alert("données non sauvegardées", "error");
		}
	}

	renderContact() {
		this.dom.innerHTML = `
			<h2>Vos coordonnées</h2>
			<form method="post" action="http://localhost:3000/api/furniture/order">
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
				<button id="btn-envoyer" type="submit"><i class="far fa-paper-plane"></i> Envoyer</button>
			</form>
		`;
	}
}