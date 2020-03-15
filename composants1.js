// HEADER - menu hamburger
class Burger{
  constructor(target){
    this.dom = document.createElement("burger");
    target.appendChild(this.dom);
    this.content=[];
    window.mvp.burger = this;
    this.dom.onclick = this.changeAffichage.bind(this);
    this.minified = true;
    this.render();
  }

  render(){
    if (this.minified) return this.renderMinified();
    this.renderUnMinified();
  }
 
  changeAffichage(){
    this.minified = ! this.minified;
    this.render();
  }

  renderMinified(){
    this.dom.innerHTML = `<div id="menu-button" class="accordion-toggle"><i class="fas fa-bars"></i></div>`;
    this.dom.className = "smallburger";
  }

  renderUnMinified(){
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
		//this.affichageAccueil();
	}

	ajouteProduit(produit) {
		//this.DOM = document.createElement("div");
		//console.log("test");
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



//page PANIER
/*class Panier {
	constructor(data, target){
		//this.name = data.name.split(" ")[0];
		this.nameLong = data.name;
		this.price = data.price/100;
		this.description = data.description;
		this.image = data.imageUrl;
		this.content = [];
		this.contenuPanier = [];
		//this.total = this.price++;

		window.mvp.panier = this;
		this.DOM = document.createElement("tbody");
		target.appendChild(this.DOM);

		this.affichageLignePanier();
		//this.affichageTotalPanier();
		//this.affichagePanier()
	}
		
	//affichage du tableau de produits sélectionnés (pour le moment un par un : pas de liste)
	/*async function affichageLignePanier(){ 
		this.DOM.innerHTML = `
			<tr>
				<td><img src="${this.image}" alt="${this.nameLong}"/></td>
				<td>${this.nameLong}</td>
				<td>${this.price}€</td>
			</tr>
		`;		
	}
	/*async function affichageTotalPanier(){
		this.DOM.innerHTML = `
			<tr id="total">
				<td colspan="2"> Total :</td>
				<td>${this.total}€</td>
			</tr>
		`;
	}

	affichagePanier(){
		const ligneCommande = await affichageLignePanier();
		const totalCommande = await affichageTotalPanier();
		return ligneCommande + totalCommande;
	}*/

//}
/*class Contact {
	constructor(){
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.address = data.address;
		this.city = data.city;
		this.email = data.email;

		 window.mvp.contact = this;
	}


}*/
