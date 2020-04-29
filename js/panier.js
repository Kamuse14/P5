class Panier {
	
	/**
	 * Le constructeur de la classe
	 * @constructor
	 * @param  {HTMLelement} target l'endroit où sera injecté le composant
	 * @return {Panier}
	 */
	constructor(target){
		this.products		= []; 
		this.recupPanier();
		this.type			= "icone";
		this.dom			= document.createElement("cart");
		window.mvp.panier	= this;
		target.appendChild(this.dom);
		this.render();
	}

	/**
	 * Génère le html du composant. Décide le bon affichage en fonction de this.type
	 * @return {void}
	 */
	render(){
		this.dom.innerHTML = ``;
		switch (this.type) {
			case "icone":
				this.renderIcon();
				break;
			case "recap":
				this.renderRecap();
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
	
	/**
	 * Génère le html de l'icône "panier"
	 * @return {HTMLelement} icône panier avec son indice
	 */
	renderIcon(){ 
		this.dom.className = "";
		this.dom.innerHTML =  `
	      <span class="nav-icon" onclick="window.mvp.panier.zoom()">
	        <i class="fas fa-cart-plus"></i>
	      </span>
	      <div class="cart-items">${this.products.length}</div>
		`;
	}

	/**
	 * Bascule du type "icone" au type "recap" (ouverture d'un fenêtre modale : panier + formulaire)
	 * @return {void}
	 */
	zoom(){
		this.type = "recap";
		this.render();
	}

	/**
	 * Stoppe la propagation de l'évènement et les comportements par défaut
	 * @param  event
	 * @return {[type]}
	 */
	navIcon(event){ // retour au rendu renderIcon()
		var event = event || window.event;
		event.stopPropagation(); //stoppe la propagation de l'évènement
		event.preventDefault();
		this.type = "icone";
		this.render();
	}

	/**
	 * Récupère les données des produits à partir du localStorage
	 * @return {array}
	 */
	recupPanier() {
		let recupStorage = JSON.parse(localStorage.getItem("panier"));
		if(recupStorage) {
			for(let i=0; i<recupStorage.length; i++) {
				this.products.push(recupStorage[i]);
			}
		}
	}

	/**
	 * Pousse le produit dans le tableau "products"
	 * @param  {JSON} produit un json contenant les informations du produit
	 * @param  {Boolean} render permet de déclencher le rendu du composant
	 * @return {void}
	 */
	ajouteProduit(produit, render=true){
		this.products.push(produit);
		localStorage.setItem("panier", JSON.stringify(this.products));
		if (render) this.render();
	}

	/**
	 * Calcule le total du panier
	 * @return {Number} le montant total des produits ajoutés
	 */
	totalPanier() {
		let total = 0;
		for(let produit of this.products) {
			total += parseInt(produit.price);
		}
		return total;
	}

	/**
	 * Génère le rendu de la fenêtre modale (panier + formulaire)
	 * @return {HTMLelement}
	 */
	renderRecap() { 
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
								${this.renderProduitPanier()} 
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

	/**
	 * Génère le rendu d'une partie du tableau de commande (les lignes des produits de la commande et le total)
	 * @return {HTMLelement}
	 */
	renderProduitPanier(){ // 
		let lignePanier = "";
		for (let produit of this.products) {
			lignePanier += `
				<tr id="indexPanier">
					<td><img src="${produit.image}" alt="${produit.nameLong}"/></td>
					<td>${produit.nameLong}</td>
					<td>${produit.price}€</td>
					<td id="trash-${produit.name} class="trash"><i class="far fa-trash-alt" onclick="window.mvp.panier.supprimeProduitPanier('${produit.id}')"></i></td>
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

	/**
	 * Supprime un produit du panier
	 * @param  {String} id identifiant des produits
	 * @return {array}
	 */
	supprimeProduitPanier(id) { 
		const tmpProductList = this.products;
		localStorage.removeItem("panier");
		this.products = [];
		for (let i=0; i<tmpProductList.length; i++){
			if (tmpProductList[i].id !== id) {
				this.ajouteProduit(tmpProductList[i], false);
			}
		}
		this.render();
	}

	/**
	 * Génère le rendu du formulaire
	 * @return {HTMLelement}
	 */
	renderForm() {  
		let formulaire = ""; 
		formulaire = `
			<h2>Vos coordonnées </h2>
			<form id="formulaire" onsubmit="mvp.panier.send()">
				<div class="form-group">
					<label for="firstName">
						Prénom : 
					</label>
					<input id="firstName" class="form-control" type="text" pattern="[A-Z][a-z]{1,}" placeholder="Prénom" name="firstName" onchange="mvp.panier.update('firstName', this.value)" required />
				</div>
				<div class="form-group">
					<label for="lastName">
						Nom : 
					</label>
					<input id="lastName" class="form-control" type="text" pattern="[A-Z][a-z]+" placeholder="Nom" name="lastName" onchange="mvp.panier.update('lastName', this.value)" required />
				</div>
				<div class="form-group">
					<label for="address">
						Adresse : 
					</label>
					<input id="address" class="form-control" name="address" onchange="mvp.panier.update('address', this.value)" required />
				</div>
				<div class="form-group">
					<label for="city">
						Ville : 
					</label>
					<input id="city" class="form-control" name="city" onchange="mvp.panier.update('city', this.value)" required />
				</div>
				<div class="form-group">
					<label for="email">
						Email : 
					</label>
					<input id="email" class="form-control" type="email" placeholder="utilisateur@domaine.fr" name="email" onchange="mvp.panier.update('email', this.value)" required />
				</div>
				<button id="btn-envoyer" class="sendform" type="submit" ><i class="far fa-paper-plane"></i> Envoyer</button>	
			</form>
		`;
		return formulaire;
	}
	
	/**
	 * Génère le rendu entre l'envoi du formulaire et la réception de l'orderId
	 * @return {HTMLelement}
	 */
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

	/**
	 * Génère la dernière page : validation de la commande avec son total et orderId
	 * @return {HTMLelement}
	 */
	renderSuccess() { // 
		this.dom.innerHTML = `
			<modale id="modale">
				<div id="confirm" >
					<div id="close-zoom" onclick="window.mvp.panier.navIcon()">
			        	<i class="fas fa-times"></i>
			      	</div>
			      	<div>
						<h2>Validation </h2>
						<div id="validation">
							<p>Nous vous remercions pour votre commande.</p>
							<p>Elle est d'un montant de 
								<span class="valid">${this.totalPanier()}€</span>
							</p>
							<p>Veuillez noter cet identifiant pour le suivi de votre commande 
								<span class="valid">${this.apiAnswer.orderId}</span>
							</p>
						</div>
					</div>
				</div>
			</modale>
		`;
	} 

	/**
	 * Envoie les données de la commande à l'API et récupère l'orderId
	 * @return {string}
	 */
	async send(){
		this.type = "waiting";
		this.render();
		let productsId = [];
		for(let produit of this.products) {
			productsId.push(produit.id);
		}
		const data = {
			"contact": {
				firstName	: this.firstName,
				lastName	: this.lastName,
				address		: this.address,
				city		: this.city,
				email		: this.email
			},
			"products": productsId 
		}
		
		/**
		 * réponse de l'API
		 * @type {string}
		 */
		this.apiAnswer	= await window.mvp.dataBase.postData("furniture/order", data);
		this.type		= "success";
		this.render();
	}

	/**
	 * Définit les paires clés/valeurs pour les enregistrer dans le sessionStorage
	 * @param  {string} key les clés du formulaire (firstname, lastname...)
	 * @param  {string} value les valeurs renseignées par l'utilisateur
	 * @return {void}
	 */
	update(key, value){
		this[key] = value;
		sessionStorage[key]=value;
	}
}