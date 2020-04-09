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
				
	  //       break;
	   		default:
	        	this.renderIcon();	
	        break;
		}
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

	zoom(){
		this.type = "recap";
		this.render();
	}

	enteteRecap() {
		this.dom.className = "recap";
		this.dom.id = "recap";
		// document.getElementById("recap").onclick = this.supprimeModale();
		this.dom.innerHTML =  `
			<modale id="modale">
				<commande>
					<h2>Votre commande </h2>
					<table id="tableau" >
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
				</commande>
				
			</modale>
		`;
	}

	renderRecap(){
		this.dom = document.getElementById("tableau").appendChild(document.createElement("tbody"));
		for (let produit of this.products) {
			this.dom.innerHTML += `
				<tr id="indexPanier">
					<td><img src="${produit.image}" alt="${produit.nameLong}"/></td>
					<td>${produit.nameLong}</td>
					<td>${produit.price}€</td>
					<td id="trash-${produit.name}" class="trash"><i class="far fa-trash-alt"></i></td>
				</tr>
			`;
		}

		this.dom.innerHTML += `
			<tr id="total">
				<td colspan="2"> Total :</td>
				<td>${this.totalPanier()}€</td>
			</tr>
		`;	
	}

	renderForm() {
		this.dom = document.getElementById("modale").appendChild(document.createElement("formulaire"));
		this.dom.innerHTML = `
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

	supprimeModale(){
			// this.type = "icone";
			// this.render();
	}

	renderIcon(){
		this.dom.innerHTML =  `
	      <span class="nav-icon" onclick="window.mvp.panier.zoom()">
	        <i class="fas fa-cart-plus"></i>
	      </span>
	      <div class="cart-items">${this.products.length}</div>
		`;
	}

}