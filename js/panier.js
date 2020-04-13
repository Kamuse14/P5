// récupération des objets "meubles" pour les ajouter au panier
class Panier {
	constructor(target){ // cible dans laquelle on va implémenter les meubles
		this.products		= []; 

		//completer avec le contenu du localstorage
		this.recupPanier();

		this.type			= "icone";
		this.dom			= document.createElement("cart");
		window.mvp.panier	= this;
		target.appendChild(this.dom);
		this.render();
	}

	render(){
		this.dom.innerHTML = ``;
		switch (this.type) {
			case "icone":
				this.renderIcon();
				break;
			case "recap":
				this.enteteRecap();
				this.renderRecap();
				this.renderForm();
				break;
			// case "":
				
	  //      	break;
	   		default:
	        	this.renderIcon();	
	        break;
		}
	}
	
	renderIcon(){
		this.dom.innerHTML =  `
	      <span class="nav-icon" onclick="window.mvp.panier.zoom()">
	        <i class="fas fa-cart-plus"></i>
	      </span>
	      <div class="cart-items">${this.products.length}</div>
		`;
	}

	zoom(){
		this.type = "recap";
		this.render();
	}

	navIcon(){ // ne fonctionne pas
		//this dom = document.getElementById('cart');
		this.type = "icone";
		this.render();
	}

	recupPanier() {//récupération des données du localStorage
		let recupStorage = JSON.parse(localStorage.getItem("panier"));
		if(recupStorage) {
			for(let i=0; i<recupStorage.length; i++) {
				this.products.push(recupStorage[i]);
			}
		}
	}

	ajouteProduit(produit){//on pousse le produit dans le tableau "products"
		this.products.push(produit);
		localStorage.setItem("panier", JSON.stringify(this.products));
		console.log(localStorage);
		this.render();
	}

	totalPanier() {
		let total = 0;
		for(let produit of this.products) {
			total += parseInt(produit.price);
		}
		return total;
	}

	enteteRecap() {
		// let modale = document.getElementById("modale");
		// window.mvp.onclick = function(event){
		// 	if(event.target==modale) {
		// 		this.navIcon();
		// 	}
		// }
		
		this.dom.className = "recap";
		this.dom.id = "recap";
		this.dom.innerHTML =  `
			<modale id="modale">
				<div id="close-zoom" onclick="window.mvp.panier.navIcon()">
		        	<i class="fas fa-times"></i>
		      	</div>
		      	<div id="commande">
					<panier>
						<h2>Votre commande </h2>
						<table id="tableau">
							<thead>
								<tr>
									<th>Produit</th>
									<th>Nom du produit</th>
									<th>Prix</th>
									<th><i class="far fa-trash-alt"></th>
								</tr>
							</thead>

							<!-- tbody js ici -->

						</table>
					</panier>

					<!-- formulaire ici -->

				</div>
			</modale>
		`;
	}

	renderRecap(){
		let lignePanier = document.getElementById("tableau").appendChild(document.createElement("tbody"));
		for (let produit of this.products) {
			lignePanier.innerHTML += `
				<tr id="indexPanier">
					<td><img src="${produit.image}" alt="${produit.nameLong}"/></td>
					<td>${produit.nameLong}</td>
					<td>${produit.price}€</td>
					<td id="trash-${produit.name} onclick="window.mvp.panier.supprimeProduitPanier()" class="trash"><i class="far fa-trash-alt"></i></td>
				</tr>
			`;
		}

		lignePanier.innerHTML += `
			<tr id="total">
				<td colspan="2"> Total :</td>
				<td>${this.totalPanier()}€</td>
			</tr>
		`;	
	}

	supprimeProduitPanier() { // ne fonctionne pas => conflit avec le onclick zoom ?
		// console.log("test");
		// document.getElementById("indexPanier").parentNode.removeChild(document.getElementById("indexPanier"));
		// delete(window.mvp.products[${produit.name}]);
		// localStorage.removeItem("panier");
	}

	renderForm() {
		let formulaire = document.getElementById("commande").appendChild(document.createElement("formulaire"));
		formulaire.innerHTML = `
			<h2>Vos coordonnées </h2>
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
}