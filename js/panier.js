// récupération des objets "meubles" pour les ajouter au panier
class Panier {
	constructor(target){ // cible dans laquelle on va implémenter les meubles
		this.products		= []; 
		
		this.recupPanier();

		this.type			= "icone";
		this.dom			= document.createElement("cart");
		window.mvp.panier	= this;
		target.appendChild(this.dom);
		this.render();

		this.prenom = sessionStorage.getItem("prenom");
		this.nom = sessionStorage.getItem("nom");
		this.adresse = sessionStorage.getItem("adresse");
		this.ville = sessionStorage.getItem("ville");
		this.electronique = sessionStorage.getItem("electronique");
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
			case "waiting":
				this.renderWaiting();
       			break;
			case "success":
				this.renderSuccess();
       			break;
	   		default:
	        	this.renderIcon();	
	        break;
		}
	}
	
	renderIcon(){ // rendu de l'icône "panier"
		this.dom.className = "";
		this.dom.innerHTML =  `
	      <span class="nav-icon" onclick="window.mvp.panier.zoom()">
	        <i class="fas fa-cart-plus"></i>
	      </span>
	      <div class="cart-items">${this.products.length}</div>
		`;
	}

	zoom(){ // rendu du modale (panier + formulaire)
		this.type = "recap";
		this.render();
	}

	navIcon(event){ // retour au rendu renderIcon()
		var event = event || window.event;
		event.stopPropagation(); //stoppe la propagation de l'évènement
		event.preventDefault();
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
		this.dom.className = "recap";
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
							<tbody>
								${this.renderRecap()}
							</tbody>
						</table>
					</panier>
					<registration>
						${this.renderForm()}
					</registration>
				</div>
			</modale>
		`;
	}

	renderRecap(){
		let lignePanier = "";
		for (let produit of this.products) {
			lignePanier += `
				<tr id="indexPanier">
					<td><img src="${produit.image}" alt="${produit.nameLong}"/></td>
					<td>${produit.nameLong}</td>
					<td>${produit.price}€</td>
					<td id="trash-${produit.name} onclick="window.mvp.panier.supprimeProduitPanier()" class="trash"><i class="far fa-trash-alt"></i></td>
				</tr>
			`;
		}
		lignePanier += `
			<tr id="total">
				<td colspan="2"> Total :</td>
				<td>${this.totalPanier()}€</td>
			</tr>
		`;	
		return lignePanier;
	}

	supprimeProduitPanier() { // ne fonctionne pas => conflit avec le onclick zoom ?
		console.log("test");
		// document.getElementById("indexPanier").parentNode.removeChild(document.getElementById("indexPanier"));
		// delete(window.mvp.products[${produit.name}]);
		// localStorage.removeItem("panier");
	}

	renderForm() { // rendu du formulaire (non fonctionnel)
		let formulaire = "";
		formulaire = `
			<h2>Vos coordonnées </h2>
			<formulaire>
				<div class="form-group">
					<label for="firstName">
						Prénom : 
					</label>
					<input id="firstname" class="form-control" type="text" pattern="[A-Z][a-z]{1,}" placeholder="Prénom" name="prenom" onchange="mvp.panier.update('prenom', this.value)" required />
				</div>
				<div class="form-group">
					<label for="lastName">
						Nom : 
					</label>
					<input id="lastName" class="form-control" type="text" pattern="[A-Z][a-z]+" placeholder="Nom" name="nom" onchange="mvp.panier.update('nom', this.value)" required />
				</div>
				<div class="form-group">
					<label for="address">
						Adresse : 
					</label>
					<input id="address" class="form-control" name="adresse" onchange="mvp.panier.update('adresse', this.value)" required />
				</div>
				<div class="form-group">
					<label for="city">
						Ville : 
					</label>
					<input id="city" class="form-control" name="ville" onchange="mvp.panier.update('ville', this.value)" required />
				</div>
				<div class="form-group">
					<label for="email">
						Email : 
					</label>
					<input id="email" class="form-control" type="email" pattern="^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$" placeholder="utilisateur@domaine.fr" name="electronique" onchange="mvp.panier.update('electronique', this.value)" required />
				</div>
				<button id="btn-envoyer" class="sendform" onclick="mvp.panier.send()" type="submit"><i class="far fa-paper-plane"></i> Envoyer</button>	
			</formulaire>
		`;
		return formulaire;
	}

	renderSuccess() { // dernière page : validation de la commande avec son total et orderId
		this.dom.innerHTML = `
			<modale id="modale">
				<div id="confirm" >
					<div id="close-zoom" onclick="window.mvp.panier.navIcon()">
			        	<i class="fas fa-times"></i>
			      	</div>
			      	<div>
						<h2>Validation </h2>
						<div id="validation">
							<p>Votre commande est validée !</p>
							<p>Elle est d'un montant de 
								<span class="valid">${this.totalPanier()}€</span>
							</p>
							<p>Veuillez noter cet identifiant pour le suivi de votre commande 
								<span class="valid"> orderId...</span>
							</p>
						</div>
					</div>
				</div>
			</modale>
		`;
	}

	renderWaiting(){
		this.dom.innerHTML =  `
		<modale id="modale">
			<div id="attente">
				<p>Attente du serveur</p>
				<div id="ellipsis">
					<span class="point point--1"></span>
					<span class="point point--2"></span>
					<span class="point point--3"></span>
				</div>
			</div>
		</modale>
		`;
	}

	async send(){
		this.type = "waiting";
		this.render();
		const data = {
			"contact": {
				firstName	: this.prenom,
				lastName	: this.nom,
				address		: this.adresse,
				city		: this.ville,
				email		: this.electronique
			},
			"products": this.products
		}
		const apiAnswer = await window.mvp.dataBase.postData("furniture/order", data);
		console.log(apiAnswer);
		this.type = "success";
		this.render();
	}

	update(key, value){
		this[key] = value;
		sessionStorage[key]=value;
	}
}