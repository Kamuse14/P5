// HEADER - menu hamburger
class Burger{
  constructor(target){
    this.dom = document.createElement("burger");
    target.appendChild(this.dom);
    this.content=[];
    window.mvp.burger = this;
    this.menu = document.getElementById('menu-button');
    this.menu.onclick = this.changeAffichage.bind(this);
    this.minified = true;
    this.render();
  }

  render(){//si minified est vraie alors on affiche le petit burger, sinon le burger est déplié
    if (this.minified) return this.renderSmallBurger();
    this.renderBurger();
  }
 
  changeAffichage(){
    this.minified = ! this.minified;
    this.render();
  }

  renderSmallBurger(){
    this.dom.innerHTML = `<div></div>`;
    this.dom.className = "smallburger";
  }

  renderBurger(){
    this.dom.innerHTML = `
      	<ul class="accordion-inner"> 
			<li><a  href="index.html"><i class="fas fa-home"></i> Accueil</a></li>
			<li><a href="panier.html"><i class="fas fa-shopping-cart"></i> Panier</a></li>
		</ul>
`;
    this.dom.className = "bigburger";
  }
}

/*
class Burger{
  constructor(target){
    this.dom = document.createElement("burger");
    this.dom.id = "burger";
    target.appendChild(this.dom);
    this.content=[];
    window.mvp.burger = this;
    this.dom.onclick = this.changeAffichage.bind(this);
    this.smallBurger();
  }
 smallBurger(){
   this.dom.innerHTML = `<div id="menu-button" class="accordion-toggle"><i class="fas fa-bars"></i></div>`;
    this.dom.className = "smallburger";
 }
  changeAffichage(){
    this.dom.innerHTML = `
      <div id="menu-button" class="accordion-toggle"><i class="fas fa-bars"></i></div>
      <ul class="accordion-inner"> 
         <li><a  href="index.html"><i class="fas fa-home"></i> Accueil</a></li>
         <li><a href="panier.html"><i class="fas fa-shopping-cart"></i> Panier</a></li>
      </ul>
`;
    this.dom.className = "bigburger";
    
  }
}
*/
// DONNEES d'un produit
class Produit{
	constructor(data){
		this.name = data.name.split(" ")[0];
		this.nameLong = data.name;
		this.price = data.price/100;
		this.description = data.description;
		this.image = data.imageUrl;
		this.vernis = data.varnish;
		this.id = data._id;
		window.mvp.produits[this.name] = this;
	}
}
// page ACCUEIL
class ListeProduits{
	constructor(target){
		this.liste = [];
		this.DOM = document.createElement("div");
		target.appendChild(this.DOM);
	}

	ajouteProduit(produit) {
		this.liste.push(produit);
	}
	
	affichageAccueil(){ //contenu 
		this.DOM.innerHTML = `<h2>Nos produits</h2>`;
		//console.log(this.liste);
		for(let produit of this.liste) {
			console.log(produit);
			this.DOM.innerHTML += `
				<a href="produit.html?id=${produit.id}">
					<figure id="${produit.name}" class="meuble">
						<img src="${produit.image}" alt="${produit.nameLong}"/>
						<figcaption>${produit.nameLong}</figcaption>			
						<h3>${produit.price}€</h3>	
					</figure>
				</a>		
			`;
		}
	}
}
// page PRODUIT
class Meuble{
	constructor(produit, target) {
		this.produit = produit;
		this.DOM = document.createElement("figure");
		this.DOM.className = "meuble";
		target.appendChild(this.DOM);
	}

	affichageProduit(){
		let vernis = ""; //choix des vernis
		for (let i=0; i<this.produit.vernis.length; i++) {
			vernis += `<option value="${this.produit.vernis[i]}">${this.produit.vernis[i]}</option>`;
		}
		//let quantity = "";
		this.DOM.innerHTML = `
			<img src="${this.produit.image}" alt="${this.produit.nameLong}"/>
			<div id="${this.produit.name}content">
				<figcaption>${this.produit.nameLong}</figcaption>
				<p>${this.produit.description}</p>
				<select id="mon_vernis">
					<option selected>-- Choix du vernis --</option>
					${vernis}
				</select>
			</div>
			<div id="addbtn">
				<h3>${this.produit.price}€</h3>	
				<a href="panier.html?id=${this.produit.id}">
					<button id="addbutton" type="submit"><i class="fas fa-cart-plus"></i> Ajouter au panier</button>
				</a>
			</div>		
		`;
	}
}
// récupération des objets "meubles" pour les ajouter au panier
class Panier {
	constructor(target){ // cible dans laquelle on va implémenter les meubles
		this.commande = [];
		/*this.trash = trash;
		document.getElementById("trash-${produit.id}");
		console.log(trash);
		this.trash.onclick = this.supprimeProduit.bind(this);*/
				
		window.mvp.panier = this;
		this.DOM = document.createElement("tbody");
		target.appendChild(this.DOM);
		this.recupPanier();
		this.supprimerPanier();
	}

	recupPanier() {
		//localStorage.clear(); //me permet de vider le panier
		for(let i=0; i<localStorage.length; i++) {
			let key = localStorage.key(i);
			let meubleJson = localStorage.getItem(key);
			let meubleJs = JSON.parse(meubleJson);
			this.ajouteProduit(meubleJs);
		}
	}

	estPresent(produit) {
		for(let meuble of this.commande) {
			if(meuble.id === produit.id){
				return true;
			}
		}
		return false;
	}

	ajouteProduit(produit){
		if (!this.estPresent(produit)) {
			this.commande.push(produit);
			localStorage.setItem(produit.id,JSON.stringify(produit));
			//localStorage.setItem("panier",JSON.stringify(commande));
		}
	}

	/*supprimeProduit(produit){
			this.commande.
			localStorage.removeItem(produit.id);
	}*/

	affichagePanier() {
		for (let produit of this.commande) {
			this.DOM.innerHTML += `
			<tr>
				<td><img src="${produit.image}" alt="${produit.nameLong}"/></td>
				<td>${produit.nameLong}</td>
				<td>${produit.price}€</td>
				<td id="trash-${produit.id}" ><i class="far fa-trash-alt"></i></td>
			</tr>
		`;	
		}
		this.DOM.innerHTML += `
			<tr id="total">
				<td colspan="2"> Total :</td>
				<td>${this.totalPanier()}€</td>
			</tr>
		`;
	}

	supprimerPanier() {
		document.getElementById("delete").addEventListener('click', ()=>{
			localStorage.clear(); 
			window.location.reload();
			console.log(localStorage);
		})
	}

	totalPanier() {
		let total = 0;
		for(let produit of this.commande) {
			total += produit.price;
		}
		return total;
	}
}

//
class Contact {
	constructor(){
		this.contact = {};
		this.firstName = sessionStorage.getItem("prenom");
		this.lastName = "";
		this.address = "";
		this.city = "";
		this.email = "";
		window.mvp.contact = this;

		this.saveContact();
	}
	/*recupContact() {
		let key = sessionStorage.key(i);
		let contactJson = sessionStorage.getItem(key);
		
	}*/
	saveContact() {
		if(typeof sessionStorage!='undefined') {
  			if('message' in sessionStorage) {
    		alert("Message récupéré");
    		document.getElementById("firstName").value = sessionStorage.getItem('message');
 			 }
		} else {
		  alert("sessionStorage n'est pas supporté");
		}
	}
	

}

/* 
//

*/
